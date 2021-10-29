<template>
	<view class="page">
		<liuyuno-tabs :config="{height: '110rpx', lineHeight: '110rpx', underLineBottom: '26rpx'}"
			:tabData="titleConfig.list" :activeIndex="titleConfig.index" @tabClick="onswiperchange" />
		<swiper class="page_swiper" :current="titleConfig.index" @change="onswiperchange">
			<swiper-item class="page_swiper_item">
				<scroll-view class="page_swiper_item_view" style="flex: 1;" enableBackToTop="true" scroll-y>
					<view v-for="(item, index) in orders">
						<view v-if = "item.orderStatus == '待上门'">
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
					<s-panel>
						<view class="commodity">
							<view class="commodity_info">
								<view class="commodity_info_img">
									
								</view>
								<view class="commodity_info_box">
									<view class="commodity_info_box_row1">
										<text class="commodity_name">布婷4层卷纸｜2提装</text>
										<view class="commodity_price">
											<text class="commodity_price_original">¥30</text>
											<text class="commodity_price_now">¥0</text>
										</view>
									</view>
									<view class="commodity_info_box_row2">
										<text>2提装</text>
									</view>
									<view class="commodity_info_box_row3">
										<text>付邮领</text>
									</view>
									<view class="commodity_info_box_row4">
										<text>运费：</text>
										<text>¥9.9</text>
										<text style="margin-left: 24rpx;">实付款：</text>
										<text>¥9.9</text>
									</view>
								</view>
							</view>
							<view class="commodity_express">
								<image src="@/static/che.png"></image>
								<text>您已下单，我们将在48小时内发货</text>
							</view>
							<view class="commodity_service">
								<button>联系客服</button>
								<button>退款</button>
								<button>查看物流</button>
							</view>
							<view class="commodity_details">
								<text>查看订单详情</text>
								<image src="@/static/arrow-right-24.png"></image>
							</view>
						</view>
					</s-panel>
				</scroll-view>
			</swiper-item>
		</swiper>
		<u-popup v-model="alterPopup" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view class="alter">
				<view class="alter_title">
					<text>修改订单信息</text>
				</view>
				<view class="alter_form">
					<order-form :addressObj.sync="updateInfo.expectAddress" :date.sync="updateInfo.expectTime" :weight.sync="updateInfo.expectWeight" :address="updateInfo.expectAddressLabel" :contacts="updateInfo.contacts"/>
				</view>
				<view>
					<button class="i_button" @click="updateOrderStatus(updateInfo.recycleID, -1)">确认修改</button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import app from '../../App.vue'
	import dotLine from '@/components/pages/s-dot-line'
	import sPanel from '@/components/pages/s-panel'
	import orderInit from './components/order-init'
	import orderForm from '@/components/pages/oder-form'
	import orderSuccess from './components/order-success'
	
	export default {
		components: {
			dotLine,
			sPanel,
			orderInit,
			orderForm,
			orderSuccess
		},
		data() {
			return {
				orders: [],
				titleConfig: {
					index: 0,
					list: [
						'旧衣回收订单',
						'商城订单'
					]
				},
				alterPopup: false,
				statusList: ["取消订单", "修改时间", "修改地址"],
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
		onReady() {
		},
		onLoad() {
			uni.setNavigationBarColor({ backgroundColor: '#FFFFFF' })
			this.getRecycleOrders()
		},
		methods: {
			
			showUpdate(item){
				this.updateInfo.recycleID = item.recycleID
				this.updateInfo.contacts = item.name + ' ' + item.phone
				this.updateInfo.expectAddressLabel = item.address
				this.updateInfo.expectTime = item.expectTime
				this.updateInfo.expectWeight = item.expectWeight
				this.alterPopup = true
			},
			
			deleteOrder(item){
				if(item.recycleID !== '') {
					this.$http.post('/recycle/remove', { ids: item.recycleID }).then(res => {
						this.$tip.toast('删除成功！')
						this.getRecycleOrders()
					}).catch(err => {
						this.$tip.toast(res.data.msg)
					})
				}else{
					this.$tip.toast('订单不存在')
				}
			},	
			
			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.titleConfig.index = index;
				} else {
					this.titleConfig.index = e;
				}
			},
			
			getRecycleOrders() {
				this.$tip.loading()
				this.orders = []
				if (app.userAcount != '') {
					this.$http.post('/recycle/list',{ user: app.userAcount }).then(res => {
						this.orders = res.data.rows
					}).catch(err => {
						this.$tip.toast('查询订单失败，请稍后再试！')
					}).finally(() => {
						this.$tip.loaded()
					})
				}
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
				this.$http.post('/recycle/editOrder',{
					orderStatus: status,
					param: this.getAddressString(),
					orderID: recycleID
				}).then(res => {
					this.$tip.success('修改成功！')
					this.getRecycleOrders()
				}).catch(err => {
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
				let timeInfo = this.updateInfo.expectTime == '' ? app.ChooseOrder.expectTime : this.updateInfo.expectTime
				
				//修改后的期望重量
				let weightInfo = this.updateInfo.expectWeight == 0 ? app.ChooseOrder.expectWeight : this.updateInfo.expectWeight
				
				return timeInfo + "," +  weightInfo + "," + addressInfo
			},
			
			// flushPage(){
			// 	let page = getCurrentPages().pop();
			// 	this.$u.route({  
			// 	    url: page.route, // 获取当前页面路由  
			// 	    type:"redirectTo", // 关闭当前页面，跳转到应用内的某个页面。  
			// 	    params: page.options // 获取当前页面传参  
			// 	})
			// }
			
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
	
	.commodity {
		display: flex;
		flex-direction: column;
		
		&_info {
			height: 200rpx;
			display: flex;
			flex-direction: row;
			
			&_img {
				width: 200rpx;
				border-radius: 30rpx;
				background: #007AFF;
			}
			
			&_box {
				flex: 1;
				margin-left: 16rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				// background: #18B566;
				
				&_row1 {
					display: flex;
					justify-content: space-between;
					
					&>.commodity_name {
						font-family: PingFangSC-Semibold;
						font-size: 28rpx;
						color: $s_font_color;
						letter-spacing: 0;
						line-height: 42rpx;
					}
					
					&>.commodity_price {
						
						.commodity_price_original {
							font-family: PingFangSC-Regular;
							font-size: 28rpx;
							text-decoration: line-through;
							color: #B0B7B3;
							letter-spacing: 0;
							line-height: 42rpx;
						}
						
						.commodity_price_now {
							margin-left: 8rpx;
							font-family: PingFangSC-Regular;
							font-size: 28rpx;
							color: $s_font_color;
							letter-spacing: 0;
							line-height: 42rpx;
						}
					}
				}
				
				&_row2 {
					margin-top: 4rpx;
					font-family: PingFangSC-Regular;
					font-size: 24rpx;
					color: $s_font_color;
					letter-spacing: 0;
					line-height: 36rpx;
				}
				
				&_row3 {
					margin-top: 20rpx;
					
					&>text {
						padding: 3rpx 16rpx;
						font-family: PingFangSC-Regular;
						font-size: 20rpx;
						color: $s_font_color;
						letter-spacing: 0;
						line-height: 30rpx;
						border: 1rpx solid #F7970D;
						border-radius: 20rpx;
					}
				}
				
				&_row4 {
					margin-top: 10rpx;
					display: flex;
					justify-content: flex-end;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
					line-height: 42rpx;
				}
			}
		}
		
		&_express {
			box-sizing: border-box;
			margin-top: 40rpx;
			padding: 16rpx;
			display: flex;
			align-items: center;
			background: #F8F8F8;
			border-radius: 20rpx;
			
			&>image {
				margin-right: 24rpx;
				height: 64rpx;
				width: 64rpx;
				vertical-align: middle;
			}
			
			&>text {
				flex: 1;
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 42rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		
		&_service {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&>button {
				width: 184rpx;
				height: 64rpx;
				border: 1rpx solid #707070;
				border-radius: 32rpx;
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				color: #06180C;
				letter-spacing: 0;
				text-align: center;
				line-height: 64rpx;
			}
		}
		
		&_details {
			margin-top: 30rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			
			&>text {
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: #7F8581;
				letter-spacing: 0;
				text-align: center;
				line-height: 36rpx;
			}
			
			&>image {
				width: 24rpx;
				height: 24rpx;
				vertical-align: middle;
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