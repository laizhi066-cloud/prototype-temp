import { execFileSync, execSync } from 'node:child_process'
import { existsSync } from 'node:fs'

const MIN_NODE_MAJOR = 20
const RECOMMENDED_NODE = '22 LTS'
const npmCommand = 'npm'

function run(command, args = []) {
  try {
    if (process.platform === 'win32') {
      return execSync([command, ...args].join(' '), {
        encoding: 'utf8',
        stdio: ['ignore', 'pipe', 'pipe'],
      }).trim()
    }

    return execFileSync(command, args, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim()
  } catch {
    return ''
  }
}

function parseMajor(version) {
  const match = version.match(/v?(\d+)\./)
  return match ? Number(match[1]) : 0
}

function status(label, ok, message) {
  const mark = ok ? '通过' : '失败'
  console.log(`[${mark}] ${label}: ${message}`)
}

const nodeVersion = run('node', ['--version'])
const npmVersion = run(npmCommand, ['--version'])
const nodeMajor = parseMajor(nodeVersion)
const hasNode = Boolean(nodeVersion)
const hasNpm = Boolean(npmVersion)
const nodeOk = hasNode && nodeMajor >= MIN_NODE_MAJOR
const hasDependencies = existsSync('node_modules')
const hasLockfile = existsSync('package-lock.json')

console.log('产品原型环境检查')
console.log('')
status('Node.js', nodeOk, hasNode ? `检测到 ${nodeVersion}` : '未找到')
status('npm', hasNpm, hasNpm ? `检测到 ${npmVersion}` : '未找到')
status('package-lock.json', hasLockfile, hasLockfile ? '已存在' : '缺失')
status('node_modules', hasDependencies, hasDependencies ? '已存在' : '缺失')

console.log('')

if (!hasNode) {
  console.log(`请先安装 Node.js ${RECOMMENDED_NODE}。`)
  console.log('Windows 快速安装：powershell -ExecutionPolicy Bypass -File scripts/setup.ps1 -InstallNode')
  console.log('手动安装：https://nodejs.org/')
  process.exit(1)
}

if (!nodeOk) {
  console.log(`需要 Node.js ${MIN_NODE_MAJOR}+。推荐使用 Node.js ${RECOMMENDED_NODE}。`)
  process.exit(1)
}

if (!hasNpm) {
  console.log('未找到 npm。请重新安装 Node.js LTS，或把这个输出发给 AI。')
  process.exit(1)
}

if (!hasDependencies) {
  console.log('项目依赖缺失。请运行：npm install')
  process.exit(1)
}

console.log('环境已就绪。请运行：npm run dev')
