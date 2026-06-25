import { execFileSync, execSync } from 'node:child_process'

function run(command, args) {
  if (process.platform === 'win32') {
    execSync([command, ...args].join(' '), {
      stdio: 'inherit',
    })
    return
  }

  execFileSync(command, args, {
    stdio: 'inherit',
  })
}

const npmCommand = 'npm'

console.log('正在准备产品原型项目...')
console.log('')

run('node', ['scripts/check-env.mjs'])

console.log('')
console.log('正在安装项目依赖...')
run(npmCommand, ['install'])

console.log('')
console.log('正在安装 Playwright Chromium，用于自动化验收测试...')
run(npmCommand, ['run', 'setup:browsers'])

console.log('')
console.log('环境准备完成。请运行：npm run dev')
