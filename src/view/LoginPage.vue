<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/userStore'
import axios from 'axios'

const router = useRouter()
const userStore = useUserStore()

const userId = ref('')
const password = ref('')

function goToJoin() {
  router.push('/join')
}

async function login() {
  if (!userId.value || !password.value) {
    alert('아이디와 비밀번호를 입력해주세요.')
    return
  }

  try {
    const res = await axios.get(
      `http://localhost:3000/users?userId=${userId.value}&password=${password.value}`,
    )
    if (res.data.length > 0) {
      userStore.isLoggedIn = true
      userStore.user = res.data[0]
      alert('로그인 성공!')
      router.push('/home')
    } else {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.')
    }
  } catch (err) {
    console.error(err)
    alert('로그인 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-form">
      <h2>로그인</h2>
      <div class="input-group">
        <label for="id">아이디</label>
        <input id="id" v-model="userId" type="text" placeholder="ID를 입력하세요." />
      </div>
      <div class="input-group">
        <label for="password">비밀번호</label>
        <input id="password" v-model="password" type="password" placeholder="PW를 입력하세요." />
      </div>
      <div class="links">
        <span class="forgot">비밀번호를 잊어버리셨나요?</span>
        <span class="signup" @click="goToJoin">계정이 없으신가요?</span>
      </div>
      <button class="login-button" @click="login">로그인</button>
    </div>
  </div>
</template>

<style scoped>
.login-form {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9f9f9;
}

.login-form h2 {
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 500;
}

.input-group {
  margin-bottom: 20px;
  width: 300px;
}

.input-group label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #333;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #f3f3f3;
}

.links {
  width: 300px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 13px;
  color: #777;
}

.signup {
  color: #5c8bff;
  cursor: pointer;
}

.login-button {
  width: 300px;
  padding: 12px;
  border: none;
  border-radius: 8px;
  background-color: #cfcfcf;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
}
</style>
