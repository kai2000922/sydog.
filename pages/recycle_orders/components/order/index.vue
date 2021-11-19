<template>
	<s-panel>
		<order-briefly :goodsID="goods.goodID" :img="utils.getImgUrl(goods.images)" :goods-name="goods.goodsName" :goods-type="goods.goodsType" :hx-price="goods.hxPrice" :express-price="goods.expressPrice" :zf-price="item.zfPrice" :refund-text="text.img"/>
		<!-- 订单状态 -->
		<view class="express flex_row flex_ai_center" @click="toDetails">
			<image src="@/static/che.png"></image>
			<text class="font_28 line_42 color_black text_ellipsis">{{ text.logistics }}</text>
		</view>
		
		<!-- 按钮行 -->
		<view style="margin-top: 40rpx; justify-content: space-around;" class="flex_row">
			<!-- <contact-button tnt-inst-id="企业编码" scene="聊天窗编码" size="咨询按钮大小" color="咨询按钮颜色" icon="咨询按钮图片url" /> -->
			<!-- <s-button background="#ffffff" color="#06180C" width="184" height="64"  fontSize="28"
				:custom-style="{border: '0px solid #707070'}"/> -->
			<s-button v-if="!waitPay" background="#ffffff" color="#06180C" width="184" height="64" :text="text.refund" fontSize="28" 
				:custom-style="{border: '1px solid #707070'}" @click="tkClik" />
			<s-button v-if="!waitPay" background="#ffffff" color="#06180C" width="184" height="64" text="查看物流" fontSize="28"
				:custom-style="{border: '1px solid #707070'}" @click="toDetails" />
			<s-button v-if="waitPay" background="#ffffff" color="#06180C" width="184" height="64" text="待付款" fontSize="28"
				:custom-style="{border: '1px solid #707070'}" @click="zfClick" />
		</view>
		
		<!-- 订单详情 -->
		<view style="margin-top: 30rpx;" class="flex_row flex_ai_center flex_jc_center" v-if="showDetails(item.ordersStatus)" @click="toDetails">
			<text class="font_24 line_36 color_grey">查看订单详情</text>
			<image style="width: 24rpx; height: 24rpx; vertical-align: middle;" src="@/static/arrow-right-24.png"/>
		</view>
	</s-panel>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sTag from '@/components/pages/s-tag'
	import sButton from '@/components/pages/s-button'
	
	import orderBriefly from '@/components/pages/order-briefly'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			sPanel,
			sTag,
			sButton,
			orderBriefly
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
				this.$emit('zfClick', this.item)
			},
			
			// 退款按钮事件
			tkClik() {
				if(this.item.ordersStatus === '退款中' || this.item.ordersStatus === '已退款') {
					return
				}
				if(this.item.ordersStatus === '未发货' || this.item.ordersStatus === '揽件中') {
					let obj = {
						img: api.getImgUrl(this.goods.images),
						goodsName: this.goods.goodsName,
						goodsType: this.goods.goodsType,
						hxPrice: this.goods.hxPrice,
						expressPrice: this.goods.expressPrice,
						zfPrice: this.item.zfPrice,
					}
					let tkQuery = {
						ordersID: this.item.ordersID,
						ordersNum: this.item.ordersNum,
						goodsId: this.item.goodsId,
						ordersStatus: '退款中',
						tradeNo: this.item.tradeNo,
						userAddress: this.item.userAddress,
						userId: this.item.userId,
						userName: this.item.userName,
						userPhone: this.item.userPhone,
						zfPrice: this.item.zfPrice
					}
					this.$emit('tkClick', obj, tkQuery)
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
</style>
