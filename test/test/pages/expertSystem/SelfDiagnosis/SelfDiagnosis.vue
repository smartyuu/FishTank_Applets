<template>
	<view class="selfDiagnosis-box">
		<view v-for="(item,index) in doctorList" :key='index'>
			<view class="doctor-box">
				<u-image :show-loading="true" :src="item.src" width="100px" height="120px" class="head-photo"></u-image>
				<view class="text">
					<p>{{item.name}}</p>
					<p>{{item.seniority}}</p>
					<p>{{item.skill}}</p>
				</view>
			</view>
			<view class="operation">
				<span class="time">{{item.time}}</span>
				<u-button type="primary" :customStyle="customStyle">选择</u-button>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref } from 'vue';
	const doctorList = ref([
		{
			src: '/static/doctor1.png',
			name: '姓名：谭青宋',
			seniority: '资历：华中农业大学水产学院副教授，硕士生导师',
			skill: '擅长领域：传染性鱼病',
			time: '工作时间：09:00:00-17:00:00'
		},
		{
			src: '/static/doctor2.png',
			name: '姓名：陈家长',
			seniority: '资历：南京农业大学硕士生导师',
			skill: '擅长领域：病毒性鱼病',
			time: '工作时间：08:00:00-16:00:00'
		},
		{
			src: '/static/doctor3.png',
			name: '姓名：相建海',
			seniority: '资历：中国海洋大学、南京大学等兼职教授',
			skill: '擅长领域：传染性鱼病',
			time: '工作时间：10:00:00-18:00:00'
		},
	])
	const customStyle = reactive({
		float: 'right',
		width: '70px',
		height: '30px',
		marginRight: '10px'
	})
</script>

<style scoped lang="scss">
	.selfDiagnosis-box {
		width: 100vw;
		height: 150vh;
		background-color: #f2f8f9;
		overflow: hidden;

		.doctor-box {
			margin: 10px auto;
			display: flex;
			width: 90%;
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

				p {
					margin-bottom: 5px;
				}
			}
		}

		.operation {
			width: 90%;
			justify-content: space-between;
			margin: 0 auto;

			.time {
				color: #ccc;
				line-height: 40px;
				font-size: 14px;
				border-bottom: 1px solid #ccc;
			}

		}


	}
</style>