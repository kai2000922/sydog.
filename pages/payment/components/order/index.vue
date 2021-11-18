<template>
	<s-panel>
		<view class="top">
			<view class="top_img">
				<u-image :src="img" height="100%" width="100%"/>
			</view>
			<view class="top_content">
				<text class="title">{{ goodsName }}</text>
				<text class="info">{{ goodsDescribe }}</text>
			</view>
		</view>
		<view class="main">
			<view class="main_item">
				<text class="name">商品价格</text>
				<view class="price">
					<text class="price_original">{{ '¥' + hxPrice }}</text>
					<text class="price_now">¥0</text>
				</view>
			</view>
			<view class="main_item">
				<text class="name">运费</text>
				<text>{{ '¥' + expressPrice }}</text>
			</view>
			<view class="main_item">
				<text class="name">享受优惠</text>
				<s-tag/>
			</view>
		</view>
		<view class="bottom">
			<text class="xiaoji">小计：</text>
			<text>{{ '¥' + zfPrice }}</text>
		</view>
	</s-panel>
</template>

<script>
	import SPanel from '@/components/pages/s-panel'
	import sTag from '@/components/pages/s-tag'
	import { BASE_URL } from '@/utils/request.js'
	
	export default {
		components: {
			SPanel,
			sTag
		},
		props: {
			goods: Object,
			img: String,
			goodsName: {
				type: String,
				default: '商品'
			},
			goodsDescribe: {
				type: String,
				default: '描述'
			},
			hxPrice: {
				type: [Number, String],
				default: 30
			},
			expressPrice: {
				type: [Number, String],
				default: 10
			},
			zfPrice: {
				type: [Number, String],
				default: 10
			}
		},
		data() {
			return {
				baseUrl: ''
			}
		},
		created() {
			this.baseUrl = BASE_URL
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		display: flex;
		
		&_img {
			width: 200rpx;
			height: 200rpx;
			border-radius: 30rpx;
			overflow: hidden;
		}
		
		&_content {
			padding-left: 16rpx;
			flex: 1;
			display: flex;
			flex-direction: column;
			font-family: PingFangSC-Regular;
			
			.title {
				font-size: 28rpx;
				font-weight: bold;
				color: #06180C;
				letter-spacing: 0;
				line-height: 42rpx;
			}
			
			.info {
				margin-top: 4rpx;
				font-size: 24rpx;
				// font-weight: bold;
				color: #06180C;
				letter-spacing: 0;
				line-height: 36rpx;
			}
		}
	}
	.main {
		display: flex;
		flex-direction: column;
		
		&_item {
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
			
			.name {
				width: 200rpx;
				text-align: end;
			}
			
			.price {
				&_original {
					text-decoration: line-through;
					color: #B0B7B3;
				}
				
				&_now {
					margin-left: 8rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 50rpx;
		text-align: end;
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		font-weight: bold;
		color: #06180C;
		letter-spacing: 0;
		line-height: 42rpx;
	}
</style>
