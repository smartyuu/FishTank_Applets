import service from '../../http/httpRequest'
import { useMyStore } from '../../store/index'
import { ApiGetAquariumIdList } from '@/api/aquarium'
import { ref } from "vue"

const store = useMyStore()
const aquariumIdList = ref([])
const getAquariumIdList = (username : string) => {
	ApiGetAquariumIdList(username).then((res) => {
		aquariumIdList.value = res
		// console.log(aquariumIdList.value, "@@@")
	})
}
const reg = {
	toLogin: async (info : any) => {
		// console.log('hi');
		const res = await service({
			url: '/wx/ucenter/login',
			method: 'POST',
			data: info,
		}).then((response : any) => {
			// console.log(response);
			if (response.data.code == 0) {
				uni.switchTab({
					url: '/pages/index/index'
				})
				//把用户信息添加入仓库
				store.setUsername(info.username);
				// store.test()
				getAquariumIdList(info.username)
				store.setAquarium(aquariumIdList)
			} else {
				uni.showToast({
					icon: 'error',
					duration: 3000,
					title: '账号或密码错误',
				})
			}
		})
	},
};

export default reg;