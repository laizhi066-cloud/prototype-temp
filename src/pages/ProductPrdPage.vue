<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { productProfile } from '../config/productProfile'
import { prdApi } from '../mock/prdApi'

const route = useRoute()
const router = useRouter()

const loading = ref(false)
const saving = ref(false)
const editingMode = ref('')
const currentDocument = ref(null)
const indexData = ref({
  groups: [],
  documents: [],
})

const form = reactive({
  title: '',
  category: '',
  content: '',
})

const treeProps = {
  label: 'label',
  children: 'children',
}

const treeData = computed(() => {
  const groups = [...indexData.value.groups].sort((a, b) => a.order - b.order)
  const documents = [...indexData.value.documents].sort((a, b) => a.order - b.order)

  return groups.map((group) => ({
    id: group.id,
    label: group.label,
    type: 'group',
    children: documents
      .filter((document) => document.categoryId === group.id)
      .map((document) => ({
        ...document,
        label: document.title,
        type: 'document',
      })),
  }))
})

const currentCategory = computed(() => {
  const group = indexData.value.groups.find(
    (item) => item.id === currentDocument.value?.categoryId,
  )
  return group?.label || '核心需求'
})

const previewHtml = computed(() =>
  renderMarkdown(currentDocument.value?.content || '', currentDocument.value?.title || ''),
)
const editorPreviewHtml = computed(() => renderMarkdown(form.content))

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderInline(value) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
}

function renderMarkdown(markdown, hiddenTitle = '') {
  const lines = markdown.split('\n')
  const html = []
  let inList = false
  let hasCheckedTitle = false

  for (const line of lines) {
    const trimmed = line.trim()

    if (!trimmed) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      continue
    }

    if (trimmed.startsWith('### ')) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h3>${renderInline(trimmed.slice(4))}</h3>`)
      continue
    }

    if (trimmed.startsWith('## ')) {
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h2>${renderInline(trimmed.slice(3))}</h2>`)
      continue
    }

    if (trimmed.startsWith('# ')) {
      if (!hasCheckedTitle && trimmed.slice(2).trim() === hiddenTitle.trim()) {
        hasCheckedTitle = true
        continue
      }
      hasCheckedTitle = true
      if (inList) {
        html.push('</ul>')
        inList = false
      }
      html.push(`<h2>${renderInline(trimmed.slice(2))}</h2>`)
      continue
    }

    if (trimmed.startsWith('- ')) {
      if (!inList) {
        html.push('<ul>')
        inList = true
      }
      html.push(`<li>${renderInline(trimmed.slice(2))}</li>`)
      continue
    }

    if (inList) {
      html.push('</ul>')
      inList = false
    }
    html.push(`<p>${renderInline(trimmed)}</p>`)
  }

  if (inList) {
    html.push('</ul>')
  }

  return html.join('')
}

async function refreshIndex() {
  indexData.value = await prdApi.list()
}

async function loadDocument(id) {
  if (!id) return
  loading.value = true
  try {
    currentDocument.value = await prdApi.get(id)
    editingMode.value = ''
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

async function initialize() {
  loading.value = true
  try {
    await refreshIndex()
    const docId = route.params.docId || indexData.value.documents[0]?.id
    if (!docId) return
    if (!route.params.docId) {
      await router.replace(`/prd/${docId}`)
      return
    }
    await loadDocument(docId)
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    loading.value = false
  }
}

function handleTreeClick(node) {
  if (node.type !== 'document') return
  router.push(`/prd/${node.id}`)
}

function openCreate() {
  editingMode.value = 'create'
  Object.assign(form, {
    title: '',
    category: currentCategory.value,
    content: `# 新 PRD\n\n## 需求摘要\n\n请在这里描述产品目标、目标用户和核心场景。\n`,
  })
}

function openEdit() {
  if (!currentDocument.value) return
  editingMode.value = 'edit'
  Object.assign(form, {
    title: currentDocument.value.title,
    category: currentCategory.value,
    content: currentDocument.value.content,
  })
}

function cancelEdit() {
  editingMode.value = ''
}

async function saveDocument() {
  if (!form.title.trim() || !form.content.trim()) {
    ElMessage.error('请填写文档标题和内容')
    return
  }

  saving.value = true
  try {
    const payload = {
      title: form.title,
      category: form.category,
      content: form.content,
    }
    const saved =
      editingMode.value === 'create'
        ? await prdApi.create(payload)
        : await prdApi.update(currentDocument.value.id, payload)
    await refreshIndex()
    currentDocument.value = saved
    editingMode.value = ''
    ElMessage.success('PRD 已保存')
    if (route.params.docId !== saved.id) {
      await router.push(`/prd/${saved.id}`)
    }
  } catch (error) {
    ElMessage.error(error.message)
  } finally {
    saving.value = false
  }
}

watch(
  () => route.params.docId,
  (docId) => {
    if (docId) {
      loadDocument(docId)
    }
  },
)

onMounted(initialize)
</script>

<template>
  <main class="prd-docs">
    <aside class="docs-sidebar">
      <div class="docs-brand">
        <div class="brand-mark">{{ productProfile.brandMark }}</div>
        <div>
          <strong>{{ productProfile.productName }}</strong>
          <span>PRD 文档</span>
        </div>
      </div>

      <div class="sidebar-actions">
        <el-button type="primary" plain @click="openCreate">新增文档</el-button>
      </div>

      <el-tree
        aria-label="PRD 文档目录"
        class="docs-tree"
        node-key="id"
        default-expand-all
        :data="treeData"
        :props="treeProps"
        :highlight-current="true"
        :current-node-key="route.params.docId"
        @node-click="handleTreeClick"
      />
    </aside>

    <section class="docs-content" v-loading="loading">
      <template v-if="editingMode">
        <header class="docs-header">
          <p>{{ editingMode === 'create' ? '新增 PRD' : '编辑 PRD' }}</p>
          <h1>{{ form.title || '新建 PRD 文档' }}</h1>
          <span>保存后会写入本地 PRD 目录，刷新页面后仍可查看。</span>
        </header>

        <div class="editor-layout">
          <el-form label-position="top" class="editor-form">
            <el-form-item label="文档标题" required>
              <el-input v-model="form.title" aria-label="文档标题" />
            </el-form-item>
            <el-form-item label="所属分类" required>
              <el-input v-model="form.category" aria-label="所属分类" />
            </el-form-item>
            <el-form-item label="文档内容" required>
              <el-input
                v-model="form.content"
                aria-label="文档内容"
                type="textarea"
                :rows="18"
                resize="vertical"
              />
            </el-form-item>
            <div class="editor-actions">
              <el-button @click="cancelEdit">取消</el-button>
              <el-button type="primary" :loading="saving" @click="saveDocument">
                保存文档
              </el-button>
            </div>
          </el-form>

          <article class="preview-panel markdown-body" v-html="editorPreviewHtml" />
        </div>
      </template>

      <template v-else-if="currentDocument">
        <header class="docs-header">
          <p>{{ currentCategory }} · {{ currentDocument.updatedAt }}</p>
          <div class="header-row">
            <h1>{{ currentDocument.title }}</h1>
            <el-button type="primary" plain @click="openEdit">编辑文档</el-button>
          </div>
          <span>这份文档会随产品需求和页面变更持续更新，供产品、设计、开发和测试评审使用。</span>
        </header>

        <article class="doc-section markdown-body" v-html="previewHtml" />
      </template>

      <el-empty v-else description="暂无 PRD 文档，请先新增一篇文档" />
    </section>
  </main>
</template>

<style scoped>
.prd-docs {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 276px minmax(0, 1fr);
  background: #f3f4f6;
  color: #111827;
}

.docs-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 20px 16px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
}

.docs-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 18px;
  border-bottom: 1px solid #e5e7eb;
}

.brand-mark {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 8px;
  background: #1d4ed8;
  color: #ffffff;
  font-weight: 800;
}

.docs-brand strong,
.docs-brand span {
  display: block;
}

.docs-brand strong {
  font-size: 14px;
}

.docs-brand span {
  margin-top: 2px;
  color: #6b7280;
  font-size: 12px;
}

.sidebar-actions {
  display: flex;
  margin: 16px 0;
}

.sidebar-actions .el-button {
  width: 100%;
}

.docs-tree {
  --el-tree-node-hover-bg-color: #eff6ff;
  color: #374151;
  font-size: 13px;
}

.docs-content {
  width: min(1040px, 100%);
  padding: 34px 32px 72px;
}

.docs-header {
  margin-bottom: 18px;
}

.docs-header p,
.docs-header span {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.docs-header h1 {
  margin: 8px 0;
  font-size: 24px;
  line-height: 1.24;
}

.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.doc-section,
.preview-panel,
.editor-form {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.doc-section {
  padding: 26px;
}

.editor-layout {
  display: grid;
  grid-template-columns: minmax(360px, 0.92fr) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}

.editor-form {
  padding: 20px;
}

.editor-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.preview-panel {
  min-height: 420px;
  padding: 24px;
}

.markdown-body {
  color: #374151;
  font-size: 13px;
  line-height: 1.75;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  color: #111827;
  line-height: 1.32;
}

.markdown-body :deep(h1) {
  margin: 0 0 18px;
  font-size: 24px;
}

.markdown-body :deep(h2) {
  margin: 24px 0 10px;
  font-size: 17px;
}

.markdown-body :deep(h3) {
  margin: 18px 0 8px;
  font-size: 14px;
}

.markdown-body :deep(p) {
  margin: 8px 0;
}

.markdown-body :deep(ul) {
  display: grid;
  gap: 7px;
  margin: 8px 0;
  padding-left: 18px;
}

.markdown-body :deep(code) {
  color: #1d4ed8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

@media (max-width: 920px) {
  .prd-docs {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    position: static;
    height: auto;
  }

  .docs-content {
    padding: 24px 18px 48px;
  }

  .editor-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .docs-content {
    padding: 20px 14px 42px;
  }

  .header-row {
    align-items: flex-start;
    flex-direction: column;
  }

  .docs-header h1,
  .markdown-body :deep(h1) {
    font-size: 21px;
  }
}
</style>
