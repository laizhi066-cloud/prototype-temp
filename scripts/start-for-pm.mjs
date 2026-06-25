import { existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'

console.log('')
console.log('正在启动产品原型...')
console.log('启动成功后，请打开终端里显示的本地地址。')
console.log('通常是：http://127.0.0.1:5173/')
console.log('')

if (!existsSync('node_modules')) {
  console.log('[提示] 当前缺少项目依赖。')
  console.log('请先双击 scripts\\setup-for-pm.bat。')
  process.exit(1)
}

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'

execFileSync(npmCommand, ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '5173'], {
  stdio: 'inherit',
})
