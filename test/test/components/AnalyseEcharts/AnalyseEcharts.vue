<template>
	<view class="chart-background">
		<LEchart class="my-chart" ref="chart"></LEchart>
	</view>
</template>

<script lang="ts" setup>
	import * as echarts from 'echarts/core'
	import { LineChart, BarChart } from 'echarts/charts'
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
	import { onMounted, ref } from 'vue'
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
	])

	const chart = ref(null)

	const props = defineProps({
		option: {
			type: Object,
			default: {
				text: '查看鱼缸温度趋势',
				xAxisData: ['0时', ' 6时', ' 12时', '18时', '24时'],
				yAxisFormatter: "{value}°C",
				data: [25, 30, 35, 31, 26]
			}
		}
	})
	// const introductionOption = toRef(props, 'option')
	const option = ref({
		legend: {
			top: '90%',
		},
		toolbox: {
			show: true,
			trigger: "axis",
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				dataZoom: {
					yAxisIndex: "none",
				},
				magicType: { type: ["line", "bar"] },
			}
		},
		title: {
			text: props.option.text,
			top: '2%',
			left: '2%'
		},
		xAxis: {
			type: "category",
			boundaryGap: false,
			data: props.option.xAxisData,
		},
		yAxis: {
			type: "value",
			axisLabel: {
				formatter: props.option.yAxisFormatter,
			},
		},
		series: [
			{
				name: 'Access From',
				type: 'line',
				roseType: 'area',
				showBackground: true,
				backgroundStyle: {
					color: '#fff'
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
				data: props.option.data
			}]
	})

	onMounted(() => {
		chart.value.init(echarts, (chart : any) => {
			chart.setOption(option.value)
		})
	})
</script>
<style lang="scss" scoped>
	.chart-background {
		background-color: #fff;
		border-radius: 10%;
		box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.3);
		border: 1px solid #0F0F77;
	}

	.my-chart {
		height: 100%;
	}
</style>