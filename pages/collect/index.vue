<template>
	<view class="container">
		<view class="top-background"/>
		<step step-style="padding: 63rpx 0;" :dataList="stepList" />
		
		<s-panel>
			<view class="ok">
				<image class="ok_img" src="@/static/ok.png"></image>
				<text class="ok_title">预约旧衣回收成功</text>
				<text class="ok_tips">快递员将按您要求的时间上门</text>
				<s-button
					width="600"
					height="120"
					text="查看订单"
					:custom-style="{border: '1px solid #43A668', marginTop: '40rpx', marginBottom: '10rpx'}"
					color="#43A668"
					@click="toRecycleOrders"/>
			</view>
		</s-panel>
		
		<s-panel>
			<view class="weigh">
				<view class="weigh_title_row">
					<text class="weigh_title_row_title">旧衣称重公斤数</text>
					<text class="weigh_title_row_weigh">暂未称重</text>
				</view>
				<view class="weigh_tips">
					<text>上门取件后，12小时内可显示称重公斤数哦！</text>
				</view>
			</view>
		</s-panel>
		
		<s-panel>
			<view class="title_row">
				<text class="title">兑换好礼专区</text>
				<text class="extra">称重后即可兑换</text>
			</view>
			<s-goods item-type="2" 
				:goods-list="goodsList" 
				:item-style="{paddingTop: '56rpx'}" 
				@itemClick="toGoodPage"/>
			<u-loadmore margin-top="20" :status="goodsStatus" />
		</s-panel>
	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	import sGoods from '@/components/pages/s-goods'
	
	export default {
		components: {
			step,
			sPanel,
			sButton,
			sGoods
		},
		data() {
			return {
				from: '',
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
						choice: true,
						title: '上门取衣',
						subTitle: '免费上门0运费'
					},
					{
						index: '03',
						span: '4',
						choice: false,
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
				goodsStatus: 'loading'
			}
		},
		onLoad(option) {
			this.from = option.from
		},
		created() {
			this.getGoodsList()
		},
		onReachBottom() {
			if(!this.goodsRequest.over) {
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
					if(rows.length < this.goodsRequest.pageSize) {
						this.goodsRequest.over = true
					}
					if(rows.length > 0) {
						this.goodsList = this.goodsList.concat(rows)
					}
				}).finally(() => {
					console.log(this.goodsList);
					this.goodsStatus = 'nomore'
				})
			},
			
			toGoodPage(goods){
				uni.navigateTo({
					url:'/pages/goods/goods?goodID=' + goods.goodID + '&buy=2'
				})
			},
			
			toRecycleOrders() {
				if(this.from === 'recycle_order') {
					uni.navigateBack({
					    delta: 1
					});
				} else {
					uni.navigateTo({
						url:'/pages/recycle_orders/recycle_orders'
					})
				}
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
		
		&_btn {
			margin-top: 40rpx;
			margin-bottom: 10rpx;
			width: 600rpx;
			height: 120rpx;
			border: 1rpx solid #43A668;
			border-radius: 60rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: #43A668;
			letter-spacing: 0;
			text-align: center;
			line-height: 118rpx;
		}
	}
	
	.weigh {
		display: flex;
		flex-direction: column;
		
		&_title_row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			&_title {
				flex: 1;
				display: flex;
				align-items: center;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 54rpx;
				
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
			
			&_weigh {
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: #43A668;
				letter-spacing: 0;
				line-height: 54rpx;
			}
		}
		
		&_tips {
			margin-top: 8rpx;
			padding-left: 32rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #B0B7B3;
			letter-spacing: 0;
			line-height: 36rpx;
		}
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
	
	
</style>
