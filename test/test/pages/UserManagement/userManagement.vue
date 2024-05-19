<template>
	<view class="userManagement-box">
		<u-image src="/static/userManagement.png" mode="aspectFit" width="100%" height="300"></u-image>
		<view class="user-table">
			<uni-table stripe emptyText="暂无更多数据" class="">
				<!-- 表头行 -->
				<uni-tr>
					<uni-th align="left" width="40">用户名</uni-th>
					<uni-th align="left" width="40">姓名</uni-th>
					<uni-th align="left" width="40">权限</uni-th>
					<uni-th align="left" width="80">创建时间</uni-th>
					<uni-th align="left" width="40">操作</uni-th>
				</uni-tr>
				<!-- 表格数据行 -->
				<uni-tr v-for="(item,index) in userList" :key=index>
					<uni-td>{{item.userName}}</uni-td>
					<uni-td>{{item.name}}</uni-td>
					<uni-td>{{item.power}}</uni-td>
					<uni-td>{{item.time}}</uni-td>
					<uni-td>
						<u-icon name="setting" size="20" @click="setUserList(index)"></u-icon>
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
		<u-action-sheet title='请选择操作' :actions="list" :show="show" cancelText="取消" :closeOnClickOverlay="true"
			@close='close' @select="selectClick">
		</u-action-sheet>
		<u-modal :show="fixShow" title="修改用户信息" showCancelButton @confirm="fixConfirm" @cancel="fixCancel">
			<view class="slot-content">
				<u-form>
					<u-form-item label="用户名" prop="userInfo.userName">
						<u-input v-model="userInfo.userName"></u-input>
					</u-form-item>
					<u-form-item label="姓名" prop="userInfo.name">
						<u-input v-model="userInfo.name"></u-input>
					</u-form-item>
					<u-form-item label="权限" prop="userInfo.power">
						<u-input v-model="userInfo.power"></u-input>
					</u-form-item>
				</u-form>
			</view>
		</u-modal>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue';
	const userList = ref([
		{

			userName: '123456',
			name: '小陈',
			power: '管理员',
			time: '2022-03-25'
		},
		{

			userName: '188137',
			name: '小王',
			power: '普通用户',
			time: '2022-03-25'
		},
		{

			userName: '123456',
			name: '小李',
			power: '普通用户',
			time: '2022-03-25'
		},
		{
			userName: '123456',
			name: '小林',
			power: '普通用户',
			time: '2022-03-25'
		},
	])
	const userInfo = ref({ userName: '123456', name: '小陈', power: '管理员' })
	const list = ref([
		{
			name: '删除用户',
		},
		{
			name: '修改用户',
		}
	])
	const show = ref(false)
	const fixShow = ref(false)

	const setUserList = (index) => {
		show.value = true
		userInfo.value = userList.value[index]
	}
	const close = () => {
		show.value = false
	}
	const selectClick = ({ name }) => {
		// console.log(index)

		if (name == '修改用户') {
			fixShow.value = true
		} else {
			uni.showToast({
				title: '操作成功',
			})
		}
	}
	const fixConfirm = () => {
		uni.showToast({
			title: '操作成功',
		})
		fixShow.value = false
	}
	const fixCancel = () => {
		// console.log('取消')
		fixShow.value = false
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