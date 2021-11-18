<template>
	<view class="cost" :style="{color: fontColor}">
		<text class="cost_sign">¥</text>
		<text class="cost_now" v-text="presentPrice"/>
		<text :style="{color: originalPriceColor}" class="cost_original" v-text="'原价' + originalPrice"/>
	</view>
</template>

<script>
	export default {
		props: {
			// 现价
			presentPrice : {
				type: [Number, String],
				default: 0
			},
			// 原价
			originalPrice: {
				type: [Number, String],
				default: 0
			},
			// 字体颜色
			fontColor: {
				type:String,
				default: '#ffffff'
			},
			// 原价字体颜色
			originalPriceColor: {
				type:String,
				default: '#ffffff'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cost {
		font-family: PingFangSC-Regular;
		letter-spacing: 0;
		
		&_sign {
			font-size: 30rpx;
			line-height: 30rpx;
		}
		
		&_now {
			margin-left: 8rpx;
			font-size: 76rpx;
			line-height: 54rpx;
		}
		
		&_original {
			margin-left: 8rpx;
			font-size: 20rpx;
			line-height: 30rpx;
		}
	}
</style>
