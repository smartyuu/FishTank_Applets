import {getToken,removeToken} from './auth';
import env from './env';

interface ServiceOptions {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'TRACE' | 'CONNECT';
  header?: {
    'content-type'?: string;
    'Authorization'?: string;
    [key: string]: string | undefined;
  };
  data?: any;
  dataType?: 'json' | 'text';
  responseType?: 'text' | 'arraybuffer';
  complete?: (res: any) => void;
}

function service(options:ServiceOptions) {
	options.url = `${env.baseUrl}${options.url}`;
	// 判断本地是否存在token，如果存在则带上请求头
	if (getToken()) {
		options.header = {
			'content-type': 'application/json',
			/*
			'Authorization': `${getToken()}`
			每次用户访问需要登录权限的接口时，
			前端会将这个 token 添加到 HTTP 请求头中，
			后端会验证这个 token 的有效性，如果有效则返回请求的数据，
			否则返回错误信息
			*/
			'Authorization': `${getToken()}`	// 这里是token(可自行修改)
		};
	}

	 return new Promise((resolved, rejected) => {
	    options.complete = (res) => {
	      // 如果请求回来的状态码不是200则执行以下操作
	      if (res.statusCode !== 200) {
	        // 非成功状态码弹窗
	        uni.showToast({
	          icon: 'none',
	          duration: 3000,
	          title: `${res.data.msg}`,
	        });
	        // 登陆失效
	        if (res.data.code === 403) {
				uni.showToast({
				   icon: 'none',
				   duration: 3000,
				   title: '登录失效',
				});
	          // 清除本地 token
	          removeToken();
	          // 关闭所有页面返回到登录页
	          uni.reLaunch({
	            url: '/pages/login/login',
	          });
	        }
	        // 返回错误信息
	        rejected(res);
	      } else {
	        // 请求回来的状态码为200则返回内容
	        resolved(res);
	      }
	    },
	  //   options.complete = (err) => {
	  //         // 请求失败弹窗
	  //         uni.showToast({
	  //           icon: 'none',
	  //           duration: 3000,
	  //           title: '服务器错误,请稍后再试',
	  //         });
	  //         rejected(err);
			// 	console.log(err);
			// };
	        uni.request(options);
	    });
}

export default service;
