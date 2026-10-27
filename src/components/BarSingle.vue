<template>
  <div>
    <h2>대분류별 막대 그래프</h2>
    <div
      v-for="(item, index) in data"
      :key="index"
      :style="{ marginBottom: '20px', display: 'flex', alignItems: 'center' }"
    >
      <div
        :style="{
          width: 'auto',
          height: 'auto',
          transform: 'rotate(-90deg)',
          whiteSpace: 'nowrap',
          backgroundColor: titleColors[index % titleColors.length],
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '5px',
          marginRight: '0px',
        }"
      >
        {{ item.title }}
      </div>
      <div ref="chartDivs" :style="{ flexGrow: 1, height: '300px' }"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, nextTick } from 'vue'

const chartDivs = ref<HTMLElement[]>([])

// 샘플 데이터 (대분류별로 3개의 데이터 세트)
const data = [
  {
    category: 'A',
    title: '그룹 A',
    data: [
      { name: '항목 1', value: 120 },
      { name: '항목 2', value: 200 },
      { name: '항목 3', value: 150 },
      { name: '항목 4', value: 80 },
      { name: '항목 5', value: 180 },
    ],
  },
  {
    category: 'B',
    title: '그룹 B',
    data: [
      { name: '항목 1', value: 90 },
      { name: '항목 2', value: 150 },
      { name: '항목 3', value: 110 },
      { name: '항목 4', value: 70 },
      { name: '항목 5', value: 130 },
    ],
  },
  {
    category: 'C',
    title: '그룹 C',
    data: [
      { name: '항목 1', value: 150 },
      { name: '항목 2', value: 180 },
      { name: '항목 3', value: 220 },
      { name: '항목 4', value: 100 },
      { name: '항목 5', value: 200 },
    ],
  },
]

const barColor = '#5470c6' // 통일된 막대 색상
const titleColors = ['#a9d18e', '#49a09d', '#5a8f7b'] // 제목 영역 배경색

onMounted(async () => {
  await nextTick() // DOM이 완전히 렌더링될 때까지 대기
  chartDivs.value.forEach((chartDiv, index) => {
    const barChart = echarts.init(chartDiv)
    const option = {
      grid: {
        left: '10%', // 좌측 영역 감소
        right: '5%',
        top: '10%',
        bottom: '35%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data[index].data.map((item) => item.name),
        axisLabel: {
          position: 'bottom',
          interval: 0,
          rotate: 0,
          overflow: 'truncate',
        },
        axisLine: { show: false },
        axisTick: { show: false },
      },
      yAxis: {
        show: false,
        type: 'value',
      },
      series: [
        {
          name: data[index].category,
          type: 'bar',
          data: data[index].data.map((item) => item.value),
          itemStyle: {
            color: barColor,
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{c}',
            color: '#fff',
          },
          barWidth: '30%',
        },
      ],
    }
    barChart.setOption(option)
  })
})
</script>
