import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'node:fs/promises'
import path from 'node:path'

const prdRoot = path.resolve(process.cwd(), 'docs/product/prds')
const indexPath = path.join(prdRoot, 'index.json')

function createSlug(text) {
  const ascii = text
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  if (ascii) return ascii

  let hash = 0
  for (const char of text.trim()) {
    hash = (hash * 31 + char.codePointAt(0)) >>> 0
  }
  return `prd-${hash.toString(36)}`
}

function nowText() {
  const date = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}`
}

async function readJsonBody(req) {
  let body = ''
  for await (const chunk of req) {
    body += chunk
  }
  return body ? JSON.parse(body) : {}
}

async function readIndex() {
  const raw = await fs.readFile(indexPath, 'utf8')
  return JSON.parse(raw)
}

async function writeIndex(index) {
  await fs.writeFile(indexPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8')
}

function ensureGroup(index, label) {
  const normalizedLabel = label?.trim() || '核心需求'
  const existing = index.groups.find((group) => group.label === normalizedLabel)
  if (existing) return existing.id

  const id = createSlug(normalizedLabel)
  index.groups.push({
    id,
    label: normalizedLabel,
    order: index.groups.length + 1,
  })
  return id
}

function findDocument(index, id) {
  return index.documents.find((document) => document.id === id)
}

function documentPath(document) {
  const target = path.resolve(prdRoot, document.file)
  const relative = path.relative(prdRoot, target)
  if (relative.startsWith('..') || path.isAbsolute(relative)) {
    throw new Error('非法 PRD 文件路径')
  }
  return target
}

function sendJson(res, payload, statusCode = 200) {
  res.statusCode = statusCode
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function sendError(res, message, statusCode = 400) {
  sendJson(res, { message }, statusCode)
}

function prdMiddleware() {
  return {
    name: 'prd-docs-api',
    configureServer(server) {
      server.middlewares.use('/api/prds', async (req, res) => {
        try {
          const url = new URL(req.url || '/', 'http://127.0.0.1')
          const id = decodeURIComponent(url.pathname.replace(/^\/+/, ''))
          const index = await readIndex()

          if (req.method === 'GET' && !id) {
            sendJson(res, index)
            return
          }

          if (req.method === 'GET' && id) {
            const document = findDocument(index, id)
            if (!document) {
              sendError(res, '未找到 PRD 文档', 404)
              return
            }
            const content = await fs.readFile(documentPath(document), 'utf8')
            sendJson(res, { ...document, content })
            return
          }

          if (req.method === 'POST' && !id) {
            const payload = await readJsonBody(req)
            const title = payload.title?.trim()
            const content = payload.content?.trim()
            if (!title || !content) {
              sendError(res, '请填写文档标题和内容')
              return
            }

            const categoryId = ensureGroup(index, payload.category)
            const documentId = createSlug(title)
            const file = `${documentId}.md`
            const updatedAt = nowText()
            const existing = findDocument(index, documentId)

            if (existing) {
              const existingContent = await fs.readFile(documentPath(existing), 'utf8')
              sendJson(res, { ...existing, content: existingContent.trimEnd() })
              return
            }

            const document = {
              id: documentId,
              title,
              categoryId,
              order: index.documents.length + 1,
              file,
              updatedAt,
            }

            index.documents.push(document)
            await fs.writeFile(path.join(prdRoot, file), `${content}\n`, 'utf8')
            await writeIndex(index)
            sendJson(res, { ...document, content }, 201)
            return
          }

          if (req.method === 'PUT' && id) {
            const payload = await readJsonBody(req)
            const document = findDocument(index, id)
            if (!document) {
              sendError(res, '未找到 PRD 文档', 404)
              return
            }
            if (!payload.title?.trim() || !payload.content?.trim()) {
              sendError(res, '请填写文档标题和内容')
              return
            }

            const nextTitle = payload.title.trim()
            const nextCategoryId = ensureGroup(index, payload.category)
            const nextContent = payload.content.trim()
            const currentContent = await fs.readFile(documentPath(document), 'utf8')
            const hasChanged =
              document.title !== nextTitle ||
              document.categoryId !== nextCategoryId ||
              currentContent.trimEnd() !== nextContent

            if (hasChanged) {
              document.title = nextTitle
              document.categoryId = nextCategoryId
              document.updatedAt = nowText()
              await fs.writeFile(documentPath(document), `${nextContent}\n`, 'utf8')
              await writeIndex(index)
            }

            sendJson(res, { ...document, content: nextContent })
            return
          }

          sendError(res, '不支持的 PRD 请求', 405)
        } catch (error) {
          sendError(res, error.message || 'PRD 服务异常', 500)
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), prdMiddleware()],
})
