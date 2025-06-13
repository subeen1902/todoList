<script setup>
defineProps(['expression'])
</script>

<template>
  <div class="equation">{{ expression || '0' }}</div>
</template>
