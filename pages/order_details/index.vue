<template>
	<view class="page">
		<view class="title">
			<view style="height: 100%;" class="flex_row flex_ai_center flex_jc_center">
				<text class="font_28 font_bold line_42 color_black">订单详情</text>
			</view>
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
				<!-- <s-button background="#ffffff" color="#06180C" width="184" height="64" text="联系客服" fontSize="28"
					:custom-style="{border: '1px solid #707070'}"/> -->
				<s-button background="#ffffff" color="#06180C" width="184" height="64" :text="text.refund" fontSize="28"
					:custom-style="{border: '1px solid #707070', marginLeft: '24rpx'}" @click="refund" />
			</view>
		</s-panel>
		
		<!-- 退款弹窗 -->
		<refund :refund-show.sync="refundPopup" :ok-show.sync="refundOkPopup" :tkObj="tkObj"  @tk="tk"/>
		
		<s-button
			width="600"
			height="120"
			text="返回"
			:custom-style="{border: '1rpx solid #707070', margin: '0 auto'}"
			background="rgba(0, 0 ,0 , 0)"
			color="#06180C"
			@click="back"/>
			
		<view class="abs_view">
			<view class="abs_view_btn" @click="toHome">
				<image src="@/static/order_home.png"></image>
			</view>
			<view class="abs_view_btn">
				<contact-button tnt-inst-id="n8c_Hb8w" scene="SCE01205269" color="#30BB63" size="50" icon="https://hkkkkk.cn:8080/profile/upload/2021/11/09/2a1f5a55-11a1-4d27-bcaa-f15416cfa50a.png"/>
			</view>
		</view>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	import refund from '@/components/pages/refund'
	
	import orderBriefly from '@/components/pages/order-briefly'

	import api from '@/utils/api.js'

	export default {
		components: {
			sPanel,
			sButton,
			orderBriefly,
			refund
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
				// 需要退款的订单
				tkObj: {
					// 图片
					img: '',
					// 商品名
					goodsName: '商品',
					// 规格
					goodsType: '规格',
					// 画线价格
					hxPrice: 30,
					// 运费
					expressPrice: 10,
					// 支付价格
					zfPrice: 10
				},
				// 退款弹出层
				refundPopup: false,
				// 退款成功弹出层
				refundOkPopup: false,
				tkQuery: undefined,
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
			
			// 退款弹窗
			refund() {
				if(this.order.ordersStatus === '退款中' || this.order.ordersStatus === '已退款') {
					return
				}
				if(this.order.ordersStatus === '未发货' || this.order.ordersStatus === '揽件中') {
					let tkObj = {
						img: api.getImgUrl(this.goods.images),
						goodsName: this.goods.goodsName,
						goodsType: this.goods.goodsType,
						hxPrice: this.goods.hxPrice,
						expressPrice: this.goods.expressPrice,
						zfPrice: this.order.zfPrice,
					}
					let tkQuery = {
						ordersID: this.order.ordersID,
						ordersNum: this.order.ordersNum,
						goodsId: this.order.goodsId,
						ordersStatus: '退款中',
						tradeNo: this.order.tradeNo,
						userAddress: this.order.userAddress,
						userId: this.order.userId,
						userName: this.order.userName,
						userPhone: this.order.userPhone,
						zfPrice: this.order.zfPrice
					}
					this.tkObj = tkObj
					this.tkQuery = tkQuery
					this.refundPopup = true
				} else {
					this.$tip.toast('已发货，请联系客服退款')
				}
			},
			
			// 退款
			tk() {
				this.$tip.loading('退款中...')
				this.$http.post('/recycle/orders/refund', this.tkQuery).then(res => {
					this.refundPopup = false
					this.refundOkPopup = true
					this.getOrderList()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		position: relative;
		min-height: 100vh;
	}
	// .info_color: {
	// 	color: #7F8581;
	// }
	
	.title {
		position: sticky;
		top: 0rpx;
		width: 750rpx;
		height: 114rpx;
		background: #FFFFFF;
		z-index: 999;
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
	
	.abs_view {
		position: absolute;
		bottom: 80rpx;
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
