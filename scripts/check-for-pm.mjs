import { existsSync } from 'node:fs'
import { execFileSync, execSync } from 'node:child_process'

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

console.log('')
console.log('正在检查产品原型运行环境...')
console.log('')

const nodeVersion = run('node', ['--version'])
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const npmVersion = run(npmCommand, ['--version'])
const hasDependencies = existsSync('node_modules')

console.log(`[${nodeVersion ? '通过' : '失败'}] Node.js: ${nodeVersion || '未检测到'}`)
console.log(`[${npmVersion ? '通过' : '失败'}] npm: ${npmVersion || '未检测到'}`)
console.log(`[${hasDependencies ? '通过' : '提示'}] 项目依赖: ${hasDependencies ? '已安装' : '未安装'}`)

console.log('')

if (!nodeVersion || !npmVersion) {
  console.log('请把这个窗口内容发给 AI，让 AI 按 environment-bootstrap 帮你处理。')
  process.exit(1)
}

if (!hasDependencies) {
  console.log('请双击 scripts\\setup-for-pm.bat 安装项目依赖。')
  process.exit(1)
}

console.log('环境已就绪。请双击 scripts\\start-for-pm.bat 启动项目。')
