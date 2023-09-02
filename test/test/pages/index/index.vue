<template>
	<view class="content">
		<view class="text-area">
			<img class="welcome-img" src="../../static/index_top_img.png" alt="">
			<text class="title">{{ indexHelloNum }}</text>
		</view>
		<view class="vedio">
			<video-player :controls="true"></video-player>
		 </view>
		<Bar></Bar>
		<Rose class="rose-container"></Rose>
	</view>
</template>

<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue-demi';
// import useECharts  from 'vue-echarts';
// import * as echarts from 'echarts'
import Bar from '@/components/Bar/bar.vue'
import Rose from '@/components/Rose/rose.vue'
const indexHelloNum = ref('欢迎使用智能水培农场')
</script>
<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.text-area{
			display: flex;
			justify-content: center;
			height: 30vh;
			.welcome-img{
				position: fixed;
				width: 100vw;
				z-index: -1;
			}
			.title {
				font-size: $uni-img-size-mytitle;
				color: $uni-bg-color;
				font-weight: bolder;
				display: flex;
				align-items: center;
			}
		}
		.vedio{
			height: 20vh;
			width: 90vw;
			background-color: black;
		}
		.rose-container{
			height: auto;
			width: 100%;
		}
		
	}
</style>
