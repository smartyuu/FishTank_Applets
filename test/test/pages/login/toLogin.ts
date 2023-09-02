import service from '../../http/httpRequest'
// import {useMyStore} from '../../store/index'
// const store=useMyStore()

const reg = {
  toLogin: async (info: any) => {
    console.log('hi');
    const res = await service({
      url: '/wx/ucenter/login',
      method: 'POST',
      data: info,
    }).then((response:any)=>{
		console.log(response);
		if (response.data.code==0) {
			uni.navigateTo({
				url:'/pages/index/index'
			})
		} else {
			uni.showToast({
				icon: 'error',
				duration: 3000,
				title: '账号或密码错误',
			});
		}
	})
  },
};

export default reg;




		// store.setUsername(userName);
		// store.setToken(res.data.token);