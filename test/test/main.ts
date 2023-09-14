import App from './App'

import ECharts from 'vue-echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// #ifndef VUE3
import Vue from 'vue'

import { createPinia } from 'pinia'


Vue.config.productionTip = false
App.mpType = 'app'

try {
	function isPromise(obj) {
		return (
			!!obj &&
			(typeof obj === "object" || typeof obj === "function") &&
			typeof obj.then === "function"
		);
	}

	// 统一 vue2 API Promise 化返回格式与 vue3 保持一致
	uni.addInterceptor({
		returnValue(res) {
			if (!isPromise(res)) {
				return res;
			}
			return new Promise((resolve, reject) => {
				res.then((res) => {
					if (res[0]) {
						reject(res[0]);
					} else {
						resolve(res[1]);
					}
				});
			});
		},
	});
} catch (error) { }

const app = new Vue({
	...App
})
const pinia = createPinia()
app.use(pinia)
app.component('v-chart', ECharts);
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
export function createApp() {
	const app = createSSRApp(App)
	app.use(Pinia.createPinia())
	return {
		app,
		Pinia // 此处必须将 Pinia 返回
	}
}
// #endif