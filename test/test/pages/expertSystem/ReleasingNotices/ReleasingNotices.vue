<template>
	<view class="releasingNotices-box">
		<u-image src="/static/notice.png" mode="aspectFit" width="100%" height="300"></u-image>
		<view class="content">
			<view class="pick">
				<u-picker :show="show" :columns="columns" @confirm='pickConfirm' @cancel="pickCancel"></u-picker>
				<u-button @click="show = true">{{pick}}</u-button>
			</view>
			<view class="ID-box">
				<u-input placeholder="请输入通知用户的ID" border="bottom" v-model="userID"></u-input>
			</view>
			<view class="title-box">
				<u-input placeholder="请输入通知标题" border="bottom" v-model="title"></u-input>
			</view>
		</view>
		<view class="text-area">
			<u--textarea v-model="content" placeholder="请输入内容" count height=200></u--textarea>
		</view>
		<u-button type="primary" class="release" shape='circle' @click="release">发布</u-button>
		<u-button type="info" class="cancel" shape='circle' @click="empty">清空</u-button>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const show = ref(false)
	const pick = ref('选择')
	const columns = ref([
		['普通通知', '重要通知']
	])
	const userID = ref('')
	const title = ref('')
	const content = ref('')

	const pickConfirm = (index) => {
		show.value = false
		pick.value = index.value[0]
	}
	const pickCancel = () => {
		show.value = false
	}
	const release = () => {
		uni.showToast({
			title: '发布成功',
		})
	}
	const empty = () => {
		content.value = ''
	}
</script>

<style scoped lang="scss">
	.releasingNotices-box {
		width: 100vw;
		height: 120vh;
		background-color: #f2f8f9;

		.content {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;


			.pick {
				width: 25%;
				margin: 10rpx;
				border: 1px solid #0F0F77;
			}

			.ID-box {
				width: 60%;
				background-color: #fff;
				margin: 10rpx;
				border: 1px solid #0F0F77;
			}

			.title-box {
				width: 88%;
				background-color: #fff;
				margin: 10rpx;
				border: 1px solid #0F0F77;
			}
		}

		.text-area {
			width: 88%;
			background-color: #fff;
			margin: 10rpx auto;
			border: 1px solid #0F0F77;
		}

		.release {
			float: left;
			width: 20%;
			margin-top: 20rpx;
			margin-left: 45rpx;
		}

		.cancel {
			float: left;
			width: 20%;
			color: #fff;
			background-color: #b1b3b8;
			margin-top: 20rpx;
			margin-left: 45rpx;
		}
	}

	.u-textarea {
		height: 200px;
	}
</style>