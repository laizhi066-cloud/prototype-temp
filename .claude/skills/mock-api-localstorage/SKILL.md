---
name: mock-api-localstorage
description: 原型需要模拟前后端交互和本地持久化时使用。适用于登录、CRUD、筛选、表单、加载、成功、失败、空状态和演示数据持久化。
---

# Mock API 与 localStorage

所有模拟后端行为都放在 `src/mock/mockApi.js` 和 `src/mock/` 辅助文件中。

## 规则

- 页面调用 mock API 方法；页面不能直接调用 `localStorage`。
- mock 方法返回 Promise，并保留少量延迟，方便产品经理看到加载态。
- 需要产品评审的流程要包含成功、空状态和错误路径。
- 演示数据要稳定、真实、容易理解。
- 必要时提供重置演示数据能力。

## 常用接口形态

- `list(filters)` 返回 `{ rows, total }`。
- `create(payload)` 返回新建记录。
- `update(id, payload)` 返回更新后的记录。
- `remove(id)` 返回 `{ success: true }`。
- `reset()` 恢复默认演示数据。
