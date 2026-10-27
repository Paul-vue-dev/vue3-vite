<template>
  <div class="table-container">
    <h2>Item List</h2>
    <VueGoodTable
      :columns="columns"
      :rows="rows"
      class="custom-table"
      :pagination-options="paginationOptions"
      @cell-click="handleCellClick"
    />

    <!-- DetailPopup -->
    <DetailPopup v-if="isPopupVisible" :item="selectedItem" @close="closePopup" />

    <!-- RegistrationPopup -->
    <RegistrationPopup @submit="handleRegistrationSubmit" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import DetailPopup from './DetailPopup.vue';
import RegistrationPopup from './RegistrationPopup.vue';
import api from '@/axios/api';

// 테이블 컬럼 정의 (초기값은 빈 배열)
const columns = ref([]);

// 테이블 데이터 정의
const rows = ref([]);

// 페이징 옵션
const paginationOptions = ref({
  enabled: true, // 페이징 활성화
  perPage: 10, // 페이지당 항목 수
  perPageDropdown: [5, 10, 20, 50], // 페이지당 항목 수 선택 옵션
  dropdownAllowAll: false, // "All" 옵션 비활성화
});

// 팝업 상태 관리
const isPopupVisible = ref(false);
const selectedItem = ref(null);

onMounted(async () => {
  // API 호출
  const data = await api.getApi('todos', {});

  // rows에 API 데이터 저장
  rows.value = data;

  // columns를 API 데이터의 key 값으로 동적으로 생성
  if (data.length > 0) {
    columns.value = Object.keys(data[0]).map((key) => ({
      label: key.charAt(0).toUpperCase() + key.slice(1), // 첫 글자를 대문자로 변환
      field: key,
      sortable: false,
    }));
  }
});

// 셀 클릭 핸들러
const handleCellClick = (row) => {
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
.table-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.custom-table .vgt-table {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.custom-table .vgt-table th {
  background-color: #007ad9;
  color: white;
  text-align: center;
}

.custom-table .vgt-table td {
  text-align: center;
}

.custom-table .vgt-table td.clickable {
  cursor: pointer;
  color: #007ad9;
  text-decoration: underline;
}

.custom-table .vgt-table td.clickable:hover {
  color: #0056a3;
}
</style>