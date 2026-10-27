<!-- filepath: e:\vue3-vite\vue3-vite\src\components\DataGridType3.vue -->
<template>
  <div class="table-container">
    <h2>Item List</h2>
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in paginatedRows" :key="row.id" @click="handleRowClick(row)">
          <td v-for="column in columns" :key="column.field">
            {{ row[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 페이징 영역 -->
    <div class="custom-pagination">
      <button class="pagination-btn" @click="prevPage" :disabled="currentPage === 1">
        &laquo; Previous
      </button>
      <button class="pagination-btn" @click="goToFirstPage" :disabled="currentPage === 1">
        &laquo; First
      </button>
      <span v-for="page in visiblePages" :key="page">
        <button
          class="pagination-btn"
          :class="{ active: page === currentPage }"
          @click="goToPage(page)"
        >
          {{ page }}
        </button>
      </span>
      <button class="pagination-btn" @click="goToLastPage" :disabled="currentPage === totalPages">
        Last &raquo;
      </button>
      <button class="pagination-btn" @click="nextPage" :disabled="currentPage === totalPages">
        Next &raquo;
      </button>
    </div>

    <!-- DetailPopup -->
    <DetailPopup v-if="isPopupVisible" :item="selectedItem" @close="closePopup" />

    <!-- RegistrationPopup -->
    <RegistrationPopup @submit="handleRegistrationSubmit" />
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeMount } from 'vue';
import DetailPopup from './DetailPopup.vue';
import RegistrationPopup from './RegistrationPopup.vue';

// 부모 컴포넌트로부터 데이터를 받는 props 정의
const props = defineProps({
  items: {
    type: Object,
  },
});

// 테이블 컬럼 정의 (초기값은 빈 배열)
const columns = ref([]);

// 테이블 데이터 정의
const rows = ref([]);

// 페이징 상태
const currentPage = ref(1);
const itemsPerPage = ref(10);
const maxVisiblePages = 10; // 한 번에 표시할 페이지 버튼 수

// 팝업 상태 관리
const isPopupVisible = ref(false);
const selectedItem = ref(null);

// 계산된 속성: 총 페이지 수
const totalPages = computed(() => Math.ceil(rows.value.length / itemsPerPage.value));

// 계산된 속성: 현재 페이지에 표시할 데이터
const paginatedRows = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return rows.value.slice(start, end);
});

// 계산된 속성: 표시할 페이지 번호
const visiblePages = computed(() => {
  const startPage = Math.max(1, currentPage.value - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages.value, startPage + maxVisiblePages - 1);
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

// props로 전달된 items를 rows에 저장
watch(props, (newprops) => {
    rows.value = newprops.items;

    // columns를 items의 key 값으로 동적으로 생성
    if (newprops.items.length > 0) {
      columns.value = Object.keys(newprops.items[0]).map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1), // 첫 글자를 대문자로 변환
        field: key,
      }));
    }
  },
  // { immediate: true }
);

// 이전 페이지로 이동
const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// 다음 페이지로 이동
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// 특정 페이지로 이동
const goToPage = (page) => {
  currentPage.value = page;
};

// 첫 페이지로 이동
const goToFirstPage = () => {
  currentPage.value = 1;
};

// 마지막 페이지로 이동
const goToLastPage = () => {
  currentPage.value = totalPages.value;
};

// 행 클릭 핸들러
const handleRowClick = (row) => {
  selectedItem.value = row;
  isPopupVisible.value = true;
};

// 팝업 닫기 핸들러
const closePopup = () => {
  isPopupVisible.value = false;
};

function handleRegistrationSubmit(data) {
  // 등록 처리 로직
  console.log('Registration data:', data);
  // 팝업 닫기
  closePopup();
}
</script>

<style scoped>
/* 스타일은 기존과 동일 */
</style>