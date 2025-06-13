<template>
  <div class="add-page">
    <div class="form-wrapper">
      <div class="toggle-buttons">
        <button :class="{ active: type === 'habit' }" @click="type = 'habit'">Habit-Tracker</button>
        <button :class="{ active: type === 'todo' }" @click="type = 'todo'">To-do</button>
      </div>

      <form @submit.prevent="submitForm" class="form-content">
        <label>
          {{ type === 'habit' ? 'Habit Tracker' : 'Tasks' }}
          <input type="text" placeholder="할 일을 입력하세요" v-model="text" />
        </label>

        <label>
          Lists
          <input type="text" placeholder="태그 또는 리스트" v-model="tag" />
        </label>

        <label>
          Date
          <input type="date" v-model="date" />
        </label>

        <label>
          Memo
          <textarea placeholder="메모를 입력하세요" v-model="memo" />
        </label>

        <button type="submit">저장</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const type = ref('habit')
const text = ref('')
const tag = ref('')
const date = ref('')
const memo = ref('')

const submitForm = () => {
  // 저장 로직 작성
  console.log({
    type: type.value,
    text: text.value,
    tag: tag.value,
    date: date.value,
    memo: memo.value,
  })
}
</script>

<style scoped>
.add-page {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-height: 100vh;
  padding: 60px 80px;
  background-color: #f9f9f9;
  font-family: 'Noto Sans KR', sans-serif;
}

.form-wrapper {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
}

.toggle-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 36px;
}

.toggle-buttons button {
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

.toggle-buttons button.active,
.toggle-buttons button.hover {
  background-color: #bbb;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

label {
  font-size: 14px;
  color: #555;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
textarea {
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background: #fff;
  font-size: 14px;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

button[type='submit'] {
  margin-top: 20px;
  align-self: center;
  padding: 10px 24px;
  border: none;
  border-radius: 12px;
  background-color: #ccc;
  font-weight: bold;
  cursor: pointer;
}
</style>
