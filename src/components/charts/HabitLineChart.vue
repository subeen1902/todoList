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
import { onMounted, ref, computed } from 'vue'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale)

const API = 'http://localhost:3000/habits'
const monthlyData = ref({})

const fetchHabitData = async () => {
  const res = await axios.get(API)
  const habits = res.data
  const grouped = {}

  habits.forEach((h) => {
    const dateStr = h.checkedAt
    if (!dateStr) return

    const dateObj = new Date(dateStr)
    if (isNaN(dateObj)) return

    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const monthKey = `${year}-${month}`

    if (!grouped[monthKey]) grouped[monthKey] = { total: 0, done: 0 }
    grouped[monthKey].total++

    if (h.checked === true) grouped[monthKey].done++
  })

  monthlyData.value = grouped
}

onMounted(fetchHabitData)

const getMonthRange = (start, end) => {
  const result = []
  const startDate = new Date(start + '-01')
  const endDate = new Date(end + '-01')

  while (startDate <= endDate) {
    const year = startDate.getFullYear()
    const month = String(startDate.getMonth() + 1).padStart(2, '0')
    result.push(`${year}-${month}`)
    startDate.setMonth(startDate.getMonth() + 1)
  }

  return result
}

const chartData = computed(() => {
  const months = Object.keys(monthlyData.value).sort()
  if (months.length === 0) return { labels: [], datasets: [] }

  const fullMonths = getMonthRange(months[0], months[months.length - 1])
  const data = fullMonths.map((month) => {
    const entry = monthlyData.value[month]
    return entry ? Math.round((entry.done / entry.total) * 100) : 0
  })

  return {
    labels: fullMonths,
    datasets: [
      {
        label: '루틴 달성률 (%)',
        data,
        fill: false,
        borderColor: '#6a94ff',
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
