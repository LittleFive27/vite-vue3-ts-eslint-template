<script setup lang="ts">
  import { computed } from 'vue'

  const a = ref<number>(1)
  function handelClick() {
    a.value = a.value + 1
  }
  const b = computed(() => a.value + 1)
</script>

<template>
  <h2>Vite + Vue + TS</h2>
  <hr />
  <p @click="handelClick">{{ a }}</p>
  <p>{{ b }}</p>
</template>

<style scoped></style>
