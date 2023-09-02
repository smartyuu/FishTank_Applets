<template>
	<LEchart class="my-chart-rose" ref="chart"></LEchart>
</template>

<script lang="ts" setup>
	import * as echarts from 'echarts/core'
	import { LineChart, BarChart, PieChart } from 'echarts/charts'
	import {
	  TitleComponent,
	  TooltipComponent,
	  GridComponent,
	  DatasetComponent,
	  TransformComponent,
	  LegendComponent,
	  ToolboxComponent
	} from 'echarts/components'
	// 标签自动布局，全局过渡动画等特性
	import { LabelLayout, UniversalTransition } from 'echarts/features'
	// 引入 Canvas 渲染器，注意引入 CanvasRenderer 是必须的一步
	import { CanvasRenderer } from 'echarts/renderers'
	import { onMounted, reactive, ref } from 'vue'
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue'
	
	echarts.use([
	  LegendComponent,
	  TitleComponent,
	  TooltipComponent,
	  GridComponent,
	  DatasetComponent,
	  TransformComponent,
	  LineChart,
	  BarChart,
	  LabelLayout,
	  UniversalTransition,
	  CanvasRenderer,
	  ToolboxComponent,
	  PieChart
	])
	
	const props = defineProps({
	  titleText: {
	    type: String
	  },
	  data: {
	    type: Array
	  }
	})
	const chart = ref(null)
	const colorList = reactive([
	  '#4A79FF',
	  '#14D58A',
	  '#FFD264',
	  '#FF7683',
	  '#9F99FF',
	  '#56B5FF',
	  '#80EF98'
	])
const option = ref({
	legend: {
	    top: 'bottom'
	  },
	  toolbox: {
	    show: true,
	    feature: {
	      mark: { show: true },
	      dataView: { show: true, readOnly: false },
	      restore: { show: true },
	      saveAsImage: { show: true }
	    }
	  },
	  series: [
	    {
	      name: 'Nightingale Chart',
	      type: 'pie',
	      radius: [50, 250],
	      center: ['50%', '50%'],
	      roseType: 'area',
	      itemStyle: {
	        borderRadius: 8
	      },
	      data: [
	        { value: 40, name: 'rose 1' },
	        { value: 38, name: 'rose 2' },
	        { value: 32, name: 'rose 3' },
	        { value: 30, name: 'rose 4' },
	        { value: 28, name: 'rose 5' },
	        { value: 26, name: 'rose 6' },
	        { value: 22, name: 'rose 7' },
	        { value: 18, name: 'rose 8' }
	      ]
	    }
	  ]
})
onMounted(()=>{			
	chart.value.init(echarts, (chart) => {
		chart.setOption(option.value)
	})
})

</script>
<style lang="scss" scoped>
	.my-chart-rose {
	    width: 80%;
	    height: 100%;
		background-color: #ffaaff;
	}
	 
</style>