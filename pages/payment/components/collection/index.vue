<template>
	<view class="collection">
		<view class="left">
			<view class="text_bottom">
				<text class="left_text">合计：</text>
				<text class="left_text">¥</text>
				<text class="left_text price">9.9</text>
			</view>
		</view>
		<view class="right">
			<button>立即支付</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.collection {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: PingFangSC-Regular;
		
		.left {
			flex: 1;
			display: flex;

			justify-content: center;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			
			.text_bottom {
				display: table-cell;
				vertical-align: bottom;
			}
			
			&_text {
				margin: 0!important;
				padding: 0!important;
			}
			
			.price {
				margin-left: 4rpx;
				font-size: 46rpx;
				font-weight: bold;
			}
		}
		
		.right {
			&>button {
				width: 360rpx;
				height: 120rpx;
				background: #43A668;
				border-radius: 60rpx;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				line-height: 120rpx;
			}
		}
	}
</style>
