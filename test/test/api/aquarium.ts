//鱼缸管理API

//返回当前用户所有水族箱id
import service from '@/http/httpRequest'

export async function ApiGetAquariumIdList(username : string) {
	const { data: res } = await service({
		url: `/wx/aquarium/aquariumIdList/${username}`,
		method: 'GET',
	})
	return res.data.userAquariumList

}

//返回水族箱信息
export async function ApiGetAquariumMess(id : number) {
	const { data: res } = await service({
		url: `/wx/aquarium/aquariumMess/${id}`,
		method: 'GET'
	})
	return res.data.aquariumMess
}

//获取鱼缸所有鱼的信息
export async function ApiGetAllFish(id : number) {
	const { data: res } = await service({
		url: `/wx/aquarium/getAllFish/${id}`,
		method: 'GET'
	})
	return res.data.fishList
}

//删除某条鱼的记录
export async function ApiDeleteFish(aquariumId : number, fishId : string) {
	const { data: res } = await service({
		url: `/wx/aquarium/deleteFish/${aquariumId}/${fishId}`,
		method: 'GET'
	})
	if (res.code == 0) {
		uni.showToast({
			icon: 'success',
			duration: 3000,
			title: '删除成功'
		})
	} else {
		uni.showToast({
			icon: 'error',
			duration: 3000,
			title: '删除失败'
		})
	}
	// console.log(res.data)
}

//添加鱼类
export async function ApiAddFish(id : number) {
	const { data: res } = await service({
		url: `/wx/aquarium/addFish/${id}`,
		method: 'POST'
	})
	console.log(res)
}