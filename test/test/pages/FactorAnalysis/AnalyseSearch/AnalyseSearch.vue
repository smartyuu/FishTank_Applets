<template>
	<view class="analyse-table">
		<view class="calendar">
			<text class="calendar-text">请选择您要查询的日期：</text>
			<view class="calendar-button">
				<u-button :text="data" shape="circle" plain type="primary" icon="calendar"
					@click="calendarShow = true"></u-button>
			</view>
			<text class="calendar-text">请选择您要分析的类型：</text>
			<view class="calendar-button">
				<u-button :text="analysisType" shape="circle" plain type="primary" icon="grid"
					@click="pickerShow = true"></u-button>
			</view>
			<u-calendar :show="calendarShow" mode="single" @confirm="calendarConfirm" title="请选择分析的日期"
				:maxDate="maxDate"></u-calendar>
			<u-picker :show="pickerShow" :columns="columns" @confirm="pickerConfirm"></u-picker>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive,
	} from 'vue';
	const calendarShow = ref(false);
	const pickerShow = ref(false);
	const analysisType = ref("温度");
	//计算日期
	const d = new Date();
	const year = d.getFullYear();
	let month : any = d.getMonth() + 1;
	month = month < 10 ? `0${month}` : month;
	const day = d.getDate();
	const maxDate = `${year}-${month}-${day + 14}`;
	//初始化日期
	const data = ref(year + '-' + month + '-' + day)
	//选择日期的回调
	const calendarConfirm = (e) => {
		console.log(e[0]);
		data.value = e[0]
		calendarShow.value = false
	};

	const columns = reactive([
		['温度', 'PH', '电导率', '浑浊度']
	]);
	const emits = defineEmits(['judgeType'])
	//选择类型的回调
	const pickerConfirm = (e : any) => {
		// console.log(e.value[0])
		analysisType.value = e.value[0]
		pickerShow.value = false
		//传递数据给父组件
		emits('judgeType', e.value[0])
	}
</script>

<style scoped lang="scss">
	.analyse-table {
		position: relative;
		top: -80rpx;
		width: 90%;
		height: 420rpx;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 50rpx;
		border: 1px solid #0F0F77;
	}

	.calendar {
		position: absolute;
		// background-color: pink;
		top: 50rpx;
		left: 50rpx;

		.calendar-text {
			font-weight: 600;
			font-size: 30rpx;
		}

		.calendar-button {
			margin-top: 25rpx;
			// border-radius: 25rpx;
			width: 400rpx;
			margin-bottom: 30rpx;
		}
	}
</style>