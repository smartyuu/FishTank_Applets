import { defineStore } from 'pinia'
import { ref } from "vue"
import { ApiGetNightingale } from "@/api/echarts"
import service from '@/http/httpRequest'

export const useEchartsData = defineStore('echartsData', () => {
	const roseDataList = ref([])
	async function getNightingale() {
		// roseDataList.value = await ApiGetNightingale()
		// console.log(roseDataList.value)

		const res = ApiGetNightingale()
		console.log(res, "调用api的返回值")
	}
	const getRoseDataList = async () => {
		const { data: res } = await service({
			url: '/web/index/fishProportion/1000011',
			method: 'GET'
		})
		roseDataList.value = res.data.resList
		console.log('数据调用了')
	}
	return {
		roseDataList,
		getNightingale,
		getRoseDataList
	}
})