<template>
  <div>
    <h2>막대그래프 (막대별 다른 색상 + 상하 분리 + 내부 값)</h2>
    <div ref="chartRef" style="width: 600px; height: 400px"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref<HTMLDivElement | null>(null)

onMounted(() => {
  const categories = ['A', 'B', 'C', 'D', 'E']
  const values = [100, 80, 60, 40, 20]

  const lowerRatio = 0.2
  const upperRatio = 0.8

  // 막대별 색상 조합 (하단 / 상단)
  const lowerColors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA'] // 하단
  const upperColors = ['#DC2626', '#CA8A04', '#059669', '#2563EB', '#6D28D9'] // 상단

  const chart = echarts.init(chartRef.value!)

  chart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    xAxis: {
      type: 'category',
      data: categories,
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: {
        show: true,
        fontSize: 14,
        color: '#333',
        margin: 10,
      },
    },
    yAxis: {
      type: 'value',
      show: false,
    },
    series: [
      {
        name: '하단',
        type: 'bar',
        stack: 'total',
        data: values.map((v, i) => ({
          value: v * lowerRatio,
          itemStyle: { color: lowerColors[i] },
        })),
        barWidth: '50%',
        label: { show: false },
      },
      {
        name: '상단',
        type: 'bar',
        stack: 'total',
        data: values.map((v, i) => ({
          value: v * upperRatio,
          itemStyle: { color: upperColors[i] },
        })),
        barWidth: '50%',
        label: {
          show: true,
          position: 'inside',
          formatter: (_: any, idx: number) => values[idx],
          color: '#fff',
          fontSize: 14,
          fontWeight: 'bold',
        },
      },
    ],
  })
})
</script>
