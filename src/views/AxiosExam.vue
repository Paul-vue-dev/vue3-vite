<template>
  <div>
    <h1>Axios Example</h1>
    <button @click="getData">getData</button>
    <div v-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="item in data" :key="item.id">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import axios from '../axios/axios' // axios 인스턴스 가져오기

// 데이터 타입 정의
interface Item {
  id: number;
  title: string;
}

// 상태 변수 정의
// data를 ref로 선언하고 타입 지정
const data = ref<Item[]>([]);
const loading = ref(false)
const error = ref<string | null>(null)

// 데이터 가져오기 함수
const getData = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos') // API 호출
    data.value = response.data // 타입 추론에 의존
  } catch (err: any) {
    error.value = err.message || 'Failed to fetch data'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
h1 {
  color: #333;
}
button {
  margin-bottom: 10px;
}
</style>