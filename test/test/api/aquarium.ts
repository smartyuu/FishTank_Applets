//鱼缸管理API
import service from '@/http/httpRequest'

export async function ApiGetAquariumIdList(username) {
	const { data: res } = await service({
		url: `/wx/aquarium/aquariumIdList/${username}`,
		method: 'GET',
	})
	const aquariumIdList = res.data.userAquariumList
	return aquariumIdList
}