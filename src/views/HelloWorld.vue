<script setup lang="ts">
  import { computed } from 'vue'

  defineProps<{ msg: string }>()
  const a = ref<number>(1)
  function handelClick() {
    a.value = a.value + 1
  }
  const b = computed(() => a.value + 1)
</script>

<template>
  <p @click="handelClick">{{ a }}</p>
  <p>{{ b }}</p>
  <h1>{{ msg }}</h1>
</template>

<style scoped></style>
