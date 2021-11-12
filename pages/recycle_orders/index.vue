<template>
	<view class="page">
		<view class="page_title">
			<text>旧衣回收订单</text>
		</view>
		<scroll-view style="flex: 1;" enableBackToTop="true" scroll-y>
			<u-empty v-if="isNull" text="订单为空" mode="order" />
			<view v-for="(item, index) in orders">
				<view v-if="item.orderStatus == '待上门'">
					<order-init @click="showUpdate(item)" @updateOrder="updateOrderStatus(item.recycleID, -2)"
						:order="item" />
				</view>
				<view v-else-if="item.orderStatus == '邮寄中'">
					<order-success :order="item" />
				</view>
				<view v-else-if="item.orderStatus == '已取消'">
					<order-init @deleteOrder="deleteOrder(item)" :order="item" :cancels="true" />
				</view>
			</view>
		</scroll-view>
		<!-- 修改订单弹窗 -->
		<u-popup v-model="alterPopup" 
			height="85%"
			mode="bottom" 
			close-icon="close-circle" 
			:closeable="true"
			close-icon-color="#B0B7B3">
			<view class="alter">
				<view class="alter_title">
					<text>修改订单信息</text>
				</view>
				<view class="alter_form">
					<s-form :addressObj.sync="updateInfo.expectAddress" :date.sync="updateInfo.expectTime"
						:weight.sync="updateInfo.expectWeight" :address="updateInfo.expectAddressLabel"
						:contacts="updateInfo.contacts" />
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-bottom: 48rpx;">
					<s-button background="#43A668" width="690" height="120" color="#FFFFFF" :custom-style="{}"
						text="确认修改" @click="updateOrderStatus(updateInfo.recycleID, -1)" />
				</view>
			</view>
		</u-popup>
		<view class="abs_view">
			<view class="abs_view_btn" @click="toHome">
				<image src="@/static/order_home.png"></image>
			</view>
			<view class="abs_view_btn" @click="toKefu">
				<contact-button tnt-inst-id="n8c_Hb8w" scene="SCE01205269" color="#30BB63" size="50" icon="https://hkkkkk.cn:8080/profile/upload/2021/11/09/2a1f5a55-11a1-4d27-bcaa-f15416cfa50a.png"/>
			</view>
		</view>
	</view>
</template>

<script>
	import dotLine from '@/components/pages/s-dot-line'
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	import orderInit from './components/order-init'
	import sForm from '@/components/pages/s-form'
	import orderSuccess from './components/order-success'

	import api from '@/utils/api.js'

	export default {
		components: {
			dotLine,
			sPanel,
			sButton,
			sForm,
			orderInit,
			orderSuccess,
		},
		data() {
			return {
				// 回收订单数据
				orders: [],
				// 数据为空
				isNull: true,
				// 修改弹出层
				alterPopup: false,
				// 修改表单
				updateInfo: {
					recycleID: '',
					contacts: '',
					expectTime: '',
					expectWeight: 0,
					expectAddressLabel: '',
					expectAddress: {}
				},
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({title: ''})
			uni.setBackgroundColor({backgroundColor: '#fafffc'})
			uni.setNavigationBarColor({backgroundColor: '#FFFFFF'})
		},
		onShow() {
			if (this.$store.getters.userid === '') {
				api.getUserId().then(() => {
					this.getRecycleOrders()
				})
			} else {
				this.getRecycleOrders()
			}
		},
		watch: {
			orders: {
				handler(newValue, oldValue) {
					if (this.orders.length === 0) {
						this.isNull = true
					} else {
						this.isNull = false
					}
				},
				deep: true
			}
		},
		methods: {
			// 修改弹窗弹出
			showUpdate(item) {
				this.updateInfo.recycleID = item.recycleID
				this.updateInfo.contacts = item.name + ' ' + item.phone
				this.updateInfo.expectAddressLabel = item.address
				this.updateInfo.expectTime = item.expectTime
				this.updateInfo.expectWeight = item.expectWeight
				this.alterPopup = true
			},

			// 删除回收订单
			deleteOrder(item) {
				this.$tip.loading('删除中')
				if (item.recycleID !== '') {
					this.$http.post('/recycle/recycle/remove', {
						ids: item.recycleID
					}).then(res => {
						this.$tip.success('删除成功')
						this.getRecycleOrders()
					})
				} else {
					this.$tip.toast('订单不存在')
				}
			},

			//获取回收订单
			getRecycleOrders() {
				this.$tip.loading()
				this.orders = []
				this.$http.post('/recycle/recycle/list', {
					user: this.$store.getters.userid
				}).then(res => {
					this.orders = res.data.rows
				})
			},

			/*
				orderID 订单ID
				status 修改后的订单状态，
				param 修改订单后附带的参数
				1. 取消原因
				2. 修改时间 字符串 yyyy-mm-dd hh-mm-ss
				3. 修改地址 重新获取后拼接成的字符串，由
				省份 城市 地区 详细地址 姓名 联系电话 6部分组成，中间用英文";"分割。
			*/
			updateOrderStatus(recycleID, status) {
				this.$tip.loading('修改中')
				this.$http.post('/recycle/recycle/editOrder', {
					orderStatus: status,
					param: this.getAddressString(),
					orderID: recycleID
				}).then(res => {
					this.$tip.success('修改成功！')
					this.getRecycleOrders()
				}).finally(() => {
					this.alterPopup = false
				})
			},

			getAddressString() {
				//修改后的收货地址
				let addressInfo = this.updateInfo.expectAddress.prov == null ? ' ' : this.updateInfo.expectAddress.prov +
					";" + this.updateInfo.expectAddress.city + ";" + this.updateInfo.expectAddress.area + ";" +
					this.updateInfo.expectAddress.prov + this.updateInfo.expectAddress.city + this.updateInfo.expectAddress
					.area + this.updateInfo.expectAddress.street +
					this.updateInfo.expectAddress.address + ";" + this.updateInfo.expectAddress.fullname + ";" + this
					.updateInfo.expectAddress.mobilePhone

				//修改后的时间
				let timeInfo = this.updateInfo.expectTime

				//修改后的期望重量
				let weightInfo = this.updateInfo.expectWeight

				return timeInfo + "," + weightInfo + "," + addressInfo
			},
			
			// 首页
			toHome() {
				uni.navigateBack({ delta: getCurrentPages().length });
			},
			
			// 客服
			toKefu() {
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100vh;

		&_title {
			height: 112rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #ffffff;

			&>text {
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				font-weight: bold;
				color: #06180C;
				letter-spacing: 0;
				line-height: 42rpx;

				&::after {
					content: '';
					margin: 4rpx auto 0 auto;
					display: block;
					width: 80rpx;
					height: 6rpx;
					background-image: linear-gradient(270deg, #F7970D 0%, #FFD678 100%);
					border-radius: 3rpx;
				}
			}
		}
	}

	.alter {
		&_title {
			display: flex;
			justify-content: center;
			margin-top: 40rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 54rpx;
		}

		&_form {
			padding: 56rpx 92rpx 48rpx 92rpx;
		}
	}
	
	.abs_view {
		position: absolute;
		bottom: 160rpx;
		right: 30rpx;
		
		&>view:first-child {
			margin-top: 0rpx;
		}
		
		&_btn {
			margin-top: 20rpx;
			width: 100rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FFFFFF;
			box-shadow: 0 9rpx 26rpx 0 rgba(24,67,40,0.15);
			border-radius: 40rpx;
			
			&>image {
				width: 100rpx;
				height: 100rpx;
				vertical-align: middle;
			}
		}
	}
</style>
