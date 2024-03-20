<template>
	<view class="fishTankInformation-box">
		<u-button :hairline="false" type="primary" :plain="true" text="+操作" :customStyle="customStyle"
			@click="updateFish"></u-button>
		<view class="table">
			<uni-table stripe emptyText="暂无更多数据" class="">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="left" width="50">鱼缸编号</uni-th>
					<uni-th align="left" width="50">类型</uni-th>
					<uni-th align="left" width="40">名称</uni-th>
					<uni-th align="left" width="40">年龄</uni-th>
					<uni-th align="left" width="50">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item,index) in fishList" :key="index">
					<uni-td>{{item.pid}}</uni-td>
					<uni-td>{{item.type}}</uni-td>
					<uni-td>{{item.name}}</uni-td>
					<uni-td>{{item.inAge}}</uni-td>
					<nui-td>
						<span class="iconSpan">
							<u-icon name="trash" size="20" @click="setFishList(item.pid,item.id)"></u-icon>
						</span>
					</nui-td>
				</uni-tr>
			</uni-table>
			<u-modal :show="show" :content="content" showCancelButton confirmColor="red" closeOnClickOverlay
				@close="close" @confirm="confirm" @cancel="cancel">
			</u-modal>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { onMounted, reactive, ref } from 'vue'
	import { useMyStore } from '@/store/index'
	import { ApiGetAllFish, ApiDeleteFish } from "@/api/aquarium"
	const myStore = useMyStore()
	const fishList = ref([])
	const show = ref(false)
	const content = ref('是否删除该数据')
	const aquariumId = ref()
	const fishId = ref('')
	//button按钮样式
	const customStyle = reactive({
		width: '100rpx',
		height: '50rpx',
		border: 'none',
		position: 'relative',
		top: '35px',
		left: '145px',
		zIndex: '1',
	});
	//鱼类信息操作
	const updateFish = () => {
		console.log('点击鱼类信息操作')
		// show.value = true
	}
	//获取所有鱼信息
	const getAllFish = () => {
		ApiGetAllFish(myStore.aquarium[0]).then((res) => {
			fishList.value = res
		})
	}
	//删除某条鱼
	const deleteFish = (pid : number, id : string) => {
		ApiDeleteFish(pid, id)
	}
	const setFishList = (pid : number, id : string) => {
		show.value = true
		// console.log(pid, id)
		aquariumId.value = pid
		fishId.value = id
	}
	const close = () => {
		show.value = false
	}
	const confirm = () => {
		show.value = false
		// console.log('点击确认')
		deleteFish(aquariumId.value, fishId.value)
		getAllFish()
	}
	const cancel = () => {
		show.value = false
	}
	onMounted(() => {
		getAllFish()
	})
</script>

<style scoped lang="scss">
	.fishTankInformation-box {
		height: 120vh;

		.table {
			box-sizing: border-box;
			width: 95%;
			margin: 0 auto;
			background-color: #fff;
			border-radius: 10rpx;
			border: 1px solid #0F0F77;
		}

		.u-icon {
			margin-top: 10px;
		}
	}
</style>