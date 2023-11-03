<template>
	<view class="rose-background">
		<LEchart class="my-chart-rose" ref="chart"></LEchart>
	</view>
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
	import { ApiGetNightingale } from '../../api/echarts'

	const dataList = ref([])
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
	onMounted(() => {

		// const data = await ApiGetNightingale().then((res) => return res );
		(async function () {
			dataList.value = await ApiGetNightingale()
			// console.log(dataList.value);
			const option = ref({
				legend: {
					top: '85%',
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
				title: {
					text: '鱼类统计',
					top: '5%',
					left: '2%'
				},
				series: [
					{
						name: 'Access From',
						type: 'pie',
						radius: ['20%', '80%'],
						center: ['50%', '50%'],
						roseType: 'area',
						avoidLabelOverlap: false,
						showBackground: true,
						backgroundStyle: {
							color: '#fff'
						},
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
						data: dataList.value
					}]
			})
			chart.value.init(echarts, (chart : any) => {
				chart.setOption(option.value)
			})
		})()
	})
</script>
<style lang="scss" scoped>
	.rose-background {
		background-color: #fff;
		border-radius: 10%;
		margin-top: 120rpx;
		box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.3);
	}

	.my-chart-rose {
		height: 100%;
	}
</style>