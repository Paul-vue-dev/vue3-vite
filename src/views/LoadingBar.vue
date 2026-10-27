<template>
  <div>
    <div class="loading-bar basic" v-if="isLoading"></div>
  </div>
  
  <div>
    <div class="loading-bar dots" v-if="isLoading">
      <span></span><span></span><span></span>
    </div>
  </div>

  <div>
    <div class="loading-bar spinner" v-if="isLoading"></div>
  </div>

  <div>
    <div class="loading-bar wave" v-if="isLoading">
      <span></span><span></span><span></span><span></span><span></span>
    </div>
  </div>

  <div>
    <div class="loading-bar fill" v-if="isLoading"></div>
  </div>

  <LoadingBar v-model:active="isLoading" :on-cancel="onCancel"/>

  <button @click.prevent="load">load</button>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const isLoading = ref(false);
  const load = () => {
      isLoading.value = true;
      // simulate AJAX
      console.log('User start the loader.');
      setTimeout(() => {
          isLoading.value = false
      }, 2000);
  };

  const onCancel = () => {
      console.log('User cancelled the loader.');
  };
</script>

<style scoped>
.loading-bar.basic {
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, #4caf50, #81c784);
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.loading-bar.dots {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.loading-bar.dots span {
  width: 8px;
  height: 8px;
  background: #4caf50;
  border-radius: 50%;
  animation: bounce 0.6s infinite alternate;
}

.loading-bar.dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-bar.dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}

.loading-bar.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #ccc;
  border-top-color: #4caf50;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-bar.wave {
  display: flex;
  justify-content: center;
  gap: 5px;
}

.loading-bar.wave span {
  width: 6px;
  height: 20px;
  background: #4caf50;
  animation: wave 1s infinite;
}

.loading-bar.wave span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-bar.wave span:nth-child(3) {
  animation-delay: 0.4s;
}

.loading-bar.wave span:nth-child(4) {
  animation-delay: 0.6s;
}

.loading-bar.wave span:nth-child(5) {
  animation-delay: 0.8s;
}

@keyframes wave {
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.5);
  }
}

.loading-bar.fill {
  width: 100%;
  height: 4px;
  background: #ccc;
  position: relative;
  overflow: hidden;
}

.loading-bar.fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: #4caf50;
  animation: fill 2s infinite;
}

@keyframes fill {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
