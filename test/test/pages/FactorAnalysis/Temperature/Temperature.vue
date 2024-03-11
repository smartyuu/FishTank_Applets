<template>
	<AnalyseEcharts :option="option"></AnalyseEcharts>
</template>

<script lang="ts" setup>
	import AnalyseEcharts from "@/components/AnalyseEcharts/AnalyseEcharts.vue"
	import { getTem } from '@/api/sensorData'
	import { ref, watch } from "vue"
	const TemList = ref([])
	const option = ref({
		text: '查看鱼缸温度趋势',
		xAxisData: ['0时', ' 6时', ' 12时', '18时', '24时'],
		yAxisFormatter: "{value}°C",
		data: [25.5, 26, 27.2, 26.3, 25.7]
	})
	const props = defineProps({
		date: {
			type: Number
		}
	})
	const getTemList = (date : number) => {
		getTem(date).then((res) => {
			// console.log(res)
			TemList.value = res
		})
	}
	//监测查询日期的变化
	watch(() => props.date, (newValue) => {
		// console.log(props.date)
		getTemList(newValue)
	})
</script>