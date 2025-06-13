<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import AddButton from '@/components/common/AddButton.vue'

// json-server 실행 주소
const API = 'http://localhost:3000'

const router = useRouter()

const tags = ref([])
const habits = ref([])
const selectedTag = ref(null)

const today = new Date().toISOString().split('T')[0]
const selectedDate = ref(today)

const getTagName = (tagId) => {
  const tag = tags.value.find((t) => String(t.id) === String(tagId))
  return tag ? tag.name : ''
}

const getThisWeekDates = () => {
  const start = new Date()
  const startDay = start.getDay()
  const mondayOffset = startDay === 0 ? -6 : 1 - startDay
  const monday = new Date(start)
  monday.setDate(start.getDate() + mondayOffset)

  const days = ['월', '화', '수', '목', '금', '토', '일']
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return {
      label: days[i],
      date: d.toISOString().split('T')[0],
    }
  })
}

const weekDates = ref(getThisWeekDates())

const goToAddPage = () => {
  router.push('/add')
}

const isToday = (date) => date === today

const fetchTags = async () => {
  const res = await axios.get(`${API}/tags`)
  tags.value = res.data
}

const fetchHabits = async () => {
  const res = await axios.get(`${API}/habits`)
  habits.value = res.data.map((h) => ({
    ...h,
    checked: h.checkedAt === today,
  }))
}

const toggleHabit = async (habit) => {
  habit.checked = !habit.checked
  habit.checkedAt = habit.checked ? today : null

  await axios.patch(`${API}/habits/${habit.id}`, {
    checkedAt: habit.checkedAt,
  })
}

const deleteHabit = async (id) => {
  await axios.delete(`${API}/habits/${id}`)
  habits.value = habits.value.filter((h) => h.id !== id)
}

const filteredHabits = computed(() => {
  return selectedTag.value
    ? habits.value.filter((h) => h.tagId === selectedTag.value)
    : habits.value
})

onMounted(() => {
  fetchTags()
  fetchHabits()
})
</script>

<template>
  <div class="habit-tacker-page">
    <main class="habit-main-container">
      <!-- 태그 필터 -->
      <section class="habit-tag-section">
        <div class="habit-tag-list">
          <ul class="tag-list">
            <br /><br /><br /><br /><br /><br />
            <li
              v-for="tag in tags"
              :key="tag.id"
              :class="{ 'active-tag': selectedTag === tag.id }"
              @click="selectedTag = tag.id"
            >
              {{ tag.name }}
            </li>
          </ul>
          <br /><br /><br /><br /><br />
        </div>
      </section>

      <section class="habit-content-section">
        <h2 class="habit-title">Habit Tracker</h2>
        <!-- 날짜 표시 -->
        <div class="habit-date-row">
          <div
            v-for="(day, index) in weekDates"
            :key="index"
            class="habit-date"
            :class="{ today: isToday(day.date) }"
            @click="selectedDate = day.date"
          >
            {{ day.label }}<br />
            <span :class="{ active: selectedDate === day.date }">{{ day.date.slice(8) }}</span>
            <br /><br /><br />
          </div>
        </div>
        <!-- 습관 목록 -->
        <div class="habit-list">
          <div v-for="habit in filteredHabits" :key="habit.id" class="habit-item">
            <div class="habit-content">
              <span class="habit-tag">{{ getTagName(habit.tagId) }}</span>
              <input
                type="checkbox"
                v-model="habit.checked"
                class="habit-checkbox"
                @change="toggleHabit(habit)"
              />
              <span class="habit-text">{{ habit.text }}</span>
            </div>
            <button class="habit-delete" @click="deleteHabit(habit.id)">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>

        <!-- AddButton -->
        <AddButton @click="goToAddPage" />
      </section>
    </main>
  </div>
</template>

<style scoped>
.habit-tracker-page {
  display: flex;
  height: 100vh;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: var(--lightgray);
}

.habit-main-container {
  display: flex;
  flex: 1;
  width: 100%;
}

/* 왼쪽 태그 목록 영역 */
.habit-tag-section {
  width: 240px;
  background-color: var(--lightlightgray);
  padding: 32px 16px;
  border-right: 1px solid var(--gray);
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
}

.tag-title {
  font-size: 16px;
  color: var(--darkgray);
  margin-bottom: 12px;
}

.tag-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.tag-list li {
  padding: 6px 10px;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  color: var(--blacktext);
}

.tag-list li.active,
.tag-list li:hover {
  background-color: #fff;
  font-weight: 500;
}

/* 오른쪽 콘텐츠 영역 */
.habit-content-section {
  flex-grow: 1;
  width: calc(100vw - 60px - 240px);
  padding: 48px 56px;
  background-color: #fff;
  overflow-y: auto;
  min-height: 100vh;
}

.habit-tag {
  font-weight: 600;
  font-size: 14px;
  min-width: 60px;
  color: var(--darkgray);
  text-align: left;
  white-space: nowrap;
  flex-shrink: 0;
}

.habit-title {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 32px;
  color: var(--blacktext);
}

/* 날짜 */
.habit-date-row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}

.habit-date span {
  display: block;
  font-size: 16px;
  font-weight: 500;
  margin-top: 4px;
}

.habit-date.today {
  background-color: #e0e0e0;
  color: #000;
  font-weight: bold;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  line-height: 36px;
  margin: 0 auto;
}

.habit-date span.active {
  background-color: var(--gray);
  color: var(--blacktext);
  font-weight: bold;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-block;
  line-height: 32px;
}

/* 습관 항목 */
.habit-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.habit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid var(--gray);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.04);
}

.habit-content {
  display: flex;
  align-items: center;
  gap: 12px;
}

.habit-checkbox {
  transform: scale(1.2);
  accent-color: #6a94ff;
}

.habit-text {
  font-size: 15px;
  color: var(--blacktext);
}

.habit-delete {
  background: none;
  border: none;
  color: var(--darkgray);
  cursor: pointer;
  font-size: 16px;
  transition: color 0.2s;
}

.habit-delete:hover {
  color: #e53935;
}
</style>
