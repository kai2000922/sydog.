<template>
	<view>
		<view class="top-background"/>
		<step step-style="padding: 63rpx 0;" :dataList="stepList" />
		
		<s-panel>
			<view class="ok">
				<image class="ok_img" src="@/static/ok.png"></image>
				<text class="ok_title">支付成功</text>
				<text class="ok_tips">我们将在48小时内为您发货</text>
			</view>
		</s-panel>
		
		<view class="btn_view">
			<button>已兑换，去查看好礼订单！</button>
		</view>
	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sPanel from '@/components/pages/s-panel'
	
	export default {
		components: {
			step,
			sPanel
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
			}
		},
		onLoad() {
			uni.setNavigationBarColor({ backgroundColor: '#FFFFFF' })
		}
	}
</script>

<style lang="scss" scoped>
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
			background: rgba($color: #000000, $alpha: 0);;
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
