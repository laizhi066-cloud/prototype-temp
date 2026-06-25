<script setup>
import {
  DataAnalysis,
  Document,
  Fold,
  House,
  Menu as MenuIcon,
  ShoppingCart,
  SwitchButton,
  User,
  Warning,
} from '@element-plus/icons-vue'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { appConfig } from '../config/appConfig'
import { productProfile } from '../config/productProfile'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()
const drawerVisible = ref(false)

const iconMap = {
  DataAnalysis,
  Document,
  Fold,
  House,
  ShoppingCart,
  User,
  Warning,
}

const navTree = productProfile.navTree
const activeMenu = computed(() => route.path)

function getIcon(name) {
  return iconMap[name] || Document
}

function handleMenuSelect() {
  drawerVisible.value = false
}

function handleLogout() {
  auth.logout()
  router.push('/login')
}

function openPrd() {
  window.open('/prd', '_blank', 'noopener,noreferrer')
}
</script>

<template>
  <el-container class="app-layout">
    <el-aside class="app-sidebar" width="232px">
      <div class="brand">
        <div class="brand-mark">{{ productProfile.brandMark }}</div>
        <div>
          <div class="brand-name">{{ productProfile.shortName }}</div>
          <div class="brand-desc">{{ productProfile.subtitle }}</div>
        </div>
      </div>

      <el-menu
        router
        :default-active="activeMenu"
        class="side-menu"
        background-color="#111827"
        text-color="#d1d5db"
        active-text-color="#ffffff"
        :default-openeds="['订单中心']"
        @select="handleMenuSelect"
      >
        <template v-for="item in navTree" :key="item.label">
          <el-sub-menu v-if="item.children?.length" :index="item.label">
            <template #title>
              <el-icon><component :is="getIcon(item.icon)" /></el-icon>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
            >
              <el-icon><component :is="getIcon(child.icon)" /></el-icon>
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.path">
            <el-icon><component :is="getIcon(item.icon)" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="app-header">
        <div class="header-left">
          <el-button
            class="mobile-menu-button"
            :icon="MenuIcon"
            circle
            @click="drawerVisible = true"
          >
            <span class="sr-only">打开导航菜单</span>
          </el-button>
          <el-icon class="header-menu-icon"><MenuIcon /></el-icon>
          <span>{{ productProfile.headerHint }}</span>
        </div>
        <div class="header-right">
          <el-button class="prd-button" type="primary" plain @click="openPrd">
            PRD
          </el-button>
          <span class="user-role">{{ auth.user?.role }}</span>
          <el-dropdown>
            <span class="user-name">{{ auth.user?.name }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="SwitchButton" @click="handleLogout">
                  退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main class="app-main">
        <slot />
      </el-main>
    </el-container>

    <el-drawer
      v-model="drawerVisible"
      title="导航菜单"
      direction="ltr"
      size="280px"
      class="mobile-nav-drawer"
    >
      <div class="drawer-brand">
        <div class="brand-mark">{{ productProfile.brandMark }}</div>
        <div>
          <div class="brand-name">{{ productProfile.shortName }}</div>
          <div class="brand-desc">{{ productProfile.subtitle }}</div>
        </div>
      </div>
      <el-menu
        router
        :default-active="activeMenu"
        class="drawer-menu"
        :default-openeds="['订单中心']"
        @select="handleMenuSelect"
      >
        <template v-for="item in navTree" :key="item.label">
          <el-sub-menu v-if="item.children?.length" :index="item.label">
            <template #title>
              <el-icon><component :is="getIcon(item.icon)" /></el-icon>
              <span>{{ item.label }}</span>
            </template>
            <el-menu-item
              v-for="child in item.children"
              :key="child.path"
              :index="child.path"
            >
              <el-icon><component :is="getIcon(child.icon)" /></el-icon>
              <span>{{ child.label }}</span>
            </el-menu-item>
          </el-sub-menu>

          <el-menu-item v-else :index="item.path">
            <el-icon><component :is="getIcon(item.icon)" /></el-icon>
            <span>{{ item.label }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-drawer>
  </el-container>
</template>

<style scoped>
.app-layout {
  min-height: 100vh;
}

.app-sidebar {
  background: #111827;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 72px;
  padding: 0 18px;
  color: #ffffff;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 8px;
  background: v-bind('appConfig.primaryColor');
  font-weight: 800;
}

.brand-name {
  font-size: 15px;
  font-weight: 700;
}

.brand-desc {
  margin-top: 2px;
  color: #9ca3af;
  font-size: 12px;
}

.side-menu {
  border-right: 0;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  border-bottom: 1px solid #e5e7eb;
  background: #ffffff;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4b5563;
  font-size: 13px;
}

.header-menu-icon {
  font-size: 18px;
}

.mobile-menu-button {
  display: none;
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

.user-role {
  color: #6b7280;
  font-size: 12px;
}

.prd-button {
  height: 30px;
  padding: 0 12px;
  font-weight: 600;
}

.user-name {
  cursor: pointer;
  color: #111827;
  font-size: 13px;
  font-weight: 600;
}

.app-main {
  padding: 24px;
  background: #f3f4f6;
}

.drawer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 0 18px;
  color: #111827;
}

.drawer-menu {
  border-right: 0;
}

@media (max-width: 900px) {
  .app-sidebar {
    display: none;
  }

  .app-header {
    position: sticky;
    top: 0;
    z-index: 20;
    padding: 0 14px;
  }

  .mobile-menu-button {
    display: inline-flex;
  }

  .header-menu-icon {
    display: none;
  }

  .header-left span {
    max-width: 42vw;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .user-role {
    display: none;
  }

  .prd-button {
    min-width: 44px;
    padding: 0 10px;
  }

  .app-main {
    padding: 16px;
  }
}

@media (max-width: 520px) {
  .app-main {
    padding: 14px 12px;
  }

  .header-left span {
    max-width: 36vw;
  }
}
</style>
