<template>
	<s-panel>
		<view class="pickup">
			<view class="main">
				<image class="main_che" src="@/static/che.png"/>
				<view class="main_content">
					<text class="placeholder">+添加收货地址</text>
					<!-- <view class="contact">
						<text class="man">李一</text>
						<text class="phone">18801146821</text>
					</view>
					<text class="address">北京市西城区槐柏树街南里8-12-002 </text> -->
				</view>
			</view>
			<image class="right" src="@/static/arrow-right.png"/>
		</view>
		<s-dot-line :height="20"
					:itemNumber="25"
					:customStyle="{position: 'absolute', bottom: 0, left: 0, right: 0}"
					:line-style="{opacity: 0.7, background: '#43A668'}"/>
	</s-panel>
</template>

<script>
	import SPanel from '@/components/pages/s-panel'
	import SDotLine from '@/components/pages/s-dot-line'
	
	export default {
		components: {
			SPanel,
			SDotLine
		}
	}
</script>

<style lang="scss" scoped>
	.pickup {
		position: relative;
		padding: 22rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.main {
			display: flex;
			align-items: center;
			
			&_che {
				margin-left: 22rpx;
				margin-right: 32rpx;
				width: 64rpx;
				height: 64rpx;
			}
			
			&_content {
				display: flex;
				flex-direction: column;
				
				.placeholder {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #06180C;
					letter-spacing: 0;
				}
				
				.contact {
					display: flex;
					align-items: center;
					
					.man {
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						color: #06180C;
						letter-spacing: 0;
					}
					
					.phone {
						padding-left: 8rpx;
						font-family: PingFangSC-Regular;
						font-size: 24rpx;
						color: #06180C;
						letter-spacing: 0;
					}
				}
				
				.address {
					margin-top: 7rpx;
					font-family: PingFangSC-Regular;
					font-size: 24rpx;
					color: #06180C;
					letter-spacing: 0;
				}
			}
		}
		
		&>image {
			vertical-align: middle;
		}
		
		.right {
			width: 40rpx;
			height: 40rpx;
		}
		
	}
</style>
