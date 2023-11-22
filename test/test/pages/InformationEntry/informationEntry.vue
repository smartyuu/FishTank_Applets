<template>
	<view class="information-box">
		<u-sticky bgColor="#f2f8f9">
			<view class="tabsIcon">
				<i v-for="(item,index) in tabsList" :key="index" :class="item.iconCode" class="iconfont"
					@click="changeIcon(index)"></i>
			</view>
			<view class="tabs-box">
				<u-tabs :list="tabsList" @click="clickTabs" :itemStyle="itemStyle" lineColor="#0000FF" lineWidth=50
					:current="current"></u-tabs>
			</view>
		</u-sticky>
		<FishTankInformation v-if='current === 0' />
		<FishInformation v-if='current === 1' />
	</view>
</template>

<script setup lang="ts">
	import FishInformation from './FishInformation/fishInformation.vue'
	import FishTankInformation from './FishTankInformation/fishTankInformation.vue'
	import { ref } from 'vue'
	const tabsList = ref([{
		name: '鱼缸信息',
		iconCode: 'icon-yugang'
	}, {
		name: '鱼类信息',
		iconCode: 'icon-yu'
	}])
	//tabs的索引
	const current = ref(0)
	//tab菜单样式
	const itemStyle = {
		padding: '0 65px',
		height: '45px',
	}

	//实现icon切换功能
	const firstColor = ref('#0000FF')
	const lastColor = ref('black')
	const changeColor = (index : numbeWr) => {
		if (index === 0) {
			firstColor.value = '#0000FF'
			lastColor.value = 'black'
		} else {
			firstColor.value = 'black'
			lastColor.value = '#0000FF'
		}
	}
	const changeIcon = (index) => {
		current.value = index
		changeColor(index)
	}
	//实现切换卡片功能
	const clickTabs = (item : any) => {
		changeColor(item.index)
		changeIcon(item.index)
	}
</script>

<style scoped lang="scss">
	@import url(/static/icon/iconfont.css);

	.information-box {
		width: 100vw;
		height: 120vh;
		background-color: #f2f8f9;

		.tabsIcon {
			display: flex;
			justify-content: space-around;

			.iconfont {
				font-size: 60px;
			}

			:first-child {
				color: v-bind(firstColor);
			}

			:last-child {
				color: v-bind(lastColor);
				font-weight: 700;
			}
		}

		.tabs-box {
			display: flex;
			justify-content: space-around;

			.u-tabs {
				font-size: 500px;
			}
		}
	}
</style>