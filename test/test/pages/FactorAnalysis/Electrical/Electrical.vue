<template>
	<AnalyseEcharts :option="option"></AnalyseEcharts>
</template>

<script lang="ts" setup>
	import AnalyseEcharts from "@/components/AnalyseEcharts/AnalyseEcharts.vue"
	import { getDianDao } from '@/api/sensorData'
	import { ref, watch } from "vue"
	const TemList = ref([])
	const option = ref({
		text: '查看鱼缸电导率趋势',
		xAxisData: ['0时', ' 6时', ' 12时', '18时', '24时'],
		yAxisFormatter: "{value}",
		data: [300, 320, 330, 340, 320]
	})
	const props = defineProps({
		date: {
			type: Number
		}
	})
	const getDianDaoList = (date : number) => {
		getDianDao(date).then((res) => {
			// console.log(res)
			TemList.value = res
		})
	}
	//监测查询日期的变化
	watch(() => props.date, (newValue) => {
		// console.log(props.date)
		getDianDaoList(newValue)
	})
</script>