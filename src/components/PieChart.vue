<template>
  <div>
    <h2>원 그래프</h2>
    <div ref="chart" style="width: 400px; height: 300px"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chart = ref(null)
const data = [
  { value: 10, name: 'A' },
  { value: 20, name: 'B' },
  { value: 36, name: 'C' },
  { value: 10, name: 'D' },
  { value: 15, name: 'E' },
]

onMounted(() => {
  const myChart = echarts.init(chart.value)
  const option = {
    series: [
      {
        name: '데이터',
        type: 'pie',
        // radius: ['50%', '65%'], // 내부/외부 반지름 조정 (차이 줄임)
        roseType: false,
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}',
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderRadius: 3, // 약간의 둥근 모서리 (선택 사항)
          borderColor: '#fff',
          borderWidth: 5,
        },
      },
    ],
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)',
    },
    legend: {
      show: false,
      orient: 'vertical',
      left: 'left',
      data: data.map((item) => item.name),
    },
  }
  myChart.setOption(option)
})
</script>
