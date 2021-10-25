<template>
	<view class="freight" :style="customStyle">
		<view class="freight_tag" v-text="tag"/>
		<text class="freight_freight" v-text="'需支付运费' + freight + '元'"/>
	</view>
</template>

<script>
	export default {
		props: {
			tag: {
				type: String,
				default: '付邮领'
			},
			freight: {
				type: [String, Number],
				default: '9.9'
			},
			customStyle: {
				type: Object,
				default: () => {return {}}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.freight {
		display: flex;
		align-items: center;
	
		&_tag {
			width: 92rpx;
			height: 32rpx;
			box-sizing: border-box;
			border: 1rpx solid #43A668;
			border-radius: 16rpx;
			text-align: center;
			font-family: PingFangSC-Regular;
			font-size: 20rpx;
			color: #43A668;
			letter-spacing: 0;
			line-height: 30rpx;
		}
	
		&_freight {
			margin-left: 8rpx;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #43A668;
			letter-spacing: 0;
			line-height: 42rpx;
		}
	}
</style>
