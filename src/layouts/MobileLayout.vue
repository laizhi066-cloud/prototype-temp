<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ArrowLeft,
  Grid,
  House,
  List,
  User,
} from '@element-plus/icons-vue'
import { appConfig } from '../config/appConfig'
import { productProfile } from '../config/productProfile'

// H5 移动端通用外壳：
// - 居中的手机宽度容器（max-width 430px，两侧浅灰背景模拟手机）
// - 顶部栏：标题 + 可选返回按钮（props 传入）
// - 中间内容区可滚动（默认插槽 <slot />）
// - 底部 Tab 栏：首页/分类/订单/我的，点击用 router.push 切换并高亮当前
// 主色统一取 appConfig.primaryColor。
//
// 用法示例：
//   <MobileLayout title="首页" active-tab="home"> ... </MobileLayout>
//   <MobileLayout title="个人中心" active-tab="profile" :show-back="true"> ... </MobileLayout>
const props = defineProps({
  // 顶部栏标题；不传则用产品短名
  title: {
    type: String,
    default: '',
  },
  // 是否显示左上角返回按钮
  showBack: {
    type: Boolean,
    default: false,
  },
  // 当前高亮的底部 Tab：home / category / order / profile
  activeTab: {
    type: String,
    default: 'home',
  },
})

const router = useRouter()

const headerTitle = computed(() => props.title || productProfile.shortName)

// 底部 Tab 配置。脚手架阶段：首页 → /demo/h5，我的 → /demo/h5/profile，
// 其它 tab 暂时都指向 /demo/h5，接入真实页面时改 path 即可。
const tabs = [
  { key: 'home', label: '首页', icon: House, path: '/demo/h5' },
  { key: 'category', label: '分类', icon: Grid, path: '/demo/h5' },
  { key: 'order', label: '订单', icon: List, path: '/demo/h5' },
  { key: 'profile', label: '我的', icon: User, path: '/demo/h5/profile' },
]

function goBack() {
  // 有历史则后退，否则回首页
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/demo/h5')
  }
}

function switchTab(tab) {
  if (tab.key === props.activeTab) return
  router.push(tab.path)
}
</script>

<template>
  <!-- 最外层：两侧浅灰背景，模拟手机置于桌面中 -->
  <div class="m-stage">
    <!-- 手机宽度容器 -->
    <div class="m-phone">
      <!-- 顶部栏 -->
      <header class="m-header">
        <button
          v-if="showBack"
          class="m-back"
          type="button"
          aria-label="返回"
          @click="goBack"
        >
          <el-icon><ArrowLeft /></el-icon>
        </button>
        <span class="m-title">{{ headerTitle }}</span>
        <!-- 右侧占位，保证标题视觉居中 -->
        <span class="m-header-spacer" />
      </header>

      <!-- 可滚动内容区 -->
      <main class="m-content">
        <slot />
      </main>

      <!-- 底部 Tab 栏 -->
      <nav class="m-tabbar">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          type="button"
          class="m-tab"
          :class="{ 'm-tab--active': tab.key === activeTab }"
          @click="switchTab(tab)"
        >
          <el-icon class="m-tab-icon"><component :is="tab.icon" /></el-icon>
          <span class="m-tab-label">{{ tab.label }}</span>
        </button>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.m-stage {
  display: flex;
  justify-content: center;
  min-height: 100vh;
  /* 两侧浅灰，模拟手机外的桌面背景 */
  background: #e9ebef;
}

.m-phone {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 430px;
  min-height: 100vh;
  background: #f5f6f8;
  /* 桌面下给点阴影，更像一块独立屏幕 */
  box-shadow: 0 0 0 1px rgba(17, 24, 39, 0.04), 0 12px 40px rgba(17, 24, 39, 0.12);
}

/* 顶部栏 */
.m-header {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: 48px;
  padding: 0 8px;
  background: v-bind('appConfig.primaryColor');
  color: #ffffff;
}

.m-back {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border: 0;
  background: transparent;
  color: #ffffff;
  font-size: 18px;
  cursor: pointer;
}

.m-title {
  flex: 1;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  /* 标题过长省略 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.m-header-spacer {
  width: 36px;
}

/* 内容区：可滚动，底部留出 Tab 栏高度 */
.m-content {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 64px;
  -webkit-overflow-scrolling: touch;
}

/* 底部 Tab 栏：吸底，大点击区 */
.m-tabbar {
  position: sticky;
  bottom: 0;
  z-index: 10;
  display: flex;
  height: 56px;
  background: #ffffff;
  border-top: 1px solid #ececef;
  box-shadow: 0 -2px 12px rgba(17, 24, 39, 0.04);
}

.m-tab {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  border: 0;
  background: transparent;
  color: #9aa0a6;
  font-size: 11px;
  cursor: pointer;
  transition: color 0.15s ease;
}

.m-tab-icon {
  font-size: 21px;
}

.m-tab-label {
  line-height: 1;
}

.m-tab--active {
  color: v-bind('appConfig.primaryColor');
  font-weight: 600;
}
</style>
