<script setup>
import { productProfile } from '../config/productProfile'

const prd = productProfile.prd

const directory = [
  { id: 'summary', label: '需求摘要' },
  { id: 'scope', label: '范围说明' },
  { id: 'pages', label: '页面目录' },
  { id: 'stories', label: '用户故事' },
  { id: 'acceptance', label: '验收标准' },
  { id: 'handoff', label: '交付文件' },
]

const pages = [
  { name: '登录页', route: '/login', purpose: '展示系统名称、描述和登录表单' },
  { name: '工作台', route: '/', purpose: '查看订单处理概览、待办队列和风险提醒' },
  { name: '订单列表', route: '/orders', purpose: '查询、新增、编辑和删除订单' },
  { name: '异常订单', route: '/orders/exceptions', purpose: '优先处理需要复核的订单' },
  { name: '数据看板', route: '/analytics', purpose: '查看订单趋势和经营分析入口' },
]

const userStories = [
  {
    title: '查看订单工作台',
    role: productProfile.targetUser,
    action: '登录后查看待处理订单和异常提醒',
    value: '快速判断当天需要优先处理的订单事项',
  },
  {
    title: '维护订单记录',
    role: productProfile.targetUser,
    action: '查询、新增、编辑和删除订单',
    value: '保证订单信息准确并能持续跟进',
  },
  {
    title: '处理异常订单',
    role: productProfile.targetUser,
    action: '进入异常订单列表查看待复核订单',
    value: '优先解决影响交付和客户体验的问题',
  },
]
</script>

<template>
  <main class="prd-docs">
    <aside class="docs-sidebar">
      <div class="docs-brand">
        <div class="brand-mark">{{ productProfile.brandMark }}</div>
        <div>
          <strong>{{ productProfile.productName }}</strong>
          <span>PRD 文档</span>
        </div>
      </div>

      <nav class="docs-directory" aria-label="PRD 目录">
        <a v-for="item in directory" :key="item.id" :href="`#${item.id}`">
          {{ item.label }}
        </a>
      </nav>
    </aside>

    <article class="docs-content">
      <header class="docs-header">
        <p>{{ productProfile.projectType }} · {{ prd.version }}</p>
        <h1>{{ productProfile.productName }} PRD</h1>
        <span>{{ prd.owner }}维护，供产品、设计、开发和测试评审使用。</span>
      </header>

      <section id="summary" class="doc-section">
        <h2>需求摘要</h2>
        <dl class="summary-grid">
          <div>
            <dt>目标用户</dt>
            <dd>{{ productProfile.targetUser }}</dd>
          </div>
          <div>
            <dt>产品目标</dt>
            <dd>{{ prd.goal }}</dd>
          </div>
          <div>
            <dt>设计方向</dt>
            <dd>{{ productProfile.themeRecommendation.style }}</dd>
          </div>
          <div>
            <dt>布局密度</dt>
            <dd>{{ productProfile.themeRecommendation.density }}</dd>
          </div>
        </dl>
      </section>

      <section id="scope" class="doc-section two-column">
        <div>
          <h2>本期范围</h2>
          <ul>
            <li v-for="item in prd.scope" :key="item">{{ item }}</li>
          </ul>
        </div>
        <div>
          <h2>本期不包含</h2>
          <ul>
            <li v-for="item in prd.outOfScope" :key="item">{{ item }}</li>
          </ul>
        </div>
      </section>

      <section id="pages" class="doc-section">
        <h2>页面目录</h2>
        <div class="doc-table">
          <div class="table-row table-head">
            <span>页面</span>
            <span>地址</span>
            <span>用途</span>
          </div>
          <div v-for="page in pages" :key="page.route" class="table-row">
            <span>{{ page.name }}</span>
            <code>{{ page.route }}</code>
            <span>{{ page.purpose }}</span>
          </div>
        </div>
      </section>

      <section id="stories" class="doc-section">
        <h2>用户故事</h2>
        <div class="story-list">
          <div v-for="story in userStories" :key="story.title" class="story-item">
            <h3>{{ story.title }}</h3>
            <p>
              作为 {{ story.role }}，我想要 {{ story.action }}，以便于 {{ story.value }}。
            </p>
          </div>
        </div>
      </section>

      <section id="acceptance" class="doc-section">
        <h2>验收标准</h2>
        <ul>
          <li v-for="item in prd.acceptance" :key="item">{{ item }}</li>
        </ul>
      </section>

      <section id="handoff" class="doc-section">
        <h2>交付文件</h2>
        <p class="section-note">
          确认进入开发后，需要把完整文档写入以下目录，并创建中文 commit。
        </p>
        <div class="file-grid">
          <code v-for="item in prd.handoffFiles" :key="item">{{ item }}</code>
        </div>
      </section>
    </article>
  </main>
</template>

<style scoped>
.prd-docs {
  display: grid;
  min-height: 100vh;
  grid-template-columns: 256px minmax(0, 1fr);
  background: #f3f4f6;
  color: #111827;
}

.docs-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 24px 18px;
  border-right: 1px solid #e5e7eb;
  background: #ffffff;
}

.docs-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e5e7eb;
}

.brand-mark {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 8px;
  background: #1d4ed8;
  color: #ffffff;
  font-weight: 800;
}

.docs-brand strong,
.docs-brand span {
  display: block;
}

.docs-brand strong {
  font-size: 14px;
}

.docs-brand span {
  margin-top: 2px;
  color: #6b7280;
  font-size: 12px;
}

.docs-directory {
  display: grid;
  gap: 4px;
  margin-top: 18px;
}

.docs-directory a {
  padding: 9px 10px;
  border-radius: 6px;
  color: #4b5563;
  font-size: 13px;
}

.docs-directory a:hover {
  background: #eff6ff;
  color: #1d4ed8;
}

.docs-content {
  width: min(920px, 100%);
  padding: 40px 32px 72px;
}

.docs-header {
  margin-bottom: 22px;
}

.docs-header p,
.docs-header span {
  margin: 0;
  color: #6b7280;
  font-size: 13px;
}

.docs-header h1 {
  margin: 8px 0;
  font-size: 26px;
  line-height: 1.2;
}

.doc-section {
  margin-bottom: 16px;
  padding: 22px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.doc-section h2 {
  margin: 0 0 14px;
  font-size: 17px;
}

.summary-grid {
  display: grid;
  gap: 12px;
  margin: 0;
}

.summary-grid div {
  display: grid;
  grid-template-columns: 96px minmax(0, 1fr);
  gap: 16px;
}

.summary-grid dt {
  color: #6b7280;
  font-size: 12px;
}

.summary-grid dd {
  margin: 0;
  color: #374151;
  font-size: 13px;
  line-height: 1.7;
}

.two-column {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
}

ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
  color: #374151;
  font-size: 13px;
  line-height: 1.7;
}

.doc-table {
  display: grid;
  overflow: hidden;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.table-row {
  display: grid;
  grid-template-columns: 130px 150px minmax(0, 1fr);
  gap: 12px;
  padding: 11px 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 13px;
}

.table-row:last-child {
  border-bottom: 0;
}

.table-head {
  background: #f9fafb;
  color: #6b7280;
  font-size: 12px;
  font-weight: 700;
}

code {
  color: #1d4ed8;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}

.story-list {
  display: grid;
  gap: 10px;
}

.story-item {
  padding: 13px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.story-item h3 {
  margin: 0;
  font-size: 14px;
}

.story-item p,
.section-note {
  margin: 8px 0 0;
  color: #4b5563;
  font-size: 13px;
  line-height: 1.7;
}

.file-grid {
  display: grid;
  gap: 8px;
  margin-top: 12px;
}

.file-grid code {
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background: #f9fafb;
}

@media (max-width: 800px) {
  .prd-docs {
    grid-template-columns: 1fr;
  }

  .docs-sidebar {
    position: static;
    height: auto;
  }

  .docs-directory {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .docs-content {
    padding: 24px 18px 48px;
  }

  .two-column,
  .summary-grid div,
  .table-row {
    grid-template-columns: 1fr;
  }
}
</style>
