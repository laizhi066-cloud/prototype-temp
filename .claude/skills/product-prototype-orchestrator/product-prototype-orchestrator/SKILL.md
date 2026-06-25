---
name: product-prototype-orchestrator
description: 产品经理提出新原型、扩展原型或迭代原型时使用。负责把原始想法串成项目类型识别、页面计划、UI 骨架、mock API 计划、实现和评审。
---

# 产品原型编排

这是产品原型请求的总流程。

## 工作流

1. 使用 `project-intake-classifier` 判断项目类型。
2. 使用 `product-question-gate` 控制追问。
3. 使用 `product-theme-advisor` 根据产品类型推荐主题、配色、布局密度和登录页方向。
4. 使用 `product-context` 更新当前产品上下文。
5. 把想法整理成目标用户、场景、页面、路由、交互、mock 数据和验收标准。
6. 后台 / SaaS / CRM / 数据看板页面使用 `element-plus-prototype`，侧边栏导航默认写入 `productProfile.navTree`。
7. 模拟后端行为放到 `mock-api-localstorage`。
8. 新增业务模块时使用 `feature-module-template`。
9. 修改品牌样式、主题或默认登录信息时使用 `brand-config`。
10. 完成前使用 `prototype-review` 评审。

## 实现说明格式

写代码前必须用中文输出：

- 项目类型：
- 默认假设：
- 主题推荐：
- 不采用的风格：
- 页面 / 路由：
- 共享布局 / 组件：
- mock API / localStorage：
- 验收标准：
