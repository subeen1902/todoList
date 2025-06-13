<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AddButton from '@/components/common/AddButton.vue'

const router = useRouter()

const today = new Date().toISOString().split('T')[0]
const todos = ref([])
const habits = ref([])
const tags = ref([])

const fetchTags = async () => {
  const res = await axios.get('http://localhost:3000/tags')
  tags.value = res.data
}

const fetchTodos = async () => {
  const res = await axios.get('http://localhost:3000/todos')
  todos.value = res.data.filter((t) => t.date === today)
}

const fetchHabits = async () => {
  const res = await axios.get('http://localhost:3000/habits')
  habits.value = res.data.filter((h) => h.date === today)
}

const getTagName = (tagId) => {
  const tag = tags.value.find((t) => String(t.id) === String(tagId))
  return tag ? tag.name : ''
}

const goToAddPage = () => {
  router.push('/add')
}

onMounted(() => {
  fetchTags()
  fetchTodos()
  fetchHabits()
})
</script>

<template>
  <div class="home-summary-page">
    <section>
      <h2>✅ 오늘의 투두</h2>
      <ul>
        <li v-for="todo in todos" :key="todo.id">
          <span class="tag">{{ getTagName(todo.tagId) }}</span>
          <input type="checkbox" v-model="todo.checked" disabled />
          <span class="text">{{ todo.text }}</span>
        </li>
      </ul>
    </section>

    <section>
      <h2>📌 오늘의 습관</h2>
      <ul>
        <li v-for="habit in habits" :key="habit.id">
          <span class="tag">{{ getTagName(habit.tagId) }}</span>
          <input type="checkbox" v-model="habit.checked" disabled />
          <span class="text">{{ habit.text }}</span>
        </li>
      </ul>

      <!-- AddButton -->
      <AddButton @click="goToAddPage" />
    </section>
  </div>
</template>

<style scoped>
.home-summary-page {
  flex: 1;
  padding: 48px 56px;
  background-color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  min-height: 100vh;
  overflow-y: auto;
}

section {
  margin-bottom: 40px;
}

h2 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
  color: var(--blacktext);
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

li {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 20px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid var(--gray);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
  color: var(--blacktext);
  font-size: 15px;
}

.tag {
  font-weight: 600;
  font-size: 14px;
  min-width: 60px;
  color: var(--darkgray);
  text-align: left;
  white-space: nowrap;
  flex-shrink: 0;
}

.text {
  flex: 1;
}
</style>
