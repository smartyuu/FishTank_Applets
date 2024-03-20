<template>
	<view class="fishTankInformation-box">
		<u-button :hairline="false" type="primary" :plain="true" text="+操作" :customStyle="customStyle"
			@click="updateFishTank"></u-button>
		<view class="table">
			<uni-table stripe emptyText="暂无更多数据" class="">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="left" width="40">编号</uni-th>
					<uni-th align="left" width="50">鱼数</uni-th>
					<uni-th align="left" width="80">鱼缸容量</uni-th>
					<uni-th align="left" width="80">电话</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item,index) in fishTankList" :key="index">
					<uni-td>{{myStore.aquarium[index]}}</uni-td>
					<uni-td>{{item.fishNum}}</uni-td>
					<uni-td>{{item.maxNum}}</uni-td>
					<uni-td>{{item.phone}}</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<u-action-sheet title="修改鱼缸最大容量" :show="show" :closeOnClickOverlay="true" cancelText="取消" @close='close'>
			<u-input placeholder='请输入要修改的数值'></u-input>
			<u-button @click="close" type="primary" :plain="true">确定</u-button>
		</u-action-sheet>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { useMyStore } from '@/store/index'
	import { ApiGetAquariumMess } from "@/api/aquarium"
	const myStore = useMyStore()
	const fishTankList = ref([])
	const show = ref(false)
	//button按钮样式
	const customStyle = reactive({
		width: '100rpx',
		height: '50rpx',
		border: 'none',
		position: 'relative',
		top: '35px',
		left: '150px',
		zIndex: '1',
	});
	//修改鱼缸操作
	const updateFishTank = () => {
		show.value = true
	}
	// 获取水族箱信息
	const getAquariumMess = () => {
		for (let item of myStore.aquarium) {
			// console.log(item)
			ApiGetAquariumMess(item).then((res) => {
				fishTankList.value.push(res)
			})
		}
		// console.log(fishTankList.value)
	}
	const close = () => {
		show.value = false
	}
	onMounted(() => {
		getAquariumMess()
	})
</script>

<style scoped lang="scss">
	.fishTankInformation-box {
		.table {
			box-sizing: border-box;
			width: 95%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 10rpx;
			border: 1px solid #0F0F77;
		}
	}
</style>