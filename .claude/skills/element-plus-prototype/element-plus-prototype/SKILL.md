---
name: element-plus-prototype
description: 构建或修改 Vue 3 + Element Plus 产品原型时使用。适用于后台管理、SaaS、CRM、数据看板、表单、表格、弹窗和业务流程页面。
---

# Element Plus 原型开发

后台和 SaaS 原型默认使用 Element Plus 作为 UI 系统。

## 组件默认选择

- 布局：复用 `src/layouts/AppLayout.vue`。
- 表单：使用 `el-form`、`el-form-item`、校验规则、加载状态和成功 / 错误消息。
- 表格：使用 `el-table`，提供明确空状态文案、操作列和分页占位。
- 弹窗：新增 / 编辑流程使用 `el-dialog`。
- 反馈：成功、错误和危险操作确认使用 `ElMessage` 与 `ElMessageBox`。
- 导航：新增页面必须注册到 `src/router/index.js`。
- 状态：应用级状态使用 Pinia；页面局部状态留在页面内。

## 禁止事项

- Element Plus 已有按钮、表格、弹窗时，不要重复造基础组件。
- 不要默认引入 Tailwind。
- 不要把 mock 数据直接写在模板里。
- 页面不要直接读写 localStorage。
