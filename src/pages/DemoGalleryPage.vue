<script setup>
import { useRouter } from 'vue-router'
import { productProfile } from '../config/productProfile'
import { appConfig } from '../config/appConfig'

const router = useRouter()

const forms = [
  {
    key: 'admin',
    tag: '后台管理',
    title: '后台 / 运营系统',
    desc: '固定头部 + 侧边栏 + 内容区，Element Plus 表格、表单、弹窗、筛选、分页。适合 SaaS、CRM、运营后台、数据看板。',
    layout: 'src/layouts/AppLayout.vue',
    to: '/login',
    cta: '进入后台 demo（需登录）',
  },
  {
    key: 'consumer',
    tag: 'C 端 Web',
    title: 'C 端官网 / 商城',
    desc: '顶部导航 + 首页 + 列表 + 详情，无后台侧边栏。适合面向用户的官网、商城、内容站、预约下单。',
    layout: 'src/layouts/ConsumerLayout.vue',
    to: '/demo/consumer',
    cta: '查看 C 端 demo',
  },
  {
    key: 'h5',
    tag: 'H5 移动端',
    title: 'H5 移动端 App',
    desc: '手机宽度 + 顶部栏 + 底部 Tab + 单列卡片，触控友好。适合活动页、小程序风格、移动端工具。',
    layout: 'src/layouts/MobileLayout.vue',
    to: '/demo/h5',
    cta: '查看 H5 demo',
  },
]
</script>

<template>
  <main class="gallery">
    <header class="gallery-head">
      <div class="brand-mark">{{ productProfile.brandMark }}</div>
      <h1>{{ productProfile.shortName }} · 形态画廊</h1>
      <p>这个脚手架支持三种产品形态。新项目由 AI 按需求选一种，删掉其余即可。</p>
    </header>

    <section class="cards">
      <article v-for="f in forms" :key="f.key" class="card">
        <span class="tag">{{ f.tag }}</span>
        <h2>{{ f.title }}</h2>
        <p class="desc">{{ f.desc }}</p>
        <code class="layout">{{ f.layout }}</code>
        <el-button type="primary" class="go" @click="router.push(f.to)">
          {{ f.cta }} →
        </el-button>
      </article>
    </section>

    <footer class="gallery-foot">
      产品文档（PRD）公开入口：
      <a href="/prd" target="_blank" rel="noopener">/prd</a>
    </footer>
  </main>
</template>

<style scoped>
.gallery {
  min-height: 100vh;
  padding: 48px 20px 64px;
  background:
    radial-gradient(circle at 50% 0%, rgba(29, 78, 216, 0.06), transparent 38%),
    #f3f4f6;
}
.gallery-head {
  max-width: 880px;
  margin: 0 auto 36px;
  text-align: center;
}
.brand-mark {
  display: inline-grid;
  width: 46px;
  height: 46px;
  place-items: center;
  border-radius: 10px;
  background: v-bind('appConfig.primaryColor');
  color: #fff;
  font-size: 22px;
  font-weight: 800;
}
.gallery-head h1 {
  margin: 14px 0 8px;
  font-size: 26px;
  color: #111827;
}
.gallery-head p {
  margin: 0;
  color: #6b7280;
  font-size: 14px;
}
.cards {
  max-width: 1080px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
@media (max-width: 880px) {
  .cards { grid-template-columns: 1fr; }
}
.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);
}
.tag {
  padding: 3px 10px;
  border-radius: 999px;
  background: rgba(29, 78, 216, 0.1);
  color: v-bind('appConfig.primaryColor');
  font-size: 12px;
  font-weight: 600;
}
.card h2 {
  margin: 12px 0 8px;
  font-size: 18px;
  color: #111827;
}
.desc {
  flex: 1;
  margin: 0 0 14px;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.7;
}
.layout {
  margin-bottom: 16px;
  padding: 4px 8px;
  border-radius: 6px;
  background: #f3f4f6;
  color: #6b7280;
  font-size: 12px;
}
.go { width: 100%; }
.gallery-foot {
  margin-top: 40px;
  text-align: center;
  color: #6b7280;
  font-size: 13px;
}
.gallery-foot a { color: v-bind('appConfig.primaryColor'); }
</style>
