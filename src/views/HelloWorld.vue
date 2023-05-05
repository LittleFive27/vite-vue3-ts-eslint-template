<script setup lang="ts">
  import { showNotify, showToast } from 'vant'
  import 'vant/es/toast/style'
  import 'vant/es/notify/style'
  import { getActivityStatus } from '@/api/activity-status'
  import IconMsg from '@/assets/icons/xiaoxi-zhihui.svg?component'
  import useRef from '@/hooks/ref'

  const [count, setCount] = useRef<number>(1)

  const a = ref<number>(1)
  function handelClick() {
    a.value = a.value + 1
  }
  const b = computed(() => a.value + 1)

  const show = ref(false)
  const showPopup = () => {
    show.value = true
  }

  const handleApi = async () => {
    const res = await getActivityStatus()
    console.log(res)
  }
</script>

<template>
  <h2>Vite + Vue + TS</h2>
  <hr />
  <p @click="handelClick">{{ a }}</p>
  <p>{{ b }}</p>
  <div class="postcss">测试自适应</div>
  <van-button type="success" @click="showNotify({ type: 'primary', message: '通知内容' })">notify</van-button>
  <van-button type="primary" @click="showToast('提示内容')">toast</van-button>
  <van-cell title="展示弹出层" @click="showPopup" />
  <van-popup v-model:show="show" :style="{ padding: '64px' }">内容</van-popup>
  <van-cell-group>
    <van-cell title="单元格" value="内容" />
  </van-cell-group>
  <button @click="handleApi">发送请求</button>
  <IconMsg class="msg" />
  <p>{{ count }}</p>
  <button @click="setCount(count + 1)">setCount</button>
</template>

<style scoped>
  .postcss {
    width: 400px;
    height: 400px;
    background-color: skyblue;
  }

  .msg {
    width: 50px;
    height: 50px;
  }
</style>
