<template>
	<view class="cost" :style="{color: fontColor}">
		<text class="cost_sign">¥</text>
		<text class="cost_now" v-text="presentPrice"/>
		<text v-if="originalPriceShow" :style="{color: originalPriceColor}" class="cost_original" v-text="'原价' + originalPrice"/>
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
				default: '#06180C'
			},
			// 原价字体颜色
			originalPriceColor: {
				type:String,
				default: '#B0B7B3'
			},
			// 原价显示
			originalPriceShow: {
				type: Boolean,
				default: false
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
			font-size: 24rpx;
			line-height: 30rpx;
			text-decoration: line-through;
		}
	}
</style>
