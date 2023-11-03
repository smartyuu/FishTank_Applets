<template>
	<view class="userManagement-box">
		<u-image src="/static/userManagement.png" mode="aspectFit" width="100%" height="300"></u-image>
		<view class="user-table">
			<uni-table stripe emptyText="暂无更多数据" class="">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="left" width="40">用户名</uni-th>
					<uni-th align="left" width="40">姓名</uni-th>
					<uni-th align="left" width="80">创建时间</uni-th>
					<uni-th align="left" width="50">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>小陈</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>
						<u-icon name="setting" size="20" @click="setUserList"></u-icon>
					</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>小陈</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>图标</uni-td>
				</uni-tr><uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>小陈</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>图标</uni-td>
				</uni-tr><uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>小陈</uni-td>
					<uni-td>2022-03-25</uni-td>
					<uni-td>图标</uni-td>
				</uni-tr>

			</uni-table>
		</view>
	</view>
</template>

<script setup lang="ts">
	const setUserList = () => {
		console.log("编辑用户表")
	}
</script>

<style scoped lang="scss">
	.userManagement-box {
		width: 100vw;
		height: 120vh;
		background-color: #f2f8f9;

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
	}
</style>