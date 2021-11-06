<template>
	<s-panel>
		<view class="commodity">
			<view class="commodity_info">
				<view class="commodity_info_img">
					<u-image :src="utils.getImgUrl(goods.images)" width="100%" height="100%"/>
					<view v-if="item.ordersStatus === '退款中' || item.ordersStatus === '退款完成'" class="commodity_info_img_refund">
						<image src="@/static/tuikuan.png" />
						<text>{{ text.img }}</text>
					</view>
				</view>
				<view class="commodity_info_box">
					<view class="commodity_info_box_row1">
						<text class="commodity_name">{{ item.goodsName }}</text>
						<view class="commodity_price">
							<text class="commodity_price_original">{{'¥' + goods.hxPrice}}</text>
							<text class="commodity_price_now">¥0</text>
						</view>
					</view>
					<view class="commodity_info_box_row2">
						<text>{{ item.goodsType }}</text>
					</view>
					<view class="commodity_info_box_row3">
						<s-tag width="92" height="36" text="付邮领" color="#F7970D" fontColor="#06180C" />
					</view>
					<view class="commodity_info_box_row4">
						<text>运费：</text>
						<text>{{'¥' + goods.expressPrice}}</text>
						<text style="margin-left: 24rpx;">实付款：</text>
						<text>{{'¥' + item.zfPrice}}</text>
					</view>
				</view>
			</view>
			<view class="commodity_express" @click="toDetails">
				<image src="@/static/che.png"></image>
				<text>{{ text.logistics }}</text>
			</view>
			<view class="commodity_service">
				<s-button width="184" height="64" text="联系客服" fontSize="28"
					:custom-style="{border: '1px solid #707070'}" @click="click" />
				<s-button v-if="!waitPay" width="184" height="64" :text="text.refund" fontSize="28" 
					:custom-style="{border: '1px solid #707070'}" @click="tkClik" />
				<s-button v-if="!waitPay" width="184" height="64" text="查看物流" fontSize="28"
					:custom-style="{border: '1px solid #707070'}" @click="toDetails" />
				<s-button v-if="waitPay" width="184" height="64" text="待付款" fontSize="28"
					:custom-style="{border: '1px solid #707070'}" @click="zfClick" />
			</view>
			<view class="commodity_details" v-if="showDetails(item.ordersStatus)" @click="toDetails">
				<text>查看订单详情</text>
				<image src="@/static/arrow-right-24.png"/>
			</view>
		</view>
	</s-panel>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sTag from '@/components/pages/s-tag'
	import sButton from '@/components/pages/s-button'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			sPanel,
			sTag,
			sButton
		},
		props: {
			item: Object
		},
		data() {
			return {
				goods: {},
				utils: api,
				waitPay: false,
				text: {
					img: '',
					logistics: '',
					refund: '',
				}
			}
		},
		created() {
			this.getGoods(this.item.goodsId)
			this.loadPage()
		},
		methods: {
			getGoods(id) {
				this.$http.post('/recycle/goods/listByID', {goodsID: id}).then(res => {
					this.goods = res.data.data
				})
			},
			
			// 准备页面数据
			loadPage() {
				let status = this.item.ordersStatus
				switch(status) {
					case '待支付':
						this.waitPay = true
						this.text.logistics = status
						break
					case '未发货':
						this.waitPay = false
						this.text.logistics = '您已下单，我们将在48小时内发货'
						this.text.refund = '退款'
						break
					case '揽件中':
					case '已发货':
					case '已完成':
						this.waitPay = false
						this.text.logistics = status
						this.text.refund = '退款'
						break
					case '退款中':
					case '已退款':
						this.waitPay = false
						this.text.img = '已退款'
						this.text.logistics = '此订单已取消，金额已退回原账户'
						this.text.refund = '已退款'
						break
				}
			},
			
			// 是否显示'查看订单详情'
			showDetails(text) {
				let array = ['待支付', '退款中', '已退款']
				if(array.indexOf(text) != -1) {
					return false
				} else {
					return true
				}
			},
			
			// 待支付按钮点击事件
			zfClick() {
				this.$emit('zfClick', this.goods)
			},
			
			// 退款按钮事件
			tkClik() {
				if(this.item.ordersStatus === '退款中' || this.item.ordersStatus === '已退款') {
					return
				}
				if(this.item.ordersStatus === '未发货' || this.item.ordersStatus === '揽件中') {
					this.$emit('tkClick', this.item, this.goods)
				} else {
					this.$tip.toast('已发货，请联系客服退款')
				}
			},
			
			toDetails() {
				if(this.item.ordersStatus === '待支付') {
					return
				}
				let that = this
				uni.navigateTo({ 
					url:'/pages/order_details/index',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('setData', { order: that.item, goods: that.goods })
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
				// background: #007AFF;
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
