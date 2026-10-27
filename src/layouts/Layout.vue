<!-- filepath: e:\vue3-vite\vue3-vite\src\layouts\Layout.vue -->
<template>
  <div class="app-container">
    <!-- Header -->
    <Header />

    <!-- Layout -->
    <div class="layout">
      <aside class="sidebar">
        <ul class="sidebar-list">
          <li><RouterLink :to="{ name: 'DataGridType3View' }" class="sidebar-link">DataGridType3</RouterLink></li>
          <li><RouterLink :to="{ name: 'Editor' }" class="sidebar-link">Editor</RouterLink></li>
          <li><RouterLink :to="{ name: 'LoadingBar' }" class="sidebar-link">LoadingBar</RouterLink></li>
          <li><RouterLink :to="{ name: 'AlertModal' }" class="sidebar-link">AlertModal</RouterLink></li>
          <li><RouterLink :to="{ name: 'Chart' }" class="sidebar-link">Chart</RouterLink></li>
          <li><RouterLink :to="{ name: 'AxiosExam' }" class="sidebar-link">AxiosExam</RouterLink></li>
          <li><RouterLink :to="{ name: 'VuexExam' }" class="sidebar-link">VuexExam</RouterLink></li>
          <li><RouterLink :to="{ name: 'LodashExam' }" class="sidebar-link">LodashExam</RouterLink></li>
          <li><RouterLink :to="{ name: 'VeeValidateExam' }" class="sidebar-link">VeeValidateExam</RouterLink></li>
          <li><RouterLink :to="{ name: 'SsoExam' }" class="sidebar-link">SsoExam</RouterLink></li>
        </ul>
      </aside>
      <main class="content">
        <RouterView />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue';
import { RouterView, RouterLink } from 'vue-router';
</script>

<style scoped>
/* Container */
.app-container {
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  height: 100vh; /* 화면 전체 높이 */
  display: flex;
  flex-direction: column;
}

/* Layout */
.layout {
  flex-basis: 90%; /* Layout 높이를 90%로 설정 */
  display: flex;
  height: 100%; /* Layout 내부를 꽉 채움 */
}

.sidebar {
  flex-basis: 15%; /* Sidebar 너비를 15%로 설정 */
  background-color: #f0f0f0;
  padding: 1rem;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
}

.sidebar-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar-link {
  display: block;
  text-decoration: none;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.sidebar-link:hover {
  background-color: #4caf50;
  color: white;
}

.content {
  flex-basis: 85%; /* Content 너비를 85%로 설정 */
  padding: 1rem;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #fff; /* 기본 배경색 */
}
</style>