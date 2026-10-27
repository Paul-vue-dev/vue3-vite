<!-- filepath: e:\vue3-vite\vue3-vite\src\views\DataGridType3View.vue -->
<template>
  <div>
    <h1>Data Grid Example</h1>
    <DataGrid :items="items" />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';
import DataGrid from '../components/DataGridType3.vue';
import api from '@/axios/api'; // API 호출을 위한 axios 인스턴스

// 데이터 상태 관리
const items = ref([]);

// API 호출
const fetchData = async () => {
  try {
    const response = await api.getApi('/todos'); // API 호출
    items.value = response; // 데이터를 items에 저장
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
};

// 컴포넌트가 마운트될 때 데이터 가져오기
onMounted(() => {
  fetchData();
});
// onBeforeMount(() => {
//   fetchData();
// });
</script>