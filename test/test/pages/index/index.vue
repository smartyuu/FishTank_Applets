<template>
	<view class="content">
		<view class="text-area">
			<img class="welcome-img" src="../../static/index_top_img.png">
			<text class="title">{{ indexHelloNum }}</text>
		</view>
		<view class="video">
			<text class="video-title">视频监控</text>
			<video src="/static/fishvideo.mp4" autoplay="true" muted="true"></video>
		</view>
		<view class="statistics">
			<Rose class="rose-container"></Rose>
			<br>
			<Pie class="pie-container"></Pie>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue-demi';
	import Rose from '@/components/Rose/rose.vue'
	import Pie from "@/components/Pie/pie.vue"
	const indexHelloNum = ref('欢迎使用智能水培农场')
</script>
<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f2f8f9;

		.text-area {
			display: flex;
			justify-content: center;
			height: 30vh;

			.welcome-img {
				position: fixed;
				width: 100vw;
			}

			.title {
				font-size: $uni-img-size-mytitle;
				color: $uni-bg-color;
				font-weight: bolder;
				display: flex;
				align-items: center;
				z-index: 1;
			}
		}

		.video {
			display: flex;
			height: 40vh;
			width: 90vw;
			justify-content: center;

			video {
				border-radius: 10%;
			}

			.video-title {
				position: absolute;
				left: 40%;
				width: 100%;
				height: auto;
				color: #fff;
				font-weight: 700;
				z-index: 1;
			}
		}

		.statistics {
			width: 85%;
			z-index: 2;

			.rose-container {
				margin-bottom: 40rpx;
				box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.3);
			}

			.pie-container {
				box-shadow: 4px 5px 9px rgba(0, 0, 0, 0.3);
			}
		}
	}
</style>