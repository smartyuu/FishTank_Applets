<template>
	<view class="pie-background">
		<LEchart class="my-chart-pie" ref="chart"></LEchart>
	</view>
	<view class="lineData">
		<text>当前数量/最大值</text>
		<text style="float: right;">{{maxCount}}条/100%</text>
		<u-line-progress :percentage="100" activeColor="#409eff" height="16"></u-line-progress>
		<view v-for="(stateCountList,index) in stateCountList" key="index">
			<text>{{stateCountList.name}}/当前数量</text>
			<text
				style="float: right;">{{stateCountList.value}}条/{{(stateCountList.value/maxCount).toFixed(2) *100}}%</text>
			<u-line-progress :percentage="(stateCountList.value/maxCount).toFixed(2) *100"
				:activeColor="stateCountList.color" height="16"></u-line-progress>
		</view>
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
	import { onMounted, reactive, ref, onBeforeMount } from 'vue'
	import LEchart from '@/uni_modules/lime-echart/components/l-echart/l-echart.vue'
	import { ApiGetPie } from '../../api/echarts'

	const stateCountList = ref([])
	const maxCount = ref(null)
	const lineColor = ref(['#5470c6', '#91cc75', '#fac858'])

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

	onMounted(() => {
		(async function () {
			const resData = await ApiGetPie()
			maxCount.value = resData.maxCount
			//将颜色属性添加进stateCountList数组中
			stateCountList.value = resData.stateCountList.map((item, index) => {
				return {
					...item,
					color: lineColor.value[index]
				}
			})
			// console.log(stateCountList.value)

			const option = ref({
				legend: {
					top: '5%',
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
						data: stateCountList.value
					}]
			})
			chart.value.init(echarts, (chart : any) => {
				// console.log('调用echarts')
				chart.setOption(option.value)
			})
		})()
	})
</script>
<style lang="scss" scoped>
	.pie-background {
		background-color: #fff;
		border-radius: 40rpx;
		margin-top: 40rpx;
		padding-bottom: 320rpx;
		box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.3);
	}

	.my-chart-pie {
		height: 100%;
	}

	.lineData {
		font-size: 14px;
		position: relative;
		top: -380rpx;
		margin: 10rpx;
	}
</style>