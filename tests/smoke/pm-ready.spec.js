import { expect, test } from '@playwright/test'

test('PM can log in and create an order management record', async ({ page }) => {
  await page.goto('/prd')
  await expect(page.getByRole('heading', { name: '订单管理系统 PRD' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'PRD 目录' })).toBeVisible()

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
  await expect(prdPage.getByRole('heading', { name: '页面目录' })).toBeVisible()
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
