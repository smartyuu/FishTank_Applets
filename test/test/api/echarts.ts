import service from '@/http/httpRequest'

export async function ApiGetNightingale() {
	return await service({
		url: '/web/index/fishProportion/1000011',
		method: 'GET'

	}).then((res) => {
		return res.data.data.resList;
	})
	// const resList = res.data.resList
	// return resList
}