<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AddButton from '@/components/common/AddButton.vue'

const router = useRouter()

const todos = ref([])
const tags = ref([])
const selectedTagId = ref(null)
const viewMode = ref('today') // 'today' or 'next7'
const toggleStates = ref({}) // 날짜별 접기/펼치기 상태

const today = new Date().toISOString().split('T')[0]

// 다음 7일 날짜 배열
const next7Dates = computed(() => {
  const dates = []
  for (let i = 0; i < 7; i++) {
    const dateObj = new Date()
    dateObj.setDate(dateObj.getDate() + i)
    const iso = dateObj.toISOString().split('T')[0]
    const label =
      i === 0
        ? 'Today'
        : i === 1
          ? 'Tomorrow'
          : `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`
    dates.push({ date: iso, label })
  }
  return dates
})

const getTagName = (tagId) => {
  const tag = tags.value.find((t) => String(t.id) === String(tagId))
  return tag ? tag.name : ''
}

const filteredTodosByDate = (date) => {
  return todos.value.filter((todo) => {
    return (
      todo.date === date &&
      (selectedTagId.value === null || String(todo.tagId) === String(selectedTagId.value))
    )
  })
}

const fetchTags = async () => {
  const res = await axios.get('http://localhost:3000/tags')
  tags.value = res.data
}

const fetchTodos = async () => {
  const res = await axios.get('http://localhost:3000/todos')
  todos.value = res.data
}

const goToAddPage = () => {
  router.push('/add')
}

onMounted(async () => {
  await fetchTags()
  await fetchTodos()

  next7Dates.value.forEach((d) => {
    if (!(d.date in toggleStates.value)) {
      toggleStates.value[d.date] = true
    }
  })
})
</script>

<template>
  <div class="home-page">
    <main class="home-main">
      <section class="tab-section">
        <div class="tab-item" :class="{ active: viewMode === 'today' }" @click="viewMode = 'today'">
          <i class="fa-regular fa-calendar"> Today</i>
        </div>
        <div class="tab-item" :class="{ active: viewMode === 'next7' }" @click="viewMode = 'next7'">
          <i class="fa-regular fa-calendar-days"> Next 7 Days</i>
        </div>
        <ul>
          <li
            v-for="tag in tags"
            :key="tag.id"
            :class="{ active: selectedTagId === tag.id }"
            @click="selectedTagId = selectedTagId === tag.id ? null : tag.id"
          >
            {{ tag.name }}
          </li>
        </ul>
      </section>
      <section class="todo-section">
        <h2 class="todo-title">
          {{ viewMode === 'today' ? 'Today' : 'Next 7 Days' }}
        </h2>

        <!-- Today -->
        <div v-if="viewMode === 'today'">
          <ul class="todo-list">
            <li v-for="todo in filteredTodosByDate(today)" :key="todo.id" class="todo-item">
              <span class="tag">{{ getTagName(todo.tagId) }}</span>
              <input type="checkbox" v-model="todo.checked" />
              <span class="text">{{ todo.text }}</span>
              <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
            </li>
          </ul>
        </div>

        <!-- Next 7 Days -->
        <div v-else>
          <div v-for="day in next7Dates" :key="day.date" class="date-group">
            <div class="date-header" @click="toggleStates[day.date] = !toggleStates[day.date]">
              <i
                :class="
                  toggleStates[day.date] ? 'fa-solid fa-chevron-down' : 'fa-solid fa-chevron-right'
                "
                class="arrow"
              ></i>
              <span class="date-title">{{ day.label }}</span>
            </div>
            <ul v-if="toggleStates[day.date]" class="todo-list">
              <li v-for="todo in filteredTodosByDate(day.date)" :key="todo.id" class="todo-item">
                <span class="tag">{{ getTagName(todo.tagId) }}</span>
                <input type="checkbox" v-model="todo.checked" />
                <span class="text">{{ todo.text }}</span>
                <button class="delete"><i class="fa-regular fa-trash-can"></i></button>
              </li>
            </ul>
          </div>
        </div>

        <!-- AddButton -->
        <AddButton @click="goToAddPage" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  height: 100vh;
  background-color: var(--lightgray);
  font-family: 'Noto Sans KR', sans-serif;
}

.home-main {
  display: flex;
  flex: 1;
  width: 100%;
}

.tab-section {
  width: 240px;
  background-color: var(--lightlightgray);
  padding: 32px 16px;
  border-right: 1px solid var(--gray);
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
}

.tab-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  color: var(--blacktext);
  background-color: transparent;
  transition: background-color 0.2s ease;
}

.tab-item.active {
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  font-weight: 600;
}

.tab-item i {
  margin-right: 8px;
}

.tab-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tab-section li {
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: var(--blacktext);
}

.tab-section li.active,
.tab-section li:hover {
  background-color: #fff;
  font-weight: 500;
}

.todo-section {
  flex-grow: 1;
  width: calc(100vw - 60px - 240px);
  padding: 48px 56px;
  position: relative;
  overflow-y: auto;
  background-color: #fff;
  min-height: 100vh;
}

.todo-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--blacktext);
  display: flex;
  align-items: center;
  gap: 8px;
}

.date-group {
  margin-bottom: 32px;
}

.date-header {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  color: var(--blacktext);
  margin-bottom: 16px;
  gap: 6px;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 12px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid var(--gray);
}

.todo-item .tag {
  font-weight: 600;
  font-size: 14px;
  min-width: 60px;
  color: var(--darkgray);
  text-align: left;
  white-space: nowrap;
  flex-shrink: 0;
}

.todo-item .text {
  flex: 1;
  font-size: 15px;
  color: var(--blacktext);
}

.todo-item .delete {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: var(--darkgray);
  transition: color 0.2s;
}

.todo-item .delete:hover {
  color: #888;
}

.arrow {
  font-size: 14px;
  margin-right: 4px;
  color: var(--darkgray);
}
</style>
