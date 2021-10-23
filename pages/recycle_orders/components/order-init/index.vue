<template>
	<view class="order">
		<view class="order_title_row">
			<text>旧衣上门回收</text>
			<text v-if="!cancel" class="order_title_row_tips1">您无须承担任何费用</text>
			<text v-if="cancel" class="order_title_row_tips2">已取消</text>
		</view>
		<view class="order_row2">
			<image src="@/static/men.png"></image>
			<text>上门取件时间：</text>
		</view>
		<view class="order_row3" :class="cancel ? 'color_cancel' : 'color_normal'">
			<view class="order_row3_row1">
				<text>9月24日 周六</text>
			</view>
			<view class="order_row3_row2">
				<text>10:00 ~ 11:00 上门取件</text>
				<button v-if="!cancel" @click="click">修改时间</button>
			</view>
		</view>
		<view class="order_row2">
			<image src="@/static/kuaidiyuan.png"></image>
			<text>取件员联系方式：</text>
			<view v-if="cancel" class="order_row2_cancel"></view>
		</view>
		<view class="order_row4" :class="cancel ? 'color_cancel' : 'color_normal'">
			<text>取件当天，会展示出取件员的信息哦~</text>
		</view>
		<dot-line :height="20" 
				:itemNumber="25" 
				:customStyle="{marginRight: '-30rpx', marginLeft: '-46rpx', marginTop: '46rpx'}"
				:lineStyle="{background: cancel ? '#B0B7B3' : '#43A668'}"/>
		<view class="order_row2">
			<image src="@/static/dingdan.png"></image>
			<text>订单信息</text>
		</view>
		<view class="order_row5">
			<view class="order_row5_address">
				<view>
					<text>取件地址：</text>
					<text>北京市西城区槐柏树街南里8号楼12单元1098室</text>
				</view>
				<text>李二 18827767866</text>
			</view>
			<view class="order_row5_btn" >
				<button @click="click" v-if="!cancel">修改地址</button>
			</view>
		</view>
		<view class="order_row6">
			<view>
				<label>下单时间：</label>
				<text>2021-9-20 8:00</text>
			</view>
			<view>
				<label>订单编号：</label>
				<text>1289767657VGH27786</text>
				<text style="margin-left: 16rpx;">复制</text>
			</view>
		</view>
		<view class="order_row7" v-if="!cancel">
			<button>能换哪些好礼？</button>
		</view>
		<view class="order_row8" v-if="!cancel">
			<text>取消订单</text>
		</view>
	</view>
</template>

<script>
	import dotLine from '@/components/pages/s-dot-line'
	
	export default {
		components: {
			dotLine
		},
		data() {
			return {
				cancel: false
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.color_normal {
		color: $s_font_color;
	}
	
	.color_cancel {
		color: #B0B7B3;
	}
	.order {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 30rpx 30rpx 0rpx 30rpx;
		padding: 30rpx 30rpx 30rpx 46rpx;
		background: #ffffff;
		box-shadow: 0 1rpx 24rpx 0 #E8F0EB;
		border-radius: 40rpx;
		
		&_title_row {
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&>text:first-child {
				display: flex;
				align-items: center;
				margin-left: -8rpx;
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
			
			&_tips1 {
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				font-weight: bolder;
				color: #43A668;
				letter-spacing: 0;
				text-align: right;
				line-height: 42rpx;
			}
			
			&_tips2 {
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				font-weight: bold;
				color: #B0B7B3;
				letter-spacing: 0;
				text-align: right;
				line-height: 42rpx;
			}
		}
		
		&_row2 {
			margin-top: 40rpx;
			position: relative;
			display: flex;
			align-items: center;
			
			&>image {
				width: 40rpx;
				height: 40rpx;
				vertical-align: middle;
			}
			
			&>text {
				margin-left: 16rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 40rpx;
			}
			
			&_cancel {
				position: absolute;
				width: 150rpx;
				height: 131rpx;
				right: 20rpx;
				background: #007AFF;
				
			}
		}
		
		&_row3 {
			margin-top: 20rpx;
			display: flex;
			flex-direction: column;
			
			text {
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				letter-spacing: 0;
				line-height: 54rpx;
			}
			
			&_row2 {
				display: flex;
				justify-content: space-between;
				
				&>button {
					box-sizing: border-box;
					width: 160rpx;
					height: 56rpx;
					border: 1rpx solid #707070;
					border-radius: 28rpx;
					font-family: PingFangSC-Semibold;
					font-size: 28rpx;
					font-weight: bold;
					color: $s_font_color;
					letter-spacing: 0;
					text-align: center;
					line-height: 54rpx;
				}
			}
		}
		
		&_row4 {
			margin-top: 29rpx;
			display: flex;
			justify-content: space-between;
			
			&>text {
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				font-weight: bold;
				letter-spacing: 0;
				line-height: 42rpx;
			}
		}
		
		&_row5 {
			margin-top: 19rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			
			&_address {
				display: flex;
				flex-direction: column;
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: #7F8581;
				letter-spacing: 0;
				line-height: 36rpx;
			}
			
			&_btn {
				display: flex;
				align-items: center;
				margin-left: 46rpx;
				
				&>button {
					width: 160rpx;
					height: 56rpx;
					border: 1rpx solid #707070;
					border-radius: 28rpx;
					font-family: PingFangSC-Semibold;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
					text-align: center;
					line-height: 54rpx;
				}
			}
		}
		
		&_row6 {
			margin-top: 24rpx;
			display: flex;
			flex-direction: column;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #7F8581;
			letter-spacing: 0;
			line-height: 36rpx;
		}
		
		&_row7 {
			margin-top: 40rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			
			&>button {
				box-sizing: border-box;
				width: 600rpx;
				height: 120rpx;
				border: 1rpx solid #43A668;
				border-radius: 60rpx;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: #43A668;
				letter-spacing: 0;
				text-align: center;
				line-height: 118rpx;
			}
		}
		
		&_row8 {
			margin-top: 24rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #B0B7B3;
			letter-spacing: 0;
			text-align: center;
			line-height: 36rpx;
		}
		
	}
</style>
