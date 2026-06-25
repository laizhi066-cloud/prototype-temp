import { expect, test } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'

const prdIndexPath = path.join(process.cwd(), 'docs/product/prds/index.json')

test('PM 可以公开查看、跳转和在线维护 PRD', async ({ page }) => {
  const smokeTitle = `临时 PRD ${Date.now()}`

  await page.goto('/prd')
  await expect(page.getByRole('heading', { name: '订单管理系统 PRD' })).toBeVisible()
  await expect(page.getByRole('tree', { name: 'PRD 文档目录' })).toBeVisible()
  await expect(page.locator('.markdown-body table')).toBeVisible()

  await page.getByRole('treeitem', { name: '订单管理系统 PRD' }).click()
  await expect(page).toHaveURL(/\/prd\/order-management-prd$/)

  await page.getByRole('button', { name: '新增文档' }).click()
  await page.getByLabel('文档标题').fill(smokeTitle)
  await page.getByLabel('所属分类').fill('验收文档')
  await page.getByLabel('文档内容').fill(`# ${smokeTitle}\n\n- 支持新增 PRD\n- 支持保存后刷新保留`)
  await page.getByRole('button', { name: '保存文档' }).click()
  await expect(page.getByText('PRD 已保存')).toBeVisible()
  await expect(page.getByRole('treeitem', { name: smokeTitle })).toBeVisible()

  await page.reload()
  await expect(page.getByRole('heading', { name: smokeTitle })).toBeVisible()
  await expect(page.getByText('支持保存后刷新保留')).toBeVisible()

  await page.getByRole('button', { name: '编辑文档' }).click()
  await page.getByLabel('文档内容').fill(`# ${smokeTitle}\n\n- 支持新增 PRD\n- 支持保存后刷新保留\n- 支持在线编辑`)
  await page.getByRole('button', { name: '保存文档' }).click()
  await page.reload()
  await expect(page.getByText('支持在线编辑')).toBeVisible()

  const prdIndex = fs.readFileSync(prdIndexPath, 'utf8')
  expect(prdIndex).not.toContain(smokeTitle)
})

test('PM can log in and create an order management record', async ({ page }) => {
  await page.goto('/prd')
  await expect(page.getByRole('heading', { name: '订单管理系统 PRD' })).toBeVisible()
  await expect(page.getByRole('tree', { name: 'PRD 文档目录' })).toBeVisible()

  await page.goto('/login')
  await expect(page.getByRole('heading', { name: '订单管理系统' })).toBeVisible()
  await expect(page.getByText('产品团队 AI 原型脚手架')).toHaveCount(0)
  await expect(page.getByText('AI Prototype')).toHaveCount(0)
  await expect(page.getByText('Product Prototype Scaffold')).toHaveCount(0)
  await expect(page.getByText('原型')).toHaveCount(0)
  await expect(page.getByText('脚手架')).toHaveCount(0)

  await page.getByRole('button', { name: '登录系统' }).click()
  await expect(page.getByRole('heading', { name: '订单管理工作台' })).toBeVisible()
  await expect(page.locator('.brand-name')).toHaveText('订单管理系统')
  await expect(page.getByText('产品经理')).toHaveCount(0)

  const prdPagePromise = page.waitForEvent('popup')
  await page.getByRole('button', { name: 'PRD' }).click()
  const prdPage = await prdPagePromise
  await expect(prdPage.getByRole('heading', { name: '订单管理系统 PRD' })).toBeVisible()
  await expect(prdPage.getByRole('tree', { name: 'PRD 文档目录' })).toBeVisible()
  await prdPage.close()

  await page.getByRole('menuitem', { name: '订单列表' }).click()
  await expect(page.getByRole('heading', { name: '订单管理' })).toBeVisible()

  await page.getByRole('menuitem', { name: '异常订单' }).click()
  await expect(page.getByRole('heading', { name: '异常订单' })).toBeVisible()
  await page.getByRole('menuitem', { name: '订单列表' }).click()

  await page.getByRole('button', { name: '新增订单' }).click()
  await page.getByLabel('客户名称').fill('北京启明产品团队')
  await page.getByLabel('订单金额').fill('16800')
  await page.getByRole('button', { name: '保存' }).click()

  await expect(page.getByText('订单已创建')).toBeVisible()
  await expect(page.getByRole('cell', { name: '北京启明产品团队' })).toBeVisible()
})
