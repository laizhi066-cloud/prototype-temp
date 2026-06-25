---
name: brand-config
description: 产品经理要求修改产品原型的产品名、品牌文案、默认登录账号、演示用户角色、主题色或应用标签时使用。所有产品身份信息必须从统一配置中修改。
---

# 品牌配置

产品身份优先放在 `src/config/productProfile.js`，技术默认项放在 `src/config/appConfig.js`。

## 规则

- 产品名、副标题、品牌缩写、项目类型、目标用户、登录页文案、树状导航和首页指标优先在 `productProfile.js` 中修改。
- 默认账号、默认密码、演示用户角色和主色在 `appConfig.js` 中修改。
- 不要把产品名散落在多个页面里。
- 页面特有文案可以留在页面内。
- 修改默认登录信息时，同步更新 `README.md`。
- 修改主色时，注意 Element Plus 可用性和对比度。

## 必查项

- 登录页显示 `productProfile` 中的产品名。
- 侧边栏品牌使用 `productProfile` 中的品牌缩写和产品名，导航使用 `productProfile.navTree`。
- README 中的默认登录信息与配置一致。
- 构建通过。
