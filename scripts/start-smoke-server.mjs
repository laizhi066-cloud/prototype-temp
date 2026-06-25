import { rm, cp, mkdir } from 'node:fs/promises'
import { spawn } from 'node:child_process'
import path from 'node:path'

const root = process.cwd()
const smokePrdRoot = path.join(root, '.tmp/prds-smoke')
const sourcePrdRoot = path.join(root, 'docs/product/prds')
const viteBin = path.join(root, 'node_modules/vite/bin/vite.js')
const args = process.argv.slice(2)

await rm(smokePrdRoot, { recursive: true, force: true })
await mkdir(path.dirname(smokePrdRoot), { recursive: true })
await cp(sourcePrdRoot, smokePrdRoot, { recursive: true })

const child = spawn(process.execPath, [viteBin, ...args], {
  cwd: root,
  env: {
    ...process.env,
    PRD_ROOT: '.tmp/prds-smoke',
  },
  stdio: 'inherit',
})

function stop() {
  if (process.platform === 'win32' && child.pid) {
    spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { stdio: 'ignore' })
  } else {
    child.kill()
  }
}

process.on('SIGINT', stop)
process.on('SIGTERM', stop)
child.on('exit', (code) => {
  process.exit(code ?? 0)
})
