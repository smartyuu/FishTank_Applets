<template>
	<view class="factor-box">
		<u-image src="/static/factorAnalysis.png" mode="aspectFit" width="100%" height="300"></u-image>
		<AnalyseSearch @judgeType='judgeType' @getDate="getDate"></AnalyseSearch>
		<view class="analyse-chart">
			<Temperature v-if='(type==="温度")' :date="date"></Temperature>
			<PH v-if='(type==="PH")' :date="date"></PH>
			<Muddy v-if='(type==="浑浊度")' :date="date"></Muddy>
			<Electrical v-if='(type==="电导率")' :date="date"></Electrical>
		</view>
	</view>
</template>

<script setup lang="ts">
	import AnalyseSearch from "./AnalyseSearch/AnalyseSearch.vue"
	import Temperature from "./Temperature/Temperature.vue"
	import PH from './PH/PH.vue'
	import Muddy from './Muddy/Muddy.vue'
	import Electrical from './Electrical/Electrical.vue'
	import { ref } from "vue"
	const type = ref('温度')
	const date = ref()
	const judgeType = (e) => {
		// console.log(e, '父组件接受的数据')
		type.value = e
	}
	const getDate = (e) => {
		date.value = e
	}
</script>

<style scoped lang="scss">
	.factor-box {
		width: 100vw;
		height: 140vh;
		background-color: #f2f8f9;

		.analyse-chart {
			margin: 0 auto;
			width: 90%;
			z-index: 2;
		}
	}
</style>