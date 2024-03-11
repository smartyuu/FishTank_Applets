<template>
	<AnalyseEcharts :option="option"></AnalyseEcharts>
</template>

<script lang="ts" setup>
	import AnalyseEcharts from "@/components/AnalyseEcharts/AnalyseEcharts.vue"
	import { getph } from '@/api/sensorData'
	import { ref, watch } from "vue"
	const TemList = ref([])
	const option = ref({
		text: '查看鱼缸PH趋势',
		xAxisData: ['0时', ' 6时', ' 12时', '18时', '24时'],
		yAxisFormatter: "{value}",
		data: [7.2, 7.5, 7.2, 7.6, 7.3]
	})
	const props = defineProps({
		date: {
			type: Number
		}
	})
	const getphList = (date : number) => {
		getph(date).then((res) => {
			// console.log(res)
			TemList.value = res
		})
	}
	//监测查询日期的变化
	watch(() => props.date, (newValue) => {
		// console.log(props.date)
		getphList(newValue)
	})
</script>