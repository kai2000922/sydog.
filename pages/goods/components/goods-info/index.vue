<template>
	<s-panel>
		<view class="flex_colum">
			<!-- 商品名称 -->
			<text class="font_36 color_black line_54 font_bold">{{ goodsName }}</text>
			<!-- 价格 -->
			<view style="margin: 30rpx 0;">
				<cost :original-price="originalPrice" :present-price="presentPrice" :original-price-show="originalPriceShow"></cost>
			</view>
			<view>
				<freight :freight="expressPrice" :tag-show="tagShow"/>
			</view>
		</view>
	</s-panel>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import freight from '../freight'
	import cost from '../cost'

	export default {
		components: {
			sPanel,
			freight,
			cost
		},
		props: {
			expressPrice: [String, Number],
			originalPrice: [String, Number],
			presentPrice: [String, Number],
			goodsName: String,
			tagShow: Boolean,
			originalPriceShow: Boolean
		}
	}
</script>

<style lang="scss" scoped>
</style>
