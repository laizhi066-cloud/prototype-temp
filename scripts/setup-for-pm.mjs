import { execFileSync } from 'node:child_process'

function run(command, args = []) {
  execFileSync(command, args, {
    stdio: 'inherit',
  })
}

console.log('')
console.log('正在安装产品原型依赖...')
console.log('这一步可能需要几分钟，请不要关闭窗口。')
console.log('')

try {
  const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  run(npmCommand, ['run', 'setup'])
  console.log('')
  console.log('依赖安装完成。现在可以双击 scripts\\start-for-pm.bat 启动项目。')
} catch {
  console.log('')
  console.log('[失败] 依赖安装失败。请把这个窗口内容发给 AI。')
  process.exit(1)
}
