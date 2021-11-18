<template>
	<s-panel>
		<view class="flex_colum">
			<view class="flex_row flex_jc_between flex_ai_center">
				<freight :freight="expressPrice" />
				<text class="font_24 color_grey line_36">65598人已换</text>
			</view>
			<view style="margin-top: 24rpx;">
				<text class="font_36 color_black line_54 font_bold">{{goodsName}}</text>
			</view>
		</view>
	</s-panel>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import freight from '../freight'

	export default {
		components: {
			sPanel,
			freight
		},
		props: {
			expressPrice: [String, Number],
			goodsName: String
		}
	}
</script>

<style lang="scss" scoped>
</style>
