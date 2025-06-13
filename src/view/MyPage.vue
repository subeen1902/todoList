<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '@/store/userStore'

const userStore = useUserStore()

const form = ref({
  id: '', // 실제 userId (json-server에서 사용하는 고유 ID)
  username: '',
  email: '',
  nickname: '',
  password: '',
})

onMounted(() => {
  const user = userStore.user
  form.value.id = user.id
  form.value.username = user.username
  form.value.email = user.email
  form.value.nickname = user.nickname
  form.value.password = user.password // 실제로는 비밀번호 보안 처리 필요
})

const updateProfile = async () => {
  try {
    await userStore.updateUser(form.value.id, {
      username: form.value.username,
      email: form.value.email,
      nickname: form.value.nickname,
      password: form.value.password,
    })
    alert('사용자 정보가 수정되었습니다.')
  } catch (e) {
    alert('정보 수정 중 오류가 발생했습니다.')
  }
}
</script>

<template>
  <div class="mypage-wrapper">
    <div class="mypage-box">
      <h2 class="mypage-title">마이페이지</h2>

      <form @submit.prevent="updateProfile">
        <div class="mypage-form-group">
          <label for="username">아이디</label>
          <input type="text" id="username" v-model="form.username" />
        </div>

        <div class="mypage-form-group">
          <label for="password">비밀번호</label>
          <input type="password" id="password" v-model="form.password" />
        </div>

        <div class="mypage-form-group">
          <label for="email">이메일</label>
          <input type="email" id="email" v-model="form.email" />
        </div>

        <div class="mypage-form-group">
          <label for="nickname">닉네임</label>
          <input type="text" id="nickname" v-model="form.nickname" />
        </div>

        <button type="submit" class="mypage-button">정보 수정</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.mypage-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-family: 'Noto Sans KR', sans-serif;
}

.mypage-box {
  width: 100%;
  max-width: 500px;
  padding: 40px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.mypage-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 30px;
  color: var(--blacktext);
  text-align: center;
}

.mypage-form-group {
  margin-bottom: 20px;
}

.mypage-form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--lightgraytext);
}

.mypage-form-group input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--gray);
  border-radius: 8px;
  font-size: 16px;
  background-color: var(--lightlightgray);
}

.mypage-button {
  width: 100%;
  padding: 14px;
  background-color: #ddd;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mypage-button:hover {
  background-color: #bbb;
}
</style>
