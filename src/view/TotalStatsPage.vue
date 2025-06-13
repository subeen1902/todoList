<script setup>
import { ref } from 'vue'
import HabitLineChart from '@/components/charts/HabitLineChart.vue'
import TodoLineChart from '@/components/charts/TodoLineChart.vue'
import TodoDoughnutChart from '@/components/charts/TodoDoughnutChart.vue'

const selectedTab = ref('habit')
</script>

<template>
  <div class="total-stats-page">
    <!-- 버튼 영역 -->
    <div class="tab-buttons">
      <button
        class="stats-button"
        :class="{ active: selectedTab === 'habit' }"
        @click="selectedTab = 'habit'"
      >
        Habit-Tracker
      </button>
      <button
        class="stats-button"
        :class="{ active: selectedTab === 'todo' }"
        @click="selectedTab = 'todo'"
      >
        Todo
      </button>
    </div>

    <!-- 차트 영역 -->
    <div class="chart-container">
      <div v-if="selectedTab === 'habit'">
        <h2>📈 월별 Habit-Tracker 달성률</h2>
        <HabitLineChart />
      </div>
      <div v-else>
        <h2>📈 월별 Todo 달성률</h2>
        <TodoLineChart />
        <h2 style="margin-top: 40px">📉 월별 Tag Todo</h2>
        <TodoDoughnutChart />
      </div>
    </div>
  </div>
</template>

<style scoped>
.total-stats-page {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 32px;
  background-color: #f9f9f9;
}

.tab-buttons {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
}

.stats-button {
  padding: 12px 28px;
  font-size: 16px;
  border-radius: 16px;
  border: none;
  background-color: #ddd;
  color: #333;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.stats-button.active,
.stats-button:hover {
  background-color: #bbb;
}

.chart-container {
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
}

h2 {
  font-size: 18px;
  margin-bottom: 12px;
}
</style>
