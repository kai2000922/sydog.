<template>
	<view class="order">
		<text class="order_title">旧衣上门回收</text>
		<text class="order_situation">订单完成啦!</text>
		<text class="order_label">本次回收旧衣物</text>
		<view class="order_weight">
			<span class="order_weight_left" />
			<view class="order_weight_words">
				<text>8.0</text>
				<text>公斤</text>
			</view>
			<span class="order_weight_right" />
		</view>
		<text class="order_exchange">可兑换5kg～8kg的专属好礼！</text>
		<view>
			<button class="order_button">已兑换，去查看好礼订单！</button>
		</view>
		<dot-line :height="20" :itemNumber="25" :customStyle="{marginRight: '-30rpx', marginLeft: '-30rpx', marginTop: '40rpx'}"/>
		<view class="order_order">
			<view class="order_order_title">
				<image src="@/static/dingdan.png"></image>
				<text>订单信息</text>
			</view>
			<view class="order_order_info">
				<view>
					<label>取件地址：</label>
					<text>北京市西城区槐柏树街南里8号楼12单元1098室</text>
				</view>
				<view>
					<label>李二 18827767866</label>
				</view>
				<view>
					<label>取件时间：</label>
					<text>9月24日 10:00~11:00</text>
				</view>
				<view>
					<label>取件员：</label>
					<text>圆通速递 | 李明 18801146821、</text>
				</view>
				<view>
					<label>下单时间：</label>
					<text>2021-9-20 8:00</text>
				</view>
				<view>
					<label>订单编号：</label>
					<text>1289767657VGH27786</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import dotLine from '@/components/pages/s_dot_line'
	
	export default {
		components: {
			dotLine
		}
	}
</script>

<style lang="scss" scoped>
	.order {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx;
		background: $s_color_white;
		box-shadow: 0 1px 24px 0 #E8F0EB;
		border-radius: 40rpx;
	
		&_title {
			display: flex;
			align-items: center;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			font-weight: bolder;
			color: $s_font_color;
			letter-spacing: 0;
			line-height: 36rpx;
	
			&::before {
				content: '';
				display: block;
				margin-right: 8rpx;
				width: 8rpx;
				height: 8rpx;
				border-radius: 4rpx;
				background: #FA9E19;
			}
		}
	
		&_situation {
			margin-top: 66rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bolder;
			color: $s_font_color;
			text-align: center;
			letter-spacing: 0;
			line-height: 54rpx;
		}
	
		&_label {
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: $s_font_color;
			letter-spacing: 0;
			text-align: center;
			line-height: 36rpx;
		}
	
		&_weight {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&_words {
				display: flex;
				align-items: center;
				
				&>text:first-child {
					font-family: PingFangSC-Semibold;
					font-size: 76rpx;
					color: $s_font_color;
					letter-spacing: 0;
				}
			
				&>text:last-child {
					margin-left: 9rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
				}
			}
			
			&_left {
				margin-right: 40rpx;
				display: block;
				width: 150rpx;
				height: 10rpx;
				background-image: linear-gradient(270deg, #43A668 0%, rgba(67,166,104,0.00) 100%);
				border-radius: 5rpx;
			}
			
			&_right {
				margin-left: 40rpx;
				display: block;
				width: 150rpx;
				height: 10rpx;
				background-image: linear-gradient(270deg, rgba(67,166,104,0.00) 0%, #43A668 100%);
				border-radius: 5rpx;
			}
		}
		
		&_exchange {
			margin-top: 38rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #43A668;
			letter-spacing: 0;
			text-align: center;
			line-height: 36rpx;
		}
		
		&_button {
			margin: 30rpx auto 0 auto;
			width: 600rpx;
			height: 120rpx;
			border: 1rpx solid #707070;
			border-radius: 60rpx;
			font-family: PingFangSC-Regular;
			font-size: 36rpx;
			color: $s_font_color;
			letter-spacing: 0;
			line-height: 120rpx;
		}
		
		&_order {
			margin-top: 40rpx;
			
			&_title {
				&>image {
					width: 40rpx;
					height: 40rpx;
					vertical-align: middle
				}
				
				&>text {
					margin-left: 16rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
					line-height: 42rpx;
				}
			}
			
			&_info {
				margin-top: 20rpx;
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: #B0B7B3;
				letter-spacing: 0;
				line-height: 36rpx;
			}
		}
	}
</style>
