<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppLayout from '../layouts/AppLayout.vue'

const route = useRoute()

const title = computed(() => route.meta.title || '业务模块')
const subtitle = computed(() => route.meta.subtitle || '维护核心业务信息和日常处理进度。')
const metrics = computed(() => route.meta.metrics || [])
</script>

<template>
  <AppLayout>
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ title }}</h1>
        <p class="page-subtitle">{{ subtitle }}</p>
      </div>
      <el-button type="primary">新增记录</el-button>
    </div>

    <section class="metric-grid compact-metric-grid">
      <div v-for="metric in metrics" :key="metric.label" class="metric-card">
        <div class="metric-label">{{ metric.label }}</div>
        <div class="metric-value">{{ metric.value }}</div>
      </div>
    </section>

    <el-card class="content-card" shadow="never">
      <el-empty
        description="暂无业务记录，可通过新增记录录入第一条数据"
        :image-size="120"
      >
        <el-button type="primary">新增记录</el-button>
      </el-empty>
    </el-card>
  </AppLayout>
</template>
