<template>
	<view class="flex_row">
		<view class="orderImg">
			<u-image width="100%" height="100%" :src="img" @click="toGoods"/>
			<view v-if="refundText != ''" class="refund flex_colum flex_ai_center flex_jc_center">
				<image src="@/static/tuikuan.png" />
				<text class="font_24 line_36">{{ refundText }}</text>
			</view>
		</view>
		<view style="flex: 1; margin-left: 16rpx;" class="flex_colum">
			<view class="flex_row flex_jc_between flex_ai_center">
				<text class="font_28 line_42 font_bold color_black" @click="toGoods">{{ goodsName }}</text>
				<view class="font_28 line_42">
					<text class="color_grey hx">{{ '¥' + hxPrice }}</text>
					<text style="margin-left: 8rpx;" class="color_black">¥0</text>
				</view>
			</view>
			<view style="margin-top: 4rpx;">
				<text  class="font_24 line_36 color_black">{{goodsType}}</text>
			</view>
			<view style="margin-top: 30rpx;">
				<s-tag width="92" height="36" text="付邮领" color="#43A668" fontColor="#43A668" />
			</view>
			<view style="flex: 1;" class="font_28 line_42 color_black flex_row flex_ai_end flex_jc_end">
				<text>{{ '运费：¥' + expressPrice }}</text>
				<text style="margin-left: 24rpx;">{{ '实付款：¥' + zfPrice }}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import sTag from '../s-tag'
	
	export default {
		components: {
			sTag
		},
		props: {
			// 商品图片
			img: String,
			// 商品名称
			goodsName: {
				type: String,
				default: '商品'
			},
			// 商品
			goodsType: {
				type: String,
				default: '一提'
			},
			// 划线价格
			hxPrice: {
				type: [String, Number],
				default: 30
			},
			// 运费
			expressPrice: {
				type: [String, Number],
				default: 10
			},
			// 支付价格
			zfPrice: {
				type: [String, Number],
				default: 10
			},
			// 退款
			refundText: {
				type: String,
				default: ''
			},
			goodsID: Number
		},
		methods:{
			toGoods(){
				uni.navigateTo({ url: '/pages/goods/index?goodsID=' + this.goodsID + '&from=shopping' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hx {
		text-decoration: line-through;
	}
	.orderImg {
		position: relative;
		width: 200rpx;
		height: 200rpx;
		border-radius: 30rpx;
		overflow: hidden;
		
		.refund {
			position: absolute;
			top: 0;
			left: 0;
			width: 200rpx;
			height: 200rpx;
			background: rgba($color: #000000, $alpha: 0.5);
			
			&>image {
				width: 80rpx;
				height: 80rpx
			}
			
			&>text {
				margin-top: 8rpx;
				color: #FFFFFF;
			}
		}
	}
</style>
