//水质信息API
import service from '@/http/httpRequest'
import { useMyStore } from '@/store/index'

const store = useMyStore()
//获取温度信息
export const getTem = async (time : number) => {
	try {
		const { data: res } = await service({
			url: `/wx/sensor-data/getTem/${store.aquarium}/${time}`,
			// url: `/wx/sensor-data/getTem/1000011/1651017600000`,
			method: 'GET'
		})
		if (res.code === 0) {
			// console.log('1111')
			const temList = res.data.temList
			return temList
		} else {
			uni.showToast({
				title: "获取数据失败",
				icon: 'error'
			})
			return res.message
		}
	} catch ({ data }) {
		uni.showToast({
			title: "获取数据失败",
			icon: 'error'
		})
		console.log(data.message)
		return data.message
	}
}

//获取PH信息
export const getph = async (time : number) => {
	try {
		const { data: res } = await service({
			url: `/wx/sensor-data/getph/${store.aquarium}/${time}`,
			// url: `/wx/sensor-data/getph/1000011/1651017600000`,
			method: 'GET'
		})
		if (res.code === 0) {
			// console.log('1111')
			const phList = res.data.phList
			return phList
		} else {
			uni.showToast({
				title: "获取数据失败",
				icon: 'error'
			})
			return res.message
		}
	} catch ({ data }) {
		uni.showToast({
			title: "获取数据失败",
			icon: 'error'
		})
		console.log(data.message)
		return data.message
	}
}

//获取浑浊度信息
export const getHunZhuo = async (time : number) => {
	try {
		const { data: res } = await service({
			url: `/wx/sensor-data/getHunZhuo/${store.aquarium}/${time}`,
			// url: `/wx/sensor-data/getHunZhuo/1000011/1651017600000`,
			method: 'GET'
		})
		if (res.code === 0) {
			// console.log('1111')
			const hunZhuoList = res.data.hunZhuoList
			return hunZhuoList
		} else {
			uni.showToast({
				title: "获取数据失败",
				icon: 'error'
			})
			return res.message
		}
	} catch ({ data }) {
		uni.showToast({
			title: "获取数据失败",
			icon: 'error'
		})
		console.log(data.message)
		return data.message
	}
}

//获取电导率信息
export const getDianDao = async (time : number) => {
	try {
		const { data: res } = await service({
			url: `/wx/sensor-data/getDianDao/${store.aquarium}/${time}`,
			// url: `/wx/sensor-data/getDianDao/1000011/1651017600000`,
			method: 'GET'
		})
		if (res.code === 0) {
			// console.log('1111')
			const dianDaoList = res.data.dianDaoList
			return dianDaoList
		} else {
			uni.showToast({
				title: "获取数据失败",
				icon: 'error'
			})
			return res.message
		}
	} catch ({ data }) {
		uni.showToast({
			title: "获取数据失败",
			icon: 'error'
		})
		console.log(data.message)
		return data.message
	}
}