<template>
	<view class="page">
		<liuyuno-tabs :config="{height: '110rpx', lineHeight: '110rpx', underLineBottom: '26rpx'}"
			:tabData="titleConfig.list" :activeIndex="titleConfig.index" @tabClick="onswiperchange" />
		<swiper class="page_swiper" :current="titleConfig.index" @change="onswiperchange">
			<swiper-item class="page_swiper_item">
				<scroll-view class="page_swiper_item_view" style="flex: 1;" enableBackToTop="true" scroll-y>
					<u-empty v-if="isNull.order" text="订单为空" mode="order"/>
					<view v-for="(item, index) in orders">
						<view v-if = "item.orderStatus == '待上门'">
							<!-- <order-success :order = "item" @btnClick="toExchange"/> -->
							<order-init @click="showUpdate(item)" @updateOrder="updateOrderStatus(item.recycleID, -2)" :order = "item"/>
						</view>
						<view v-else-if = "item.orderStatus == '邮寄中'">
							<order-success :order = "item"/>
						</view>
						<view v-else-if = "item.orderStatus == '已取消'">
							<order-init @deleteOrder="deleteOrder(item)" :order = "item" :cancels = "true"/>
						</view>
					</view>
					</s-panel>
				</scroll-view>
			</swiper-item>
			<swiper-item class="page_swiper_item">
				<scroll-view class="page_swiper_item_view" style="flex: 1;" enableBackToTop="true" scroll-y>
					<u-empty v-if="isNull.recycle" text="订单为空" mode="order"/>
					<commodity 
						v-for="(item, index) in commodityOrders" 
						:key="index" 
						:item="item"
						@zfClick="toPayment"
						@tkClick="refund"/>
				</scroll-view>
			</swiper-item>
		</swiper>
		<!-- 修改订单弹窗 -->
		<u-popup v-model="alterPopup" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view class="alter">
				<view class="alter_title">
					<text>修改订单信息</text>
				</view>
				<view class="alter_form">
					<order-form :addressObj.sync="updateInfo.expectAddress" :date.sync="updateInfo.expectTime" :weight.sync="updateInfo.expectWeight" :address="updateInfo.expectAddressLabel" :contacts="updateInfo.contacts"/>
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-bottom: 48rpx;">
					<s-button
						background="#43A668" 
						width="690" 
						height="120" 
						color="#FFFFFF" 
						:custom-style="{}"
						text="确认修改"
						@click="updateOrderStatus(updateInfo.recycleID, -1)"/>
				</view>
			</view>
		</u-popup>
		<!-- 退款弹窗 -->
		<refund :show.sync="refundPopup" :order="refundItem" :goods="refundGoods" @tk="tk"/>
		<refund-ok :show.sync="refundOkPopup" :img="refundGoods.orderImages" :price="refundItem.zfPrice"/>
	</view>
</template>

<script>
	import dotLine from '@/components/pages/s-dot-line'
	import sPanel from '@/components/pages/s-panel'
	import sTag from '@/components/pages/s-tag'
	import sButton from '@/components/pages/s-button'
	import orderInit from './components/order-init'
	import orderForm from '@/components/pages/oder-form'
	import orderSuccess from './components/order-success'
	import commodity from './components/commodity'
	import refund from '@/components/pages/refund'
	import refundOk from '@/components/pages/refund_ok'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			dotLine,
			sPanel,
			sTag,
			sButton,
			orderInit,
			orderForm,
			orderSuccess,
			commodity,
			refund,
			refundOk
		},
		data() {
			return {
				// 回收订单数据
				orders: [],
				// 商品订单
				commodityOrders: [],
				// 数据为空
				isNull: {
					order: true,
					recycle: true
				},
				// tab
				titleConfig: {
					index: 0,
					list: [
						'旧衣回收订单',
						'商城订单'
					]
				},
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
				// 退款弹出层
				refundPopup: false,
				// 退款成功弹出层
				refundOkPopup: false,
				// 需要退款的订单
				refundItem: {},
				// 退款商品信息
				refundGoods: {}
			}
		},
		onLoad() {
			uni.setNavigationBarColor({ backgroundColor: '#FFFFFF' })
		},
		onShow() {
			if(this.$store.getters.userid === '') {
				api.getUserId().then(() => {
					this.getRecycleOrders()
					this.getCommodityOrders()
				})
			} else {
				this.getRecycleOrders()
				this.getCommodityOrders()
			}
		},
		// created() {
		// 	if(this.$store.getters.userid === '') {
		// 		api.getUserId().then(() => {
		// 			this.getRecycleOrders()
		// 			this.getCommodityOrders()
		// 		})
		// 	} else {
		// 		this.getRecycleOrders()
		// 		// this.getCommodityOrders()
		// 	}
		// },
		watch: {
			orders: {
				handler(newValue, oldValue) {
					if(this.orders.length === 0) {
						this.isNull.order = true
					} else {
						this.isNull.order = false
					}
				},
				deep: true
			},
			commodityOrders: {
				handler(newValue, oldValue) {
					if(this.commodityOrders.length === 0) {
						this.isNull.recycle = true
					} else {
						this.isNull.recycle = false
					}
				},
				deep: true
			}
		},
		methods: {
			// 修改弹窗弹出
			showUpdate(item){
				this.updateInfo.recycleID = item.recycleID
				this.updateInfo.contacts = item.name + ' ' + item.phone
				this.updateInfo.expectAddressLabel = item.address
				this.updateInfo.expectTime = item.expectTime
				this.updateInfo.expectWeight = item.expectWeight
				this.alterPopup = true
			},
			
			// 删除回收订单
			deleteOrder(item){
				this.$tip.loading('删除中')
				if(item.recycleID !== '') {
					this.$http.post('/recycle/recycle/remove', { ids: item.recycleID }).then(res => {
						this.$tip.loaded()
						this.$tip.success('删除成功')
						this.getRecycleOrders()
					}).catch(err => {
						this.$tip.loaded()
						this.$tip.error('删除失败')
					})
				}else{
					this.$tip.toast('订单不存在')
				}
			},	
			
			// 标题页改变
			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.titleConfig.index = index;
				} else {
					this.titleConfig.index = e;
				}
			},
			
			//获取回收订单
			getRecycleOrders() {
				this.$tip.loading()
				this.orders = []
				this.$http.post('/recycle/recycle/list',{ user: this.$store.getters.userid }).then(res => {
					this.$tip.loaded()
					this.orders = res.data.rows
				}).catch(err => {
					this.$tip.loaded()
					this.$tip.toast('查询订单失败，请稍后再试！')
				})
			},
			
			getCommodityOrders() {
				this.$tip.loading()
				this.commodityOrders = []
				this.$http.post('/recycle/orders/list',{ user: this.$store.getters.userid }).then(res => {
					console.log(res);
					this.$tip.loaded()
					this.commodityOrders = res.data.rows
				}).catch(err => {
					this.$tip.loaded()
					this.$tip.toast('查询订单失败，请稍后再试！')
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
				this.$http.post('/recycle/recycle/editOrder',{
					orderStatus: status,
					param: this.getAddressString(),
					orderID: recycleID
				}).then(res => {
					this.$tip.loaded()
					this.$tip.success('修改成功！')
					this.getRecycleOrders()
				}).catch(err => {
					this.$tip.loaded()
					this.$tip.toast('修改失败！' + res.data.msg)
				}).finally(() => {
					this.alterPopup = false
				})
			},
			
			getAddressString(){
				//修改后的收货地址
				let addressInfo = this.updateInfo.expectAddress.prov == null ? ' ' : this.updateInfo.expectAddress.prov + ";" + this.updateInfo.expectAddress.city + ";" + this.updateInfo.expectAddress.area + ";" 
				+ this.updateInfo.expectAddress.prov+this.updateInfo.expectAddress.city+this.updateInfo.expectAddress.area+this.updateInfo.expectAddress.street+
				this.updateInfo.expectAddress.address + ";" + this.updateInfo.expectAddress.fullname + ";" + this.updateInfo.expectAddress.mobilePhone
				
				//修改后的时间
				let timeInfo = this.updateInfo.expectTime
				
				//修改后的期望重量
				let weightInfo = this.updateInfo.expectWeight
				
				return timeInfo + "," +  weightInfo + "," + addressInfo
			},
			
			//跳转到商品兑换页
			toExchange() {
				uni.navigateTo({ url:'/pages/end/index?from=order'})
			},
			
			// 前往支付页面
			toPayment(goods) {
				uni.navigateTo({ 
					url:'/pages/payment/index?from=order',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('setData', { goods: goods })
					}
				})
			},
			
			// 退款弹窗
			refund(refundItem, refundGoods) {
				this.refundItem = refundItem
				this.refundGoods = refundGoods
				this.refundPopup = true
			},
			
			// 退款
			tk() {
				this.refundPopup = false
				this.refundOkPopup = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		display: flex;
		flex-direction: column;
		height: 100vh;

		&_swiper {
			flex: 1;

			&_item {
				height: 100%;
				flex: 1;
				flex-direction: column;

				&_view {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					flex-direction: column;
				}
			}
		}
	}

	.order {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx;
		background: #ffffff;
		box-shadow: 0 1px 24px 0 #E8F0EB;
		border-radius: 40rpx;

		&_title {
			display: flex;
			align-items: center;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: bolder;
			color: $s_font_color;
			letter-spacing: 0;
			line-height: 36rpx;

			&::before {
				content: '';
				display: block;
				margin-right: 8rpx;
				width: 8rpx;
				height: 8rpx;
				border-radius: 4rpx;
				background: #FA9E19;
			}
		}

		&_situation {
			margin-top: 66rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bolder;
			color: $s_font_color;
			text-align: center;
			letter-spacing: 0;
			line-height: 54rpx;
		}

		&_label {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: $s_font_color;
			letter-spacing: 0;
			text-align: center;
			line-height: 36rpx;
		}

		&_weight {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&_words {
				display: flex;
				align-items: center;
				
				&>text:first-child {
					font-family: PingFangSC-Semibold;
					font-size: 76rpx;
					color: $s_font_color;
					letter-spacing: 0;
				}
			
				&>text:last-child {
					margin-left: 9rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
				}
			}
			
			&_left {
				margin-right: 40rpx;
				display: block;
				width: 150rpx;
				height: 10rpx;
				background-image: linear-gradient(270deg, #43A668 0%, rgba(67,166,104,0.00) 100%);
				border-radius: 5rpx;
			}
			
			&_right {
				margin-left: 40rpx;
				display: block;
				width: 150rpx;
				height: 10rpx;
				background-image: linear-gradient(270deg, rgba(67,166,104,0.00) 0%, #43A668 100%);
				border-radius: 5rpx;
			}
		}
		
		&_exchange {
			margin-top: 38rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #43A668;
			letter-spacing: 0;
			text-align: center;
			line-height: 36rpx;
		}
		
		&_button {
			margin: 30rpx auto 0 auto;
			width: 600rpx;
			height: 120rpx;
			border: 1rpx solid #707070;
			border-radius: 60rpx;
			font-family: PingFangSC-Regular;
			font-size: 36rpx;
			color: $s_font_color;
			letter-spacing: 0;
			line-height: 120rpx;
		}
		
		&_order {
			margin-top: 40rpx;
			
			&_title {
				&>image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle
				}
				
				&>text {
					margin-left: 16rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
					line-height: 42rpx;
				}
			}
			
			&_info {
				margin-top: 20rpx;
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: #B0B7B3;
				letter-spacing: 0;
				line-height: 36rpx;
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
			color: $s_font_color;
			letter-spacing: 0;
			line-height: 54rpx;
		}
		
		&_form {
			padding: 56rpx 92rpx 48rpx 92rpx;
		}
	}
</style>