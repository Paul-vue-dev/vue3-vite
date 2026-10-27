<template>
  <div>
    <h1>SSO 계정 정보</h1>
    <button @click="setAccount">SSO 계정 설정</button>
    <!-- <button @click="getAccount">SSO 계정 가져오기</button> -->
    <pre>proxy.$ssoAccount: {{ proxy.$ssoAccount }}</pre>
    <pre>store.state.ssoAccount: {{ store.state.ssoAccount }}</pre>
  </div>
</template>

<script setup>
import { useProxy } from '@/utils/useProxy'; // 유틸리티 함수 import

const proxy = useProxy();
const store = proxy.$store
const log = proxy.$log

// SSO 계정 설정
const setAccount = () => {
  proxy.$setSsoAccount({
    username: 'johndoe',
    email: 'johndoe@example.com',
    roles: ['admin', 'user'],
  });

  store.state.ssoAccount = proxy.$getSsoAccount()
};
</script>

<style scoped>
h1 {
  color: #333;
}
button {
  margin-right: 10px;
}
</style>