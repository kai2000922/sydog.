<template>
	<view class="flow">
		<view class="flow_top">
			<view class="title">
				<image src="@/static/lcTitle.png"/>
				<text class="card_right_text">*无需承担任何费用</text>
			</view>
			<view class="main">
				<image mode="widthFix" src="@/static/liucheng.png"/>
			</view>
		</view>
		
		<view class="flow_bottom">
			<image mode="widthFix" src="@/static/hsl.png"/>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.flow {
		margin: 30rpx;
		position: relative;
		border-radius: 40rpx;
		box-shadow: 0 1rpx 24rpx 0 #E8F0EB;
		
		&_top {
			padding: 30rpx 30rpx 24rpx 30rpx;
			border-radius: 40rpx 40rpx 0 0;
			background: #FFFFFF;
			
			.title {
				display: flex;
				align-items: center;
				justify-content: flex-end;
				
				&>image {
					position: absolute;
					left: -20rpx;
					width: 273rpx;
					height: 54rpx;
					vertical-align: middle;
				}
			}
			
			.main {
				margin-top: 30rpx;
				width: 100%;
				
				&>image {
					width: 100%;
				}
			}
		}
		
		&_bottom {
			padding: 15rpx 40rpx;
			background: rgba(48,187,99,0.11);
			border-radius: 0 0 40rpx 40rpx;
			overflow: hidden;
			
			&>image {
				width: 100%;
				
			}
		}
	}
</style>
