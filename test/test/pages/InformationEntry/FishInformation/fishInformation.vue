<template>
	<view class="fishTankInformation-box">
		<u-button :hairline="false" type="primary" :plain="true" text="+操作" :customStyle="customStyle"></u-button>
		<view class="table">
			<uni-table stripe emptyText="暂无更多数据" class="">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="left" width="40">编号</uni-th>
					<uni-th align="left" width="50">类型</uni-th>
					<uni-th align="left" width="40">名称</uni-th>
					<uni-th align="left" width="80">年龄</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>鲫鱼</uni-td>
					<uni-td>小轩</uni-td>
					<uni-td>1</uni-td>
				</uni-tr>
				<uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>鲫鱼</uni-td>
					<uni-td>小轩</uni-td>
					<uni-td>1</uni-td>
				</uni-tr><uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>鲫鱼</uni-td>
					<uni-td>小轩</uni-td>
					<uni-td>1</uni-td>
				</uni-tr><uni-tr>
					<uni-td>16435</uni-td>
					<uni-td>鲫鱼</uni-td>
					<uni-td>小轩</uni-td>
					<uni-td>1</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive } from 'vue'
	//button按钮样式
	const customStyle = reactive({
		width: '100rpx',
		height: '50rpx',
		border: 'none',
		position: 'relative',
		top: '35px',
		left: '130px',
		zIndex: '1',
	});
</script>

<style scoped lang="scss">
	.fishTankInformation-box {
		.table {
			box-sizing: border-box;
			width: 90%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 10rpx;
			border: 1px solid #0F0F77;
		}
	}
</style>