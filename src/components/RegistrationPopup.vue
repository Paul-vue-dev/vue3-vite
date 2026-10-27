<!-- filepath: src/components/RegistrationPopup.vue -->
<template>
  <div>
    <button @click="showRegistrationPopup">등록</button>
    <div v-if="isPopupVisible" class="popup-container">
      <div class="popup-content">
        <h2>등록</h2>
        <input
          v-model="title"
          placeholder="제목 입력"
          style="width: 100%; margin-bottom: 10px;"
        />
        <Ckeditor v-model="content" />
        <div class="popup-actions">
          <button @click="submitRegistration">등록</button>
          <button @click="closePopup">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Ckeditor from './Ckeditor.vue';

const isPopupVisible = ref(false);
const title = ref('');
const content = ref('');

const showRegistrationPopup = () => {
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
};

const submitRegistration = () => {
  console.log('제목:', title.value);
  console.log('내용:', content.value);
  closePopup();
};
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.popup-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}
</style>