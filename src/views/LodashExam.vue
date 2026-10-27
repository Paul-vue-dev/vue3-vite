<template>
  <div>
    <h1>Lodash Example</h1>
    <button @click="shuffleItems">Shuffle Items</button>
    <button @click="sortItems">Sort Items</button>
    <button @click="chunkItems">Chunk Items</button>

    <h2>Items:</h2>
    <ul>
      <li v-for="item in items" :key="item.id">{{ item.name }}</li>
    </ul>

    <h2>Chunked Items:</h2>
    <div v-for="(chunk, index) in chunkedItems" :key="index">
      <h3>Chunk {{ index + 1 }}</h3>
      <ul>
        <li v-for="item in chunk" :key="item.id">{{ item.name }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import _ from 'lodash'

// 데이터 정의
const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
  { id: 5, name: 'Item 5' },
])

const chunkedItems = ref<Array<Array<{ id: number; name: string }>>>([])

// 아이템 섞기
const shuffleItems = () => {
  items.value = _.shuffle(items.value)
}

// 아이템 정렬
const sortItems = () => {
  items.value = _.sortBy(items.value, 'name')
}

// 아이템을 청크로 나누기
const chunkItems = () => {
  chunkedItems.value = _.chunk(items.value, 2) // 2개씩 나누기
}
</script>

<style scoped>
h1 {
  color: #333;
}
button {
  margin: 5px;
}
</style>
