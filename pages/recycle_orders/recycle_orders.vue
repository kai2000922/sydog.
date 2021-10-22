<template>
	<view class="page">
		<liuyuno-tabs :config="{height: '110rpx', lineHeight: '110rpx', underLineBottom: '26rpx'}"
			:tabData="titleConfig.list" :activeIndex="titleConfig.index" @tabClick="onswiperchange" />
		<swiper class="page_swiper" :current="titleConfig.index" @change="onswiperchange">
			<swiper-item class="page_swiper_item">
				<scroll-view class="page_swiper_item_view" style="flex: 1;" enableBackToTop="true" scroll-y>
					<view v-for="(item, index) in orders">
					<view class="order">
						<text class="order_title">旧衣上门回收</text>
						<text class="order_situation">订单完成啦!</text>
						<text class="order_label">本次回收旧衣物</text>
						<view class="order_weight">
							<span class="order_weight_left" />
							<view class="order_weight_words">
								<text>{{item.expectWeight}}</text>
								<text>公斤</text>
							</view>
							<span class="order_weight_right" />
						</view>
						<text class="order_exchange">可兑换5kg～8kg的专属好礼！</text>
						<view>
							<button class="order_button">已兑换，去查看好礼订单！</button>
						</view>
						<dot-line :height="20" :itemNumber="25" :customStyle="{marginRight: '-30rpx', marginLeft: '-30rpx', marginTop: '40rpx'}"/>
						<view class="order_order">
							<view class="order_order_title">
								<image src="@/static/dingdan.png"></image>
								<text>订单信息</text>
							</view>
							<view class="order_order_info">
								<view>
									<label>取件地址：</label>
									<text>{{item.address}}</text>
								</view>
								<view>
									<label>{{item.name}} {{item.phone}}</label>
								</view>
								<view>
									<label>取件时间：</label>
									<text>{{item.expectTime}}</text>
								</view>
								<view>
									<label>取件员：</label>
									<text>德邦快递 | {{item.Courier != null ? item.Courier : '暂无信息' }}</text>
								</view>
								<view>
									<label>下单时间：</label>
									<text>{{item.createTime}}</text>
								</view>
								<view>
									<label>订单编号：</label>
									<text>{{item.orderNum}}</text>
								</view>
								
							</view>
						</view>
					</view>
				</view>
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
	</view>
</template>

<script>
	import app from '../../App.vue'
	import dotLine from '@/components/pages/s_dot_line'
	import sPanel from '@/components/pages/s-panel/index.vue'

	export default {
		components: {
			dotLine,
			sPanel
		},
		data() {
			return {
				orders: [],
				titleConfig: {
					index: 1,
					list: [
						'旧衣回收订单',
						'商城订单'
					]
				},
				statusList: ["取消订单", "修改时间", "修改地址"]
			}
		},
		onReady() {
			if (my.canIUse('hideBackHome')) {
				my.hideBackHome();
			}
		},
		onLoad() {
			uni.setNavigationBarColor({
				backgroundColor: '#FFFFFF'
			})
			this.getRecycleOrders()
		},
		methods: {
			
			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.titleConfig.index = index;
				} else {
					this.titleConfig.index = e;
				}
			},
			
			getRecycleOrders() {
				if (app.userAcount != '') {
					uni.request({
						header: {
							'content-type': 'application/x-www-form-urlencoded'
						},
						url: app.BaseUrl + '/recycle/list',
						data: {
							'user': app.userAcount
						},
						method: 'POST',
						success: (res) => {
							this.orders = res.data.rows
							console.log(this.orders[0])
						},
						fail(err) {
							console.log(err)
						}
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
			updateOrderStatus(orderID, status, param) {
				let data = {
					'orderStatus': '',
					'param': param,
					'orderID': orderID
				}
				if (this.statusList[0] == status) {
					data.orderStatus = '-1'
				} else if (this.statusList[1] == status) {
					data.orderStatus = '-2'
				} else if (this.statusList[2] == status) {
					data.orderStatus = '-3'
				} else {
					console.log("status不存在")
					return
				}

				uni.request({
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					url: app.BaseUrl + '/recycle/edit',
					data: data,
					method: 'POST',
					success: (res) => {
						this.orders = res.data.rows
						console.log(this.orders[0].city)
					},
					fail(err) {
						console.log(err)
					}
				})

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
		background: $s_color_white;
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
</style>
