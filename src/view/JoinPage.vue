<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const userId = ref('')
const password = ref('')
const passwordConfirm = ref('')
const email = ref('')

const register = async () => {
  if (!userId.value || !password.value || !passwordConfirm.value || !email.value) {
    alert('모든 항목을 입력해주세요.')
    return
  }

  if (password.value !== passwordConfirm.value) {
    alert('비밀번호가 일치하지 않습니다.')
    return
  }

  // 아이디 중복 확인
  const existing = await axios.get(`http://localhost:3000/users?userId=${userId.value}`)
  if (existing.data.length > 0) {
    alert('이미 존재하는 아이디입니다.')
    return
  }

  // 사용자 저장
  await axios.post('http://localhost:3000/users', {
    userId: userId.value,
    password: password.value,
    email: email.value,
  })

  alert('회원가입이 완료되었습니다!')
  router.push('/login')
}
</script>

<template>
  <div class="join-page">
    <div class="join-form">
      <h2>회원가입</h2>

      <div class="input-group">
        <label for="id">아이디</label>
        <input id="id" v-model="userId" type="text" placeholder="ID를 입력하세요." />
      </div>

      <div class="input-group">
        <label for="pw">비밀번호</label>
        <input id="pw" v-model="password" type="password" placeholder="PW를 입력하세요." />
      </div>

      <div class="input-group">
        <label for="pwConfirm">비밀번호 확인</label>
        <input
          id="pwConfirm"
          v-model="passwordConfirm"
          type="password"
          placeholder="비밀번호를 한 번 더 입력하세요."
        />
      </div>

      <div class="input-group">
        <label for="email">이메일</label>
        <input id="email" v-model="email" type="email" placeholder="이메일을 입력하세요." />
      </div>

      <button class="join-button" @click="register">저장</button>
    </div>
  </div>
</template>

<style scoped>
.join-form {
  flex: 1;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f9f9f9;
}

.join-form h2 {
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

.join-button {
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
