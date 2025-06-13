<script setup>
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const API = 'http://localhost:3000/todos'
const monthlyData = ref({})

const fetchTodoData = async () => {
  const res = await axios.get(API)
  const todos = res.data
  const grouped = {}

  todos.forEach((todo) => {
    const month = todo.date?.slice(0, 7) // "YYYY-MM"
    if (!month) return
    if (!grouped[month]) grouped[month] = { total: 0, done: 0 }
    grouped[month].total++
    if (todo.checked) grouped[month].done++
  })

  monthlyData.value = grouped
}

onMounted(fetchTodoData)

const chartData = computed(() => {
  const labels = Object.keys(monthlyData.value).sort()
  const data = labels.map((month) => {
    const entry = monthlyData.value[month]
    return entry.total === 0 ? 0 : Math.round((entry.done / entry.total) * 100)
  })
  return {
    labels,
    datasets: [
      {
        label: '투두 달성률 (%)',
        data,
        fill: false,
        borderColor: '#FF8C42',
        tension: 0.3,
      },
    ],
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
  },
  scales: {
    y: {
      min: 0,
      max: 100,
      ticks: {
        callback: (value) => `${value}%`,
      },
    },
  },
}
</script>

<template>
  <div>
    <Line :data="chartData" :options="options" />
  </div>
</template>
