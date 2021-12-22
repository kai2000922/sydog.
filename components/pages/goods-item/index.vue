<template>
	<view class="item flex_colum" :style="customStyle" @click="click">
		<view class="image_box">
			<u-image :src="getImgUrl(item.images)" width="100%" height="100%" />
		</view>

		<view class="title">{{ item.goodsName }}</view>

		<view class="flex_row flex_jc_between flex_ai_center" style="width: 100%; margin-top: 4rpx;">
			<text class="price">{{ '价值¥' + item.hxPrice }}</text>
			<text class="people">99999+人已换</text>
		</view>
	</view>
</template>

<script>
	import {getImgUrl} from '@/utils/common.js'

	export default {
		props: {
			item: Object,
			customStyle: Object
		},
		data() {
			return {
				getImgUrl: getImgUrl
			}
		},
		methods: {
			click() {
				this.$emit('goodsClick', this.item.goodID)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		width: 300rpx;
		height: 300rpx;

		.image_box {
			width: 300rpx;
			height: 200rpx;
			background: #D8D8D8;
			border-radius: 30rpx;
			overflow: hidden;
		}

		.title {
			width: 100%;
			margin-top: 16rpx;
			font-family: PingFangSC-Semibold;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.price {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #06180C;
			letter-spacing: 0;
			line-height: 36rpx;
		}

		.people {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #B0B7B3;
			letter-spacing: 0;
			line-height: 36rpx;
		}
	}
</style>
