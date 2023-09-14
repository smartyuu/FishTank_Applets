<template>
	<LEchart class="my-chart-pie" ref="chart"></LEchart>
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
	import { onMounted, reactive, ref, onBeforeMount } from 'vue'
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
	const colorList : string[] = reactive([
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
			top: '10%',
			left: '7%',
			orient: 'vertical'
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
				name: 'Access From',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 8
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: [{ value: 12, name: "良好" },
				{ value: 1, name: "死亡" }
				]
			}
		]
	})
	onMounted(() => {
		chart.value.init(echarts, (chart : any) => {
			// console.log('调用echarts')
			chart.setOption(option.value)
		})
	})
</script>
<style lang="scss" scoped>
	.my-chart-pie {
		height: 100%;
		background-color: #fff;
		border-radius: 10%;
	}
</style>