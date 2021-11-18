<template>
	<view class="flex_row flex_ai_center">
		<view class="goodsImg">
			<u-image :src="img" width="100%" height="100%" />
		</view>
		<view style="margin-left: 18rpx;">
			<cost present-price="0" :original-price="hxPrice" font-color="#06180C"
				original-price-color="#B0B7B3" />
			<freight :custom-style="{marginTop: '25rpx'}" :freight="expressPrice" />
		</view>
	</view>
</template>

<script>
	import freight from '../freight'
	import cost from '../cost'

	export default {
		components: {
			freight,
			cost
		},
		props: {
			img: {
				type: String,
				default: ''
			},
			hxPrice: {
				type: [String, Number],
				default: '30'
			},
			expressPrice: {
				type: [String, Number],
				default: '9.9'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goodsImg {
		width: 200rpx;
		height: 200rpx;
		border-radius: 30rpx;
		overflow: hidden;
	}
</style>
