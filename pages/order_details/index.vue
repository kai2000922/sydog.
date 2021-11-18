<template>
	<view>
		<view class="title flex_row flex_ai_center flex_jc_center">
			<text class="font_28 font_bold line_42 color_black">订单详情</text>
		</view>
		<s-panel>
			<order-briefly :img="utils.getImgUrl(goods.images)" :goods-name="goods.goodsName" :goods-type="goods.goodsType" :hx-price="goods.hxPrice" :express-price="goods.expressPrice" :zf-price="item.zfPrice" :refund-text="text.img"/>
			<!-- 订单状态 -->
			<view class="express flex_row flex_ai_center" @click="toDetails">
				<image src="@/static/che.png"></image>
				<text class="font_28 line_42 color_black text_ellipsis">{{ text.logistics }}</text>
			</view>
			<!-- 订单信息 -->
			<view class="info">
				<view class="label flex_row flex_ai_center">
					<image src="@/static/dingdan.png"></image>
					<text style="margin-left: 16rpx;" class="font_28 label_color line_42">订单信息</text>
				</view>
				<view style="color: #7F8581; margin-top: 20rpx;" class="flex_colum font_24 line_36">
					<text>{{ '收件人：' + order.userAddress }}</text>
					<text>{{order.userName}} {{order.userPhone}}</text>
				</view>
				<view style="color: #7F8581; margin-top: 20rpx;" class="flex_colum font_24 line_36">
					<text>{{ '下单时间：' + order.createTime }}</text>
					<text>
						<text>{{ '订单编号：' + order.ordersNum }}</text>
						<text style="margin-left: 16rpx;" @click="copy">复制</text>
					</text>
				</view>
			</view>
			<!-- 按钮行 -->
			<view style="margin: 40rpx 0 10rpx 0;" class="flex_row flex_jc_end flex_ai_center">
				<s-button background="#ffffff" color="#06180C" width="184" height="64" text="联系客服" fontSize="28"
					:custom-style="{border: '1px solid #707070'}"/>
				<s-button background="#ffffff" color="#06180C" width="184" height="64" :text="text.refund" fontSize="28"
					:custom-style="{border: '1px solid #707070', marginLeft: '24rpx'}" @click="tkClick" />
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
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	
	import orderBriefly from '@/components/pages/order-briefly'

	import api from '@/utils/api.js'

	export default {
		components: {
			sPanel,
			sButton,
			orderBriefly
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
			uni.setNavigationBarTitle({title: ''})
			uni.setBackgroundColor({backgroundColor: '#fafffc'})
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
			
			// 复制
			copy() {
				uni.setClipboardData({
					data: this.order.tradeNo,
					success: () => {
						this.$tip.toast('复制成功')
					}
				});
			},
			
			// 返回
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
	// .info_color: {
	// 	color: #7F8581;
	// }
	
	.title {
		width: 750rpx;
		height: 114rpx;
		background: #FFFFFF;
	}
	
	.express {
		box-sizing: border-box;
		margin-top: 40rpx;
		padding: 16rpx;
		background: #F8F8F8;
		border-radius: 20rpx;
			
		&>image {
			margin-right: 24rpx;
			height: 64rpx;
			width: 64rpx;
			vertical-align: middle;
		}
	}
	
	.label {
		margin-top: 40rpx;
		position: relative;
		
		&>image {
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
		}
	}
</style>
