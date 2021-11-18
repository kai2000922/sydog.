<template>
	<s-panel>
		<view class="flex_row flex_jc_between flex_ai_center" style="margin: 30rpx 0 30rpx 0;" @click="click">
			<view class="flex_row flex_ai_center">
				<s-dot size="16"/>
				<text style="margin-left: 16rpx;" class="font_36 font_bold line_54 color_black">{{ '选择商品规格：' + label }}</text>
			</view>
			<view class="arrow_right">
				<image src="@/static/arrow-right.png"/>
			</view>
		</view>
	</s-panel>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sDot from '@/components/pages/s-dot'
	
	export default {
		components: {
			sPanel,
			sDot
		},
		props: {
			label: {
				type: String,
				default: ''
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.arrow_right {
		width: 40rpx;
		height: 40rpx;
		
		&>image {
			width: 100%;
			height: 100%;
			vertical-align: middle;
		}
	}
</style>
