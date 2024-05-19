<template>
	<view class="encyclopaedia-box">
		<u-image src="/static/encyclopaedia.png" mode="aspectFit" width="100%" height="300"
			class="background-img"></u-image>
		<view class="box">
			<view class="fish-box" v-for="(item,index) in fishList" :key='index'>
				<u-image :show-loading="true" :src="item.src" width="120px" height="100px" class="head-photo"></u-image>
				<view class="text">
					<p>{{item.name}}<span class="detail">详情</span></p>
					<p class="introduce">{{item.introduce}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const fishList = ref([
		{
			src: '/static/fish1.png',
			name: '马鲛鱼',
			introduce: '马鲛鱼，体形狭长，头及体背部蓝黑色。一般体长为25～50厘米、体重...',
		},
		{
			src: '/static/fish2.png',
			name: '罗非鱼',
			introduce: '罗非鱼——原产非洲，属热带性鱼类，罗非鱼属包括亚种共有100多种...',
		},
		{
			src: '/static/fish3.png',
			name: '黄鳝',
			introduce: '黄鳝：又名鳝鱼。体细长呈蛇形，体长约20-70厘米，最长可达1米...',
		},
		{
			src: '/static/fish4.png',
			name: '鲫鱼',
			introduce: '鲫是鲤科、鲫属鱼类，体长46.9-255毫米。体长椭圆形，侧扁...',
		},
	])
</script>

<style scoped lang="scss">
	.encyclopaedia-box {
		position: relative;
		width: 100vw;
		height: 120vh;
		background-color: #f2f8f9;

		.fish-box {
			margin: 40px auto;
			display: flex;
			width: 90%;
			height: 99px;
			background-color: #fff;
			border-left: 0;
			border-radius: 10px;
			box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);

			.head-photo {
				display: inline-block;
			}

			.text {
				margin: 10px;
				font-size: 16px;

				.detail {
					float: right;
					color: blue;
				}

				.introduce {
					color: #bbb;
				}

				p {
					margin-bottom: 5px;
				}
			}
		}
	}

	.box {
		position: absolute;
		top: 450rpx;
		z-index: 1;
	}
</style>