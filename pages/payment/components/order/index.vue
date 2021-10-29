<template>
	<s-panel>
		<view class="top">
			<view class="top_img">
				<u-image src="https://picsum.photos/seed/picsum/200/200" height="100%" width="100%"/>
			</view>
			<view class="top_content">
				<text class="title">布婷4层卷纸｜2提装</text>
				<text class="info">2提装</text>
			</view>
		</view>
		<view class="main">
			<view class="main_item">
				<text class="name">商品价格</text>
				<view class="price">
					<text class="price_original">¥30</text>
					<text class="price_now">¥0</text>
				</view>
			</view>
			<view class="main_item">
				<text class="name">运费</text>
				<text>¥9.9</text>
			</view>
			<view class="main_item">
				<text class="name">享受优惠</text>
				<tag/>
			</view>
		</view>
		<view class="bottom">
			<text class="xiaoji">小计：</text>
			<text>¥9.9</text>
		</view>
	</s-panel>
</template>

<script>
	import SPanel from '@/components/pages/s-panel'
	import Tag from '../tag'
	
	export default {
		components: {
			SPanel,
			Tag
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
				font-weight: bold;
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
