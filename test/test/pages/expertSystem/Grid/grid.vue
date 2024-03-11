<template>
	<view class="grid-box">
		<u-grid @click="click" col="2" align="center">
			<u-grid-item v-for="(baseListItem,baseListIndex) in baseList" :key="baseListIndex" bgColor="#fff">
				<u-icon :customStyle="{paddingTop:40+'rpx'}" :name="baseListItem.name" :size="35"></u-icon>
				<text class="grid-text">{{baseListItem.title}}</text>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script setup lang="ts">
	import { ref } from "vue"
	const baseList = ref([{
		name: 'chat',
		title: '疾病自诊'
	},
	{
		name: 'setting',
		title: '专家审核'
	},
	{
		name: 'email',
		title: '发布通知'
	},
	{
		name: 'pushpin',
		title: '百科全书'
	},
	])
	const click = (name) => {
		uni.showToast({
			title: `点击了第${name}个`
		})
	}
</script>

<style scoped lang="scss">
	.grid-box {
		position: relative;
		top: -50rpx;
		width: 60%;
		margin: 0 auto;
		box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
		border-radius: 10rpx;

		.grid-text {
			font-size: 14px;
			padding: 30rpx 0 30rpx 0rpx;
			color: #000;
			/* #ifndef APP-PLUS */
			box-sizing: border-box;
			/* #endif */
		}
	}
</style>