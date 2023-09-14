import service from '../../http/httpRequest'
// #ifdef H5
import wx from 'weixin-js-sdk'
// #endif

const reg = {
	toRegist: async (info : object) => {//userName:string,psw:string
		console.log('hi');
		const data = await service({
			url: '/wx/ucenter/register',
			method: 'POST',
			data: info
		}).then((res : any) => {
			if (res.data.code !== 0) {
				uni.showToast({
					icon: 'error',
					duration: 3000,
					title: `${res.data.message}`,

				});
			} else {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		});
	},
	// 登录按钮点击事件
	// 页面中获取用户信息的方法
	getUserInfo: () => {
		// 判断用户是否已经授权过获取用户信息的权限
		if (!wx.getStorageSync('userInfo')) {
			// 如果未授权，则调用 wx.authorize 方法进行授权
			wx.authorize({
				scope: 'scope.userInfo',
				success() {
					// 用户授权成功，则调用 wx.getUserProfile 方法获取用户信息
					wx.getUserProfile({
						desc: '用于完善会员资料',
						success: res => {
							const userInfo = res.userInfo
							console.log(userInfo)
							// 在这里可以将用户信息传递给后端进行登录或注册操作
						},
						fail: () => {
							console.log('获取用户信息失败')
						}
					})
				},
				fail() {
					console.log('用户未授权')
				}
			})
		} else {
			// 如果已经授权过，则直接调用 wx.getUserProfile 方法获取用户信息
			wx.getUserProfile({
				desc: '用于完善会员资料',
				success: res => {
					const userInfo = res.userInfo
					console.log(userInfo)
					// 在这里可以将用户信息传递给后端进行登录或注册操作
				},
				fail: () => {
					console.log('获取用户信息失败')
				}
			})
		}
	}

}
export default reg