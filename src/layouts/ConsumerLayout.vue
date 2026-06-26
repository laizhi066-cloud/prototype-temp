<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Close, Menu as MenuIcon, User } from '@element-plus/icons-vue'
import { appConfig } from '../config/appConfig'
import { productProfile } from '../config/productProfile'

// C 端通用外壳：顶部导航 + 居中内容容器 + 页脚。
// 自带演示导航数据，不依赖后台 navTree（后台 navTree 是侧边栏结构）。
const router = useRouter()
const drawerVisible = ref(false)

// 顶部导航链接（C 端示例数据，按需替换）
const navLinks = [
  { label: '首页', path: '/demo/consumer' },
  { label: '全部服务', path: '/demo/consumer' },
  { label: '热门推荐', path: '/demo/consumer' },
  { label: '关于我们', path: '/demo/consumer' },
]

function go(path) {
  drawerVisible.value = false
  router.push(path)
}

function goLogin() {
  // C 端登录入口示例；脚手架里暂时跳回首页，接入真实登录时改这里即可
  drawerVisible.value = false
  router.push('/demo/consumer')
}
</script>

<template>
  <div class="consumer-layout">
    <!-- 顶部导航栏 -->
    <header class="c-header">
      <div class="c-header-inner">
        <!-- 左：品牌 -->
        <div class="c-brand" @click="go('/demo/consumer')">
          <div class="c-brand-mark">{{ productProfile.brandMark }}</div>
          <span class="c-brand-name">{{ productProfile.shortName }}</span>
        </div>

        <!-- 中：导航链接（宽屏） -->
        <nav class="c-nav">
          <a
            v-for="link in navLinks"
            :key="link.label"
            class="c-nav-link"
            @click="go(link.path)"
          >
            {{ link.label }}
          </a>
        </nav>

        <!-- 右：登录 / 用户入口（宽屏） -->
        <div class="c-actions">
          <el-button text class="c-login-text" @click="goLogin">登录</el-button>
          <el-button type="primary" round :icon="User" @click="goLogin">
            注册
          </el-button>
        </div>

        <!-- 窄屏汉堡按钮 -->
        <el-button
          class="c-hamburger"
          :icon="MenuIcon"
          circle
          @click="drawerVisible = true"
        >
          <span class="sr-only">打开菜单</span>
        </el-button>
      </div>
    </header>

    <!-- 居中内容容器 -->
    <main class="c-main">
      <div class="c-container">
        <slot />
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="c-footer">
      <div class="c-container c-footer-inner">
        <div class="c-footer-brand">
          <div class="c-brand-mark c-brand-mark--footer">
            {{ productProfile.brandMark }}
          </div>
          <span>{{ productProfile.shortName }}</span>
        </div>
        <div class="c-footer-links">
          <a v-for="link in navLinks" :key="link.label" @click="go(link.path)">
            {{ link.label }}
          </a>
        </div>
        <div class="c-footer-copy">
          © {{ new Date().getFullYear() }} {{ productProfile.shortName }} · 原型演示，仅供展示
        </div>
      </div>
    </footer>

    <!-- 窄屏抽屉导航 -->
    <el-drawer
      v-model="drawerVisible"
      title=""
      direction="rtl"
      size="78%"
      :with-header="false"
      class="c-mobile-drawer"
    >
      <div class="c-drawer-head">
        <div class="c-brand">
          <div class="c-brand-mark">{{ productProfile.brandMark }}</div>
          <span class="c-brand-name">{{ productProfile.shortName }}</span>
        </div>
        <el-button :icon="Close" circle text @click="drawerVisible = false">
          <span class="sr-only">关闭菜单</span>
        </el-button>
      </div>
      <nav class="c-drawer-nav">
        <a
          v-for="link in navLinks"
          :key="link.label"
          class="c-drawer-link"
          @click="go(link.path)"
        >
          {{ link.label }}
        </a>
      </nav>
      <div class="c-drawer-actions">
        <el-button class="c-drawer-btn" @click="goLogin">登录</el-button>
        <el-button class="c-drawer-btn" type="primary" @click="goLogin">
          注册
        </el-button>
      </div>
    </el-drawer>
  </div>
</template>

<style scoped>
.consumer-layout {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  background: #f7f8fa;
  color: #1f2937;
}

.c-container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 顶部导航 */
.c-header {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: saturate(180%) blur(8px);
  border-bottom: 1px solid #eceef1;
}

.c-header-inner {
  display: flex;
  align-items: center;
  gap: 24px;
  height: 64px;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 24px;
}

.c-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}

.c-brand-mark {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 9px;
  background: v-bind('appConfig.primaryColor');
  color: #ffffff;
  font-weight: 800;
  font-size: 16px;
}

.c-brand-name {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.c-nav {
  display: flex;
  align-items: center;
  gap: 28px;
  margin-left: 8px;
}

.c-nav-link {
  position: relative;
  cursor: pointer;
  color: #4b5563;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.15s ease;
}

.c-nav-link:hover {
  color: v-bind('appConfig.primaryColor');
}

.c-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.c-login-text {
  font-size: 15px;
  font-weight: 600;
}

.c-hamburger {
  display: none;
  margin-left: auto;
}

/* 内容区 */
.c-main {
  flex: 1;
  padding: 28px 0 56px;
}

/* 页脚 */
.c-footer {
  background: #111827;
  color: #cbd5e1;
}

.c-footer-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 28px;
  padding-top: 28px;
  padding-bottom: 28px;
}

.c-footer-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #ffffff;
  font-weight: 700;
}

.c-brand-mark--footer {
  width: 30px;
  height: 30px;
  font-size: 14px;
}

.c-footer-links {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.c-footer-links a {
  cursor: pointer;
  color: #cbd5e1;
  font-size: 14px;
  transition: color 0.15s ease;
}

.c-footer-links a:hover {
  color: #ffffff;
}

.c-footer-copy {
  width: 100%;
  padding-top: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: #94a3b8;
  font-size: 13px;
}

/* 抽屉 */
.c-drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 18px;
  border-bottom: 1px solid #eceef1;
}

.c-drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.c-drawer-link {
  padding: 14px 4px;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
  color: #1f2937;
  font-size: 16px;
  font-weight: 500;
}

.c-drawer-actions {
  display: flex;
  gap: 10px;
  padding-top: 18px;
}

.c-drawer-btn {
  flex: 1;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* 响应式：窄屏收起导航与右侧按钮，露出汉堡 */
@media (max-width: 860px) {
  .c-nav,
  .c-actions {
    display: none;
  }

  .c-hamburger {
    display: inline-flex;
  }

  .c-header-inner {
    gap: 12px;
    padding: 0 16px;
  }

  .c-container {
    padding: 0 16px;
  }

  .c-main {
    padding: 18px 0 40px;
  }
}
</style>
