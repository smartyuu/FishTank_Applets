<template>
	<view class="expertReview-box">
		<u-image src="/static/check.png" mode="aspectFit" width="100%" height="300"></u-image>
		<view class="user-table">
			<uni-table stripe emptyText="暂无更多数据" class="">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="left" width="40">编号</uni-th>
					<uni-th align="left" width="50">申请人</uni-th>
					<uni-th align="left" width="80">申请时间</uni-th>
					<uni-th align="left" width="40">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr>
					<uni-td>123456</uni-td>
					<uni-td>小陈</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>
						<u-icon name="setting" size="20" @click="setUserList"></u-icon>
					</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>188137</uni-td>
					<uni-td>小王</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>
						<u-icon name="setting" size="20" @click="setUserList"></u-icon>
					</uni-td>
				</uni-tr><uni-tr>
					<uni-td>51561</uni-td>
					<uni-td>小李</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>
						<u-icon name="setting" size="20" @click="setUserList"></u-icon>
					</uni-td>
				</uni-tr><uni-tr>
					<uni-td>7894561</uni-td>
					<uni-td>小林</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>
						<u-icon name="setting" size="20" @click="setUserList"></u-icon>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<u-action-sheet title='请选择操作' :actions="list" :show="show" cancelText="取消" :closeOnClickOverlay="true"
			@close='close' @select="selectClick">
		</u-action-sheet>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const list = ref([
		{
			name: '通过',
		},
		{
			name: '不通过',
		}
	])
	const show = ref(false)

	const setUserList = () => {
		show.value = true
	}
	const close = () => {
		show.value = false
	}
	const selectClick = (index : any) => {
		// console.log(index)
		uni.showToast({
			title: '操作成功',

		})
	}
</script>

<style scoped lang="scss">
	.expertReview-box {
		width: 100vw;
		height: 120vh;
		background-color: #f2f8f9;
	}

	.user-table {
		box-sizing: border-box;
		position: relative;
		top: -50rpx;
		width: 90%;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 10rpx;
		border: 1px solid #0F0F77;
	}
</style>