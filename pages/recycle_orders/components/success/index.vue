<template>
	<view class="flex_colum flex_jc_center flex_ai_center">
		<text style="margin-top: 56rpx;" class="font_36 line_54 color_black font_bold">订单完成啦!</text>
		<text class="font_24 line_36 font_bold color_black">本次回收旧衣物</text>
		<view class="weight flex_row flex_ai_center flex_jc_center">
			<span class="weight_left" />
			<view class="flex_row flex_ai_center">
				<text class="number">{{ actualWeight }}</text>
				<text class="str">公斤</text>
			</view>
			<span class="weight_right" />
		</view>
		<s-button
			background="#43A668" 
			width="600" 
			height="120" 
			color="#FFFFFF" 
			:custom-style="{margin: '30rpx auto 0 auto'}"
			text="去兑换好礼 GO"
			@click="click"/>
	</view>
</template>

<script>
	import sButton from '@/components/pages/s-button'
	export default {
		components: {
			sButton
		},
		props: {
			actualWeight: [String, Number]
		},
		methods: {
			click() {
				this.$emit('sto')
			}
		}
	}
</script>

<style lang="scss" scoped>
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
</style>
