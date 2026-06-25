---
name: feature-module-template
description: 产品经理要求新增或扩展业务模块时使用。模块必须包含页面、路由、mock API、localStorage 数据、Element Plus UI、交互状态和产品评审产物。适用于订单、用户、审批、库存、客户、任务、报表、设置等模块。
---

# 业务模块模板

新增业务模块前必须使用本技能。

## 规划输出

写代码前必须用中文说明：

- 模块名称：
- 项目类型：
- 页面 / 路由：
- 表格 / 列表字段：
- 表单字段与校验：
- mock API 方法：
- 空状态 / 加载态 / 错误态 / 成功态：
- 产品验收标准：

## 实现结构

- 在 `src/router/index.js` 中新增路由。
- 在 `src/config/productProfile.js` 的 `navTree` 中新增或归类树状导航节点。
- 在 `src/pages/` 下新增页面。
- 在 `src/mock/mockApi.js` 中新增或扩展 API 方法。
- 通过 `src/mock/storage.js` 持久化演示数据。
- 后台模块复用 `src/layouts/AppLayout.vue`。
- 使用 Element Plus 表格、表单、弹窗、消息和确认组件。

## 必备状态

- mock API 请求时显示加载态。
- 列表为空时显示空状态。
- 必填字段有表单校验。
- 新增 / 更新 / 删除后显示成功消息。
- 删除等危险操作前显示确认弹窗。
- 相关场景下显示错误消息。

## 产品产物

创建或更新：

- `docs/product/briefs/<模块名>.md`
- `docs/product/prototype-plans/<模块名>.md`
- `docs/product/reviews/<模块名>.md`（需要评审时）

## 禁止事项

- 不要在没有路由和验收标准的情况下新增模块。
- 不要只新增页面却忘记把入口挂到 `navTree`。
- 不要把数据硬编码在模板中。
- 不要绕过 `mockApi`。
- Element Plus 已有组件时，不要重复造基础 UI 组件。
