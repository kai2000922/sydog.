<template>
	<view>
		<view class="title">
			<text>订单详情</text>
		</view>
		<s-panel>
			<view class="commodity">
				<view class="commodity_info">
					<view class="commodity_info_img">
						<u-image :src="utils.getImgUrl(goods.images)" width="100%" height="100%" />
						<view v-if="order.ordersStatus === '退款中' || order.ordersStatus === '退款完成'"
							class="commodity_info_img_refund">
							<image src="@/static/tuikuan.png" />
							<text>{{ text.img }}</text>
						</view>
					</view>
					<view class="commodity_info_box">
						<view class="commodity_info_box_row1">
							<text class="commodity_name">{{ order.goodsName }}</text>
							<view class="commodity_price">
								<text class="commodity_price_original">{{'¥' + goods.hxPrice}}</text>
								<text class="commodity_price_now">¥0</text>
							</view>
						</view>
						<view class="commodity_info_box_row2">
							<text>{{ order.goodsType }}</text>
						</view>
						<view class="commodity_info_box_row3">
							<s-tag width="92" height="36" text="付邮领" color="#F7970D" fontColor="#06180C" />
						</view>
						<view class="commodity_info_box_row4">
							<text>运费：</text>
							<text>{{'¥' + goods.expressPrice}}</text>
							<text style="margin-left: 24rpx;">实付款：</text>
							<text>{{'¥' + order.zfPrice}}</text>
						</view>
					</view>
				</view>
				<view class="commodity_express">
					<image src="@/static/che.png"></image>
					<!-- <text>您已下单，我们将在48小时内发货</text> -->
					<text>{{ text.logistics }}</text>
				</view>
			</view>
			<view class="order">
				<view class="order_row2">
					<image src="@/static/dingdan.png"></image>
					<text>订单信息</text>
				</view>
				<view class="order_row5">
					<view class="order_row5_address">
						<view>
							<text>收件人：</text>
							<text>{{order.userAddress}}</text>
						</view>
						<text>{{order.userName}} {{order.userPhone}}</text>
					</view>
				</view>
				<view class="order_row6">
					<view>
						<label>下单时间：</label>
						<text>{{order.createTime}}</text>
					</view>
					<view class="order_row6_relative">
						<label>订单编号：</label>
						<text>{{order.ordersNum}}</text>
						<text style="margin-left: 16rpx;" @click="copy">复制</text>
					</view>
				</view>
				<view class="order_row7">
					<s-button width="184" height="64" text="联系客服" fontSize="28"
						:custom-style="{border: '1px solid #707070'}" @click="" />
					<s-button width="184" height="64" :text="text.refund" fontSize="28"
						:custom-style="{border: '1px solid #707070', marginLeft: '24rpx'}" @click="tkClick" />
				</view>
			</view>
		</s-panel>
		
		<s-button
			width="600"
			height="120"
			text="返回"
			:custom-style="{border: '1rpx solid #707070', margin: '0 auto'}"
			background="rgba(0, 0 ,0 , 0)"
			color="#06180C"
			@click="back"/>
			
		<!-- 退款弹窗 -->
		<refund :show.sync="refundPopup" :order="order" :goods="goods" @tk="tk"/>
		<refund-ok :show.sync="refundOkPopup" :img="order.orderImages" :price="order.zfPrice"/>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sTag from '@/components/pages/s-tag'
	import sButton from '@/components/pages/s-button'
	import refund from '@/components/pages/refund'
	import refundOk from '@/components/pages/refund_ok'

	import api from '@/utils/api.js'

	export default {
		components: {
			sPanel,
			sTag,
			sButton,
			refund,
			refundOk
		},
		data() {
			return {
				order: {},
				goods: {},
				utils: api,
				text: {
					img: '',
					logistics: '',
					refund: '',
				},
				// 退款弹出层
				refundPopup: false,
				// 退款成功弹出层
				refundOkPopup: false,
			}
		},
		onLoad(option) {
			uni.setNavigationBarColor({backgroundColor: '#FFFFFF'})
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('setData', function(data) {
				that.order = data.order
				that.goods = data.goods
				that.loadPage()
			})
		},
		methods: {
			
			// 准备页面数据
			loadPage() {
				let status = this.order.ordersStatus
				console.log(status);
				switch(status) {
					case '待支付':
						this.text.logistics = status
						break
					case '未发货':
						this.text.logistics = '您已下单，我们将在48小时内发货'
						this.text.refund = '退款'
						break
					case '揽件中':
					case '已发货':
					case '已完成':
						this.text.logistics = status
						this.text.refund = '退款'
						break
					case '退款中':
					case '已退款':
						this.text.img = '已退款'
						this.text.logistics = '此订单已取消，金额已退回原账户'
						this.text.refund = '已退款'
						break
				}
			},
			
			copy() {
				uni.setClipboardData({
					data: this.order.orderNum,
					success: () => {
						this.$tip.toast('复制成功')
					}
				});
			},
			
			back() {
				uni.navigateBack({ delta: 1 })
			},
			
			// 退款按钮点击
			tkClick() {
				if(this.order.ordersStatus === '退款中' || this.order.ordersStatus === '已退款') {
					return
				}
				if(this.order.ordersStatus === '未发货' || this.order.ordersStatus === '揽件中') {
					this.refundPopup = true
				} else {
					this.$tip.toast('已发货，请联系客服退款')
				}
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
	.title {
		width: 750rpx;
		height: 114rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FFFFFF;
		
		&>text {
			font-family: PingFangSC-Semibold;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
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
				position: relative;
				width: 200rpx;
				border-radius: 30rpx;
				background: #007AFF;
				overflow: hidden;

				&_refund {
					position: absolute;
					top: 0;
					left: 0;
					width: 200rpx;
					height: 200rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					background: rgba($color: #000000, $alpha: 0.5);

					&>image {
						width: 80rpx;
						height: 80rpx
					}

					&>text {
						margin-top: 8rpx;
						font-family: PingFangSC-Regular;
						font-size: 24rpx;
						color: #FFFFFF;
						letter-spacing: 0;
						text-align: center;
						line-height: 36rpx;
					}
				}
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
						font-weight: bold;
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
	}

	.order {
		&_row2 {
			margin-top: 40rpx;
			position: relative;
			display: flex;
			align-items: center;

			&>image {
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
			}

			&>text {
				margin-left: 16rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 40rpx;
			}

			&_cancel {
				position: absolute;
				width: 150rpx;
				height: 131rpx;
				right: 20rpx;
			}
		}

		&_row5 {
			margin-top: 19rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			&_address {
				display: flex;
				flex-direction: column;
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: #7F8581;
				letter-spacing: 0;
				line-height: 36rpx;
			}

			&_btn {
				display: flex;
				align-items: center;
				margin-left: 46rpx;
			}
		}

		&_row6 {
			margin-top: 24rpx;
			display: flex;
			flex-direction: column;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #7F8581;
			letter-spacing: 0;
			line-height: 36rpx;

			&_relative {
				position: relative;
				display: flex;
				align-items: center;

				&_btn {
					position: absolute;
					right: 0;

					&>button {
						width: 160rpx;
						height: 56rpx;
						border: 1rpx solid #707070;
						border-radius: 28rpx;
						font-weight: bold;
						font-family: PingFangSC-Semibold;
						font-size: 28rpx;
						color: $s_font_color;
						letter-spacing: 0;
						text-align: center;
						line-height: 54rpx;
					}
				}
			}
		}

		&_row7 {
			margin: 40rpx 0 10rpx 0;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}
</style>
