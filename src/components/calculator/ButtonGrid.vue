<template>
  <div class="buttons">
    <button
      v-for="(btn, i) in buttons"
      :key="i"
      :data-value="btn.value"
      :class="btn.class"
      @click="emit('input', btn.value)"
    >
      <i v-if="btn.icon" :class="btn.icon"></i>
      <span v-else>{{ btn.label }}</span>
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(['input'])

const buttons = [
  // 첫번째 줄
  { label: '', class: 'button-icon', value: 'AC', icon: 'fa-solid fa-broom' },
  { label: '', class: 'button-icon', value: '', icon: 'fa-regular fa-face-smile' },
  { label: '', class: 'button-icon', value: '', icon: 'fa-regular fa-heart' },
  { label: '', class: 'button-icon', value: 'delete', icon: 'fa-solid fa-delete-left' },
  // 두번째 줄
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '', class: 'icon', value: '*', icon: 'fa-solid fa-xmark' },
  // 세번째 줄
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '', class: 'icon', value: '/', icon: 'fa-solid fa-divide' },
  // 네번째 줄
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '', class: 'icon', value: '+', icon: 'fa-solid fa-plus' },
  // 다섯번째 줄
  { label: '.', value: '.' },
  { label: '0', value: '0' },
  { label: '', class: 'icon', value: '=', icon: 'fa-solid fa-equals' },
  { label: '', class: 'icon', value: '-', icon: 'fa-solid fa-minus' },
]
</script>
