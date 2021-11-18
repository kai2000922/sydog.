<template>
	<view class="container">
		<view class="top-background" />
		
		<step :step-style="{marginBottom: '40rpx'}" :dataList="stepList" />

		<s-panel v-if="from === 'order'" :custom-style="{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				margin: '30rpx 30rpx 0rpx 30rpx'}">
			<text class="font_36 line_54 font_bold color_black">旧衣称重公斤数!</text>
			<text class="font_24 line_36 font_bold color_black">此为最终实际重量</text>
			<view class="weight flex_row flex_ai_center flex_jc_center">
				<span class="weight_left" />
				<view class="flex_row flex_ai_center">
					<text class="number">{{ actualWeight }}</text>
					<text class="str">公斤</text>
				</view>
				<span class="weight_right" />
			</view>
			<!-- <text class="buynow_exchange">可兑换5kg～8kg的专属好礼！</text> -->
		</s-panel>

		<s-panel v-if="from === 'order'">
			<view class="flex_row flex_ai_center">
				<s-dot size="16"/>
				<text style="margin-left: 16rpx;" class="font_36 line_54 font_bold color_black">兑换好礼专区</text>
			</view>
			<view class="flex_row flex_jc_between flex_warp">
				<goods-item v-for="(item, index) in goodsList" :key="index" :item="item"
					:custom-style="index >= 2 ? {marginTop: '56rpx'} : {marginTop: '30rpx'}" 
					@goodsClick="toGoods"/>
			</view>
			<u-loadmore margin-top="20" :status="goodsStatus" :load-text="goodsLoadText"
				@loadmore="goodsListErrorHandle" />
		</s-panel>
		
		<view v-if="from === 'pay'">
			<s-panel>
				<view style="padding: 40rpx 0;" class="flex_colum flex_ai_center">
					<image class="ok_img" src="@/static/ok.png"/>
					<text style="margin-top: 37rpx;" class="font_36 font_bold color_black line_54">支付成功</text>
					<text style="margin-top: 8rpx;" class="font_24 font_bold color_black line_36">我们将在48小时内为您发货</text>
				</view>			
			</s-panel>
			<s-button
				width="600"
				height="120"
				text="已兑换，去查看好礼订单！"
				:custom-style="{border: '1rpx solid #707070', margin: '0 auto'}"
				background="rgba(0, 0 ,0 , 0)"
				color="#06180C"
				@click="toOrder"
			/>	
		</view>
	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	import sDot from '@/components/pages/s-dot'
	import goodsItem from './components/goods-item'

	import api from '@/utils/api.js'

	export default {
		components: {
			step,
			sPanel,
			sButton,
			sDot,
			goodsItem
		},
		data() {
			return {
				stepList: [
					{
						index: '01',
						span: '4',
						choice: false,
						title: '预约回收',
						subTitle: '提交信息'
					},
					{
						index: '02',
						span: '4',
						choice: true,
						title: '上门取衣',
						subTitle: '免费上门0运费'
					},
					{
						index: '03',
						span: '4',
						choice: false,
						title: '完成',
						subTitle: '回收完成'
					}
				],
				goodsRequest: {
					pageSize: 10,
					pageNum: 0,
					over: false
				},
				goodsList: [],
				goodsStatus: 'loading',
				goodsLoadText: {
					loadmore: '重新加载',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
				
				// 来源
				from: '',
				// 回收重量
				actualWeight: '',
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({ title: '' })
			uni.setBackgroundColor({ backgroundColor: '#fafffc' })
			uni.setNavigationBarColor({ backgroundColor: '#44aa67' })
			this.from = option.from
			this.actualWeight = option.actualWeight
			if (this.from === 'order') {
				this.getGoodsList()
			}
		},
		onReachBottom() {
			if (!this.goodsRequest.over) {
				this.getGoodsList()
			}
		},
		methods: {
			// 获取商品列表
			getGoodsList() {
				this.goodsStatus = 'loading'
				this.goodsRequest.pageNum++
				this.$http.post('/recycle/goods/list', this.goodsRequest).then(res => {
					let rows = res.data.rows
					if (rows.length < this.goodsRequest.pageSize) {
						this.goodsRequest.over = true
					}
					if (rows.length > 0) {
						this.goodsList = this.goodsList.concat(rows)
					}
				}).catch(err => {
					this.goodsStatus = 'loadmore'
				}).finally(() => {
					this.goodsStatus = 'nomore'
				})
			},

			// 跳转到订单页
			toOrder() {
				if(this.from === 'pay') {
					uni.navigateBack({ delta: 1 })
				} else {
					uni.navigateBack({ delta: 3 })
				}
			},
			
			// 跳转到商品详情页
			toGoods(goodsID) {
				uni.navigateTo({ url: '/pages/goods/index?goodsID=' + goodsID + '&from=end' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}

	.top-background {
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 300rpx;
		background: #44aa67;
		z-index: -1;
	}
	
	.weight {
		margin-top: 30rpx;
		
		.number {
			font-family: PingFangSC-Semibold;
			font-size: 76rpx;
			color: #06180C;
		}
		
		.str {
			margin-left: 9rpx;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #06180C;
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
	
	.ok_img {
		width: 116rpx;
		height: 116rpx;
	}
</style>
