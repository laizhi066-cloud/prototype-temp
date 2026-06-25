import { execFileSync, execSync } from 'node:child_process'

const message = process.argv.slice(2).join(' ').trim()

function run(command, args = [], options = {}) {
  if (process.platform === 'win32') {
    return execSync([command, ...args].join(' '), {
      encoding: 'utf8',
      stdio: options.stdio || ['ignore', 'pipe', 'pipe'],
    })?.trim()
  }

  return execFileSync(command, args, {
    encoding: 'utf8',
    stdio: options.stdio || ['ignore', 'pipe', 'pipe'],
  })?.trim()
}

function isGitRepository() {
  try {
    return run('git', ['rev-parse', '--is-inside-work-tree']) === 'true'
  } catch {
    return false
  }
}

function initGitRepository() {
  try {
    run('git', ['init', '-b', 'main'], { stdio: 'inherit' })
  } catch {
    run('git', ['init'], { stdio: 'inherit' })
  }
}

function ensureGitIdentity() {
  const name = run('git', ['config', 'user.name']) || run('git', ['config', '--global', 'user.name'])
  const email = run('git', ['config', 'user.email']) || run('git', ['config', '--global', 'user.email'])

  if (!name) {
    run('git', ['config', 'user.name', '"产品原型 AI"'])
  }

  if (!email) {
    run('git', ['config', 'user.email', 'ai-prototype@example.local'])
  }
}

function hasChinese(text) {
  return /[\u4e00-\u9fff]/.test(text)
}

if (!message) {
  console.error('请提供中文 commit 信息，例如：npm run commit:ai -- "完善订单管理原型"')
  process.exit(1)
}

if (!hasChinese(message)) {
  console.error('commit 信息必须包含中文，不能使用纯英文。')
  process.exit(1)
}

if (!isGitRepository()) {
  console.log('当前目录还不是 Git 仓库，正在初始化 Git...')
  initGitRepository()
}

ensureGitIdentity()
run('git', ['add', '-A'], { stdio: 'inherit' })

const staged = run('git', ['diff', '--cached', '--name-only'])

if (!staged) {
  console.log('当前没有需要提交的修改。')
  process.exit(0)
}

if (process.platform === 'win32') {
  run('git', ['commit', '-m', `"${message.replaceAll('"', '\\"')}"`], {
    stdio: 'inherit',
  })
} else {
  run('git', ['commit', '-m', message], {
    stdio: 'inherit',
  })
}

console.log(`已创建中文 commit：${message}`)
