<template>
	<view class="container">
		<view class="top-background" />
		<step step-style="padding: 63rpx 0;" :dataList="stepList" />

		<view class="buynow" v-if="from === 'order'">
			<s-panel :custom-style="{
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				margin: '30rpx 30rpx 0rpx 30rpx'}">
				<text class="buynow_situation">订单完成啦!</text>
				<text class="buynow_label">本次回收旧衣物</text>
				<view class="buynow_weight">
					<span class="buynow_weight_left" />
					<view class="buynow_weight_words">
						<text>8.0</text>
						<text>公斤</text>
					</view>
					<span class="buynow_weight_right" />
				</view>
				<!-- <text class="buynow_exchange">可兑换5kg～8kg的专属好礼！</text> -->
			</s-panel>

			<s-panel>
				<view class="title_row">
					<text class="title">兑换好礼专区</text>
					<!-- <text class="extra">称重后即可兑换</text> -->
				</view>
				<s-goods item-type="3" :goods-list="goodsList" :item-style="{paddingTop: '56rpx'}"
					@itemClick="toGoodPage" />
				<u-loadmore margin-top="40" :status="goodsStatus" />
			</s-panel>
		</view>

		<view v-else>
			<s-panel>
				<view class="ok">
					<image class="ok_img" src="@/static/ok.png"></image>
					<text class="ok_title">支付成功</text>
					<text class="ok_tips">我们将在48小时内为您发货</text>
				</view>
			</s-panel>

			<view class="btn_view">
				<!-- <button>已兑换，去查看好礼订单！</button> -->
				<s-button
					width="600"
					height="120"
					text="已兑换，去查看好礼订单！"
					:custom-style="{border: '1rpx solid #707070'}"
					background="rgba(0, 0 ,0 , 0)"
					color="#06180C"
					@click="toOrder"
				/>
			</view>
		</view>



	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sPanel from '@/components/pages/s-panel'
	import sGoods from '@/components/pages/s-goods'
	import sButton from '@/components/pages/s-button'

	import api from '@/utils/api.js'

	export default {
		components: {
			step,
			sPanel,
			sGoods,
			sButton
		},
		data() {
			return {
				stepList: [{
						index: '01',
						span: '4',
						choice: false,
						title: '预约回收',
						subTitle: '提交信息'
					},
					{
						index: '02',
						span: '4',
						choice: false,
						title: '上门取衣',
						subTitle: '免费上门0运费'
					},
					{
						index: '03',
						span: '4',
						choice: true,
						title: '换好礼',
						subTitle: '付邮领取'
					}
				],
				goodsRequest: {
					pageSize: 10,
					pageNum: 0,
					over: false
				},
				goodsList: [],
				goodsStatus: 'loading',
				from: ''
			}
		},
		onLoad(option) {
			uni.setNavigationBarColor({
				backgroundColor: '#FFFFFF'
			})
			this.from = option.from
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
				}).finally(() => {
					this.goodsStatus = 'nomore'
				})
			},

			// 跳转到商品详情页
			toGoodPage(goods) {
				uni.navigateTo({
					url:'/pages/goods/goods?goodID=' + goods.goodID + '&buy=3'
				})
			},
			
			// 跳转到订单页
			toOrder() {
				uni.navigateBack({ delta: 3 })
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

	.buynow {
		display: flex;
		flex-direction: column;
		justify-content: center;

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
				background-image: linear-gradient(270deg, #43A668 0%, rgba(67, 166, 104, 0.00) 100%);
				border-radius: 5rpx;
			}

			&_right {
				margin-left: 40rpx;
				display: block;
				width: 150rpx;
				height: 10rpx;
				background-image: linear-gradient(270deg, rgba(67, 166, 104, 0.00) 0%, #43A668 100%);
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

		.title_row {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.title {
				flex: 1;
				display: flex;
				align-items: center;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: #06180C;
				letter-spacing: 0;

				&::before {
					content: '';
					display: block;
					margin-right: 16rpx;
					width: 16rpx;
					height: 16rpx;
					border-radius: 8rpx;
					background: #FA9E19;
				}
			}

			.extra {
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				font-weight: bold;
				color: #43A668;
				letter-spacing: 0;
			}
		}
	}

	.ok {
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&_img {
			width: 116rpx;
			height: 116rpx;
		}

		&_title {
			margin-top: 24rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: $s_font_color;
			letter-spacing: 0;
			line-height: 54rpx;
		}

		&_tips {
			margin-top: 8rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #B0B7B3;
			letter-spacing: 0;
			line-height: 36rpx;
		}
	}

	.btn_view {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		&>button {
			box-sizing: border-box;
			width: 600rpx;
			height: 120rpx;
			border: 1rpx solid #707070;
			background: rgba($color: #000000, $alpha: 0);
			border-radius: 60rpx;
			font-family: PingFangSC-Regular;
			font-size: 36rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			text-align: center;
			line-height: 118rpx;
		}
	}
</style>
