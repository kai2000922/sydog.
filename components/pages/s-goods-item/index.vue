<template>
	<view :style="[customStyle]" class="s_gd_item">
		<view class="s_gd_item_img">
			<image src="https://picsum.photos/300/200"></image>
		</view>
		<view>
			<text class="s_gd_item_name">布婷4层卷纸｜2提装</text>
			<view class="s_gd_item_con">
				<text class="s_gd_item_con_price">价值¥30</text>
				<text class="s_gd_item_con_man">99999+人已换</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 自定义样式
			customStyle: {
				type: Object,
				default: () => {}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s_gd_item {
		width: 300rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		font-family: PingFangSC-Regular;
		
		&_img {
			width: 300rpx;
			height: 200rpx;
			margin-bottom: 10rpx;
			background: #D8D8D8;
			border-radius: 30rpx;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		&_name {
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
		}
		
		&_con {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 24rpx;
			line-height: 36rpx;
			letter-spacing: 0;
			
			&_price {
				color: #06180C;
			}
			
			&_man {
				color: #B0B7B3;
			}
		}
	}
</style>
