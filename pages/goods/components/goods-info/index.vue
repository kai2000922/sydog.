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
			// 运费价格
			expressPrice: [String, Number],
			// 原价
			originalPrice: [String, Number],
			// 现价
			presentPrice: [String, Number],
			// 商品名称
			goodsName: String,
			// 是否显示tag
			tagShow: Boolean,
			// 是否显示原价
			originalPriceShow: Boolean
		}
	}
</script>

<style lang="scss" scoped>
</style>
