<template>
	<view class="head flex_colum">
		<view class="goodsImg">
			<u-image width="100%" height="100%" :src="img" />
		</view>
		<view class="goodsInfo flex_colum">
			<view class="describe flex_row flex_jc_between flex_ai_center">
				<text>环保回收专享价</text>
			</view>
			<view class="flex_row flex_jc_between flex_ai_center" style="margin-top: 20rpx;">
				<cost present-price="0" :original-price="hxPrice" />
			</view>
		</view>
	</view>
</template>

<script>
	import cost from '../cost'

	export default {
		components: {
			cost
		},
		props: {
			img: String,
			hxPrice: [String, Number]
		}
	}
</script>

<style lang="scss" scoped>
	.head {
		.goodsImg {
			height: 750rpx;
			width: 750rpx;
		}

		.goodsInfo {
			padding: 30rpx;
			background: #43A668;

			.describe {
				font-family: PingFangSC-Semibold;
				font-size: 24rpx;
				color: #FFFFFF;
				letter-spacing: 0;
				line-height: 36rpx;
			}

			.constraint {
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				color: #FFFFFF;
				letter-spacing: 0;
				line-height: 54rpx;
			}
		}
	}
</style>
