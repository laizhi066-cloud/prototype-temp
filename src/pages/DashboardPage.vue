<script setup>
import AppLayout from '../layouts/AppLayout.vue'
import { productProfile } from '../config/productProfile'

const metrics = productProfile.dashboardMetrics
const queues = productProfile.workspaceQueues
const alerts = productProfile.riskAlerts
const activities = productProfile.recentActivities
const processSteps = [
  { title: '接收订单', description: '同步线上和销售录入订单' },
  { title: '确认状态', description: '核对付款、发货和客户信息' },
  { title: '处理异常', description: '优先跟进待处理订单' },
  { title: '完成归档', description: '沉淀交易记录和操作结果' },
]
</script>

<template>
  <AppLayout>
    <div class="page-header">
      <div>
        <h1 class="page-title">{{ productProfile.workspaceTitle }}</h1>
        <p class="page-subtitle">{{ productProfile.workspaceSubtitle }}</p>
      </div>
    </div>

    <section class="metric-grid">
      <div v-for="metric in metrics" :key="metric.label" class="metric-card">
        <div class="metric-label">{{ metric.label }}</div>
        <div class="metric-value">{{ metric.value }}</div>
      </div>
    </section>

    <el-card class="content-card" shadow="never">
      <template #header>
        <strong>今日订单处理链路</strong>
      </template>
      <el-steps class="desktop-process-steps" :active="3" finish-status="success" align-center>
        <el-step
          v-for="step in processSteps"
          :key="step.title"
          :title="step.title"
          :description="step.description"
        />
      </el-steps>
      <div class="mobile-process-list">
        <div v-for="(step, index) in processSteps" :key="step.title" class="mobile-process-item">
          <span>{{ index + 1 }}</span>
          <div>
            <strong>{{ step.title }}</strong>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </el-card>

    <section class="dashboard-grid">
      <el-card class="content-card" shadow="never">
        <template #header>
          <strong>待处理队列</strong>
        </template>
        <div class="queue-list">
          <div v-for="item in queues" :key="item.title" class="queue-item">
            <div>
              <div class="queue-title">{{ item.title }}</div>
              <div class="queue-hint">{{ item.hint }}</div>
            </div>
            <strong>{{ item.count }}</strong>
          </div>
        </div>
      </el-card>

      <el-card class="content-card" shadow="never">
        <template #header>
          <strong>风险提醒</strong>
        </template>
        <div class="alert-list">
          <div v-for="item in alerts" :key="item.title" class="alert-item">
            <el-tag :type="item.level === '高' ? 'danger' : 'warning'" size="small">
              {{ item.level }}
            </el-tag>
            <div>
              <div class="queue-title">{{ item.title }}</div>
              <div class="queue-hint">{{ item.owner }}</div>
            </div>
          </div>
        </div>
      </el-card>

      <el-card class="content-card recent-card" shadow="never">
        <template #header>
          <strong>最近动态</strong>
        </template>
        <el-timeline>
          <el-timeline-item
            v-for="item in activities"
            :key="`${item.action}-${item.time}`"
            :timestamp="item.time"
          >
            {{ item.action }}：{{ item.target }}
          </el-timeline-item>
        </el-timeline>
      </el-card>
    </section>
  </AppLayout>
</template>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.recent-card {
  grid-column: 1 / -1;
}

.mobile-process-list {
  display: none;
}

.queue-list,
.alert-list {
  display: grid;
  gap: 12px;
}

.queue-item,
.alert-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #f9fafb;
}

.alert-item {
  justify-content: flex-start;
}

.queue-title {
  color: #111827;
  font-size: 13px;
  font-weight: 600;
}

.queue-hint {
  margin-top: 4px;
  color: #6b7280;
  font-size: 12px;
}

@media (max-width: 760px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .desktop-process-steps {
    display: none;
  }

  .mobile-process-list {
    display: grid;
    gap: 12px;
  }

  .mobile-process-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #f9fafb;
  }

  .mobile-process-item span {
    display: grid;
    width: 28px;
    height: 28px;
    flex: 0 0 28px;
    place-items: center;
    border-radius: 999px;
    background: #dcfce7;
    color: #166534;
    font-weight: 700;
  }

  .mobile-process-item strong {
    color: #111827;
    font-size: 13px;
  }

  .mobile-process-item p {
    margin: 4px 0 0;
    color: #6b7280;
    font-size: 12px;
    line-height: 1.5;
  }
}
</style>
