<!-- filepath: e:\vue3-vite\vue3-vite\src\layouts\Header.vue -->
<template>
  <header class="header">
    <div class="logo">My App</div>
    <nav>
      <ul class="nav-list">
        <li>{{ proxy.$ssoAccount.username }}</li>
        <li>{{ proxy.$ssoAccount.email }}</li>
        <li>{{ proxy.$ssoAccount.roles }}</li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useProxy } from '@/utils/useProxy'; // 유틸리티 함수 import

const proxy = useProxy();
</script>

<style scoped>
.header {
  flex-basis: 10%; /* Header 높이를 10%로 설정 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #4caf50;
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-list {
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  text-decoration: none;
  color: white;
  font-weight: bold;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #d4f1d4;
}
</style>