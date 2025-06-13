<script setup>
import { Doughnut } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'

ChartJS.register(Title, Tooltip, Legend, ArcElement)

const todos = ref([])
const tags = ref([])
const API_TODO = 'http://localhost:3000/todos'
const API_TAG = 'http://localhost:3000/tags'
const selectedMonth = ref(new Date().toISOString().slice(0, 7))

const fetchData = async () => {
  const todoRes = await axios.get(API_TODO)
  const tagRes = await axios.get(API_TAG)
  todos.value = todoRes.data
  tags.value = tagRes.data
}

onMounted(fetchData)

const chartData = computed(() => {
  const counts = {}

  todos.value.forEach((todo) => {
    const month = todo.date?.slice(0, 7)
    if (!month || month !== selectedMonth.value) return
    if (!todo.checked) return

    const tagId = todo.tagId
    counts[tagId] = (counts[tagId] || 0) + 1
  })

  const labels = Object.keys(counts).map((tagId) => {
    const tag = tags.value.find((t) => t.id === parseInt(tagId))
    return tag ? tag.name : `태그 ${tagId}`
  })

  const data = Object.values(counts)

  return {
    labels,
    datasets: [
      {
        label: '태그별 완료된 투두 수',
        data,
        backgroundColor: ['#FF8C42', '#6a94ff', '#4BC0C0', '#F67280', '#36A2EB'],
      },
    ],
  }
})

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
  },
}
</script>

<template>
  <div>
    <Doughnut :data="chartData" :options="options" />
  </div>
</template>
