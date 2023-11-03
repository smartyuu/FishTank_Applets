<template>
	<view class="expertSystem-box">
		<u-image src="/static/expertSystem.png" mode="aspectFit" width="100%" height="300"></u-image>
		<Gird />
		<view class="phoneButton">
			<u-button :customStyle="customStyle" @click="phoneButton">&emsp;&emsp;直接电话沟通</u-button>
			<i class="iconfont icon-dianhua"></i>
			<view class="button-text">流程：描述疾病>推荐医生>开始通话</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import Gird from "./Grid/grid.vue"
	import { reactive } from "vue"
	const customStyle = reactive({
		width: '75%',
		height: '150rpx',
		backgroundColor: '#dce6fd',
		boxShadow: '0px 2px 6px 0px rgba(0, 0, 0, 0.3)',
		borderRadius: '50rpx',
		fontWeight: '700',
		fontSize: '45rpx'
	});
	const phoneButton = () => {
		console.log("打电话")
	}
</script>
<style scoped lang="scss">
	@import url(/static/icon/iconfont.css);

	.expertSystem-box {
		width: 100vw;
		height: 150vh;
		background-color: #f2f8f9;

		.phoneButton {
			width: 100%;
			margin: 0 auto;
			position: absolute;

			.icon-dianhua {
				position: relative;
				font-size: 120rpx;
				top: -135rpx;
				left: 140rpx;
				z-index: 1;
			}

			.button-text {
				position: relative;
				width: 68%;
				top: -100rpx;
				left: 100rpx;
				font-size: 30rpx;
				color: #CECECE;
				border-bottom: 1px solid #CECECE;
			}
		}
	}
</style>