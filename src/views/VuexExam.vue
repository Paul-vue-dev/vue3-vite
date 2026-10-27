<template>
  <div>
    <h1>Vuex Example</h1>
    <button @click="fetchItems">Fetch Items</button>
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">{{ error }}</div>
    <ul v-else>
      <li v-for="item in items" :key="item">{{ item.title }}</li>
    </ul>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useProxy } from '@/utils/useProxy'; // 유틸리티 함수 import
import api from '@/axios/api'; // axios 인스턴스 가져오기
import store from '@/store' // Vuex 스토어 가져오기

// 전역 접근
// const proxy = useProxy();

// 스토어 접근
// const log = proxy?.$log

// Vuex 상태를 계산 속성으로 매핑
// const items = computed(() => store.state.items);
// const loading = computed(() => store.state.loading);
// const error = computed(() => store.state.error);
const items = store.state.items
const loading = store.state.loading
const error = store.state.error

// Vuex 액션 호출
const fetchItems = async () => {
  const param = ref({
    test: 'test'
  })

  const res = await api.getApi('/todos',param.value)
  store.state.items = res
};

onMounted(() => {
  fetchItems()
});
</script>

<style scoped>
h1 {
  color: #333;
}
button {
  margin-bottom: 10px;
}
</style>
