import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useToastStore = defineStore('toast', () => {
  const message = ref('')
  const type = ref('') // 'success', 'error', 'info' 등
  const visible = ref(false)

  let timeoutId = null

  function showToast(msg, msgType = 'info', duration = 3000) {
    message.value = msg
    type.value = msgType
    visible.value = true

    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      visible.value = false
    }, duration)
  }

  function hideToast() {
    visible.value = false
    clearTimeout(timeoutId)
  }

  return {
    message,
    type,
    visible,
    showToast,
    hideToast,
  }
})
