<script setup>
import HabitLineChart from '@/components/charts/HabitLineChart.vue'
</script>

<template>
  <div class="stats-page">
    <h2>📈 루틴 달성률 (월별)</h2>
    <HabitLineChart />
  </div>
</template>

<style scoped>
.stats-page {
  flex: 1;
  min-height: 100vh;
  padding: 40px 60px;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;
}
h2 {
  font-size: 18px;
  margin-bottom: 12px;
}
.chart-container {
  width: 80%;
  max-width: 1000px;
  margin: 0 auto;
}
</style>
