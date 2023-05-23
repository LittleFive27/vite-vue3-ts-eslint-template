<template>
  <h2>GASP</h2>
  <br />
  <button @click="handleStart1">开始</button>
  <button @click="handlePause">暂停</button>
  <button @click="handleRevert1">回到刚才动画开始</button>
  <button @click="handleReverse">回退</button>
  <div class="box1"></div>
  <button @click="handleStart2">开始</button>
  <button @click="handleRevert2">回到刚才动画开始</button>
  <div class="box2"></div>
  <div class="box3"></div>
  <div class="box4"></div>
</template>

<script setup lang="ts">
  import { gsap } from 'gsap'
  import { showToast } from 'vant'
  import 'vant/es/toast/style'

  let a1: any = null
  let a2: any = null

  function handleStart1() {
    a1 = gsap.to('.box1', {
      duration: 2,
      x: 200,
      y: 40,
      repeat: 1,
      yoyo: true,
      onStart: () => {
        showToast({ message: '动画开始' })
      },
      onComplete: () => {
        showToast({ message: '动画结束' })
      }
    })
    a1.play()
  }

  function handlePause() {
    a1.pause()
  }

  function handleRevert1() {
    a1.revert()
  }

  function handleReverse() {
    a1.reverse()
  }

  function handleStart2() {
    a2 = gsap.timeline()
    a2.to('.box2', { duration: 2, x: 200, ease: 'bounce' })
      .to('.box3', { duration: 2, x: 200, rotation: 200, scale: 0.8, opacity: 0.5 }, 0.5)
      .to('.box4', { duration: 2, x: 200, rotation: 0, scale: 1, opacity: 1, ease: 'strong.inOut' }, '-=1')
  }

  function handleRevert2() {
    a2.revert()
  }

  onMounted(() => {})
</script>

<style scoped lang="scss">
  [class^='box'] {
    width: 100px;
    height: 100px;
    margin-bottom: 50px;
  }

  .box1 {
    background-color: skyblue;
  }

  .box2,
  .box3,
  .box4 {
    background-color: #075151;
  }

  button {
    margin: 0 10px 10px 0;
    padding: 0 10px;
    height: 40px;
  }
</style>
