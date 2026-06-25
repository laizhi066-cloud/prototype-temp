param(
  [switch]$InstallNode
)

$ErrorActionPreference = "Stop"

function Test-Command($Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Write-Check($Name, $Ok, $Message) {
  $Status = if ($Ok) { "OK" } else { "FAIL" }
  Write-Host "[$Status] $Name: $Message"
}

Write-Host "产品原型环境准备"
Write-Host ""

$HasNode = Test-Command "node"
$HasNpm = Test-Command "npm"

if ($HasNode) {
  $NodeVersion = node --version
  Write-Check "Node.js" $true "检测到 $NodeVersion"
} else {
  Write-Check "Node.js" $false "未找到"
}

if ($HasNpm) {
  $NpmVersion = npm --version
  Write-Check "npm" $true "检测到 $NpmVersion"
} else {
  Write-Check "npm" $false "未找到"
}

if (-not $HasNode) {
  if ($InstallNode) {
    if (Test-Command "winget") {
      Write-Host ""
      Write-Host "正在通过 winget 安装 Node.js LTS..."
      winget install OpenJS.NodeJS.LTS -e --accept-package-agreements --accept-source-agreements
      Write-Host ""
      Write-Host "Node.js 安装完成。请关闭并重新打开终端，然后运行："
      Write-Host "npm run setup"
      exit 0
    }

    Write-Host ""
    Write-Host "当前电脑没有 winget。请手动安装 Node.js LTS："
    Write-Host "https://nodejs.org/"
    exit 1
  }

  Write-Host ""
  Write-Host "运行本项目需要先安装 Node.js。"
  Write-Host "如果想让脚本在 Windows 上尝试安装 Node.js LTS，请运行："
  Write-Host "powershell -ExecutionPolicy Bypass -File scripts/setup.ps1 -InstallNode"
  Write-Host ""
  Write-Host "手动安装地址："
  Write-Host "https://nodejs.org/"
  exit 1
}

if (-not $HasNpm) {
  Write-Host ""
  Write-Host "未找到 npm。请重新安装 Node.js LTS，或把这个输出发给 AI。"
  exit 1
}

Write-Host ""
Write-Host "正在安装项目依赖..."
npm install

Write-Host ""
Write-Host "正在检查环境..."
npm run doctor

Write-Host ""
Write-Host "环境准备完成。请运行："
Write-Host "npm run dev"
