<template>
	<view class="order">
		<view class="order_title_row">
			<text>旧衣上门回收</text>
			<text v-if="!cancel" class="order_title_row_tips1">您无须承担任何费用</text>
			<text v-if="cancel" class="order_title_row_tips2">已取消</text>
		</view>
		<view class="order_row2">
			<image src="@/static/men.png"/>
			<text>上门取件时间：</text>
		</view>
		<view class="order_row3" :class="cancel ? 'color_cancel' : 'color_normal'">
			<view>
				<text v-if="data.expectTime.isToday" :class="cancel ? 'color_cancel' : 'color_green'">今日</text>
				<text v-if="!data.expectTime.isToday" :class="cancel ? 'color_cancel' : 'color_normal'">{{ data.expectTime.month + '月' + data.expectTime.day + '日 ' }}</text>
				<text v-if="!data.expectTime.isToday" :class="cancel ? 'color_cancel' : 'color_green'">{{ data.expectTime.week }}</text>
				
				<text v-if="!cancel && torf(order.courier)" class="color_green" style="margin-left: 18rpx;">正在上门中...</text>
				<text v-if="cancel" class="color_cancel">（订单已取消）</text>
			</view>
			<view class="order_row3_row2">
				<text>{{ data.expectTime.startHour + ':00 ~ ' + data.expectTime.endHour + ':00 上门取件' }}</text>
				<s-button
					v-if="!cancel && !torf(order.courier)"
					width="160"
					height="56"
					text="修改时间"
					fontSize="28"
					background="#ffffff"
					color="#06180C"
					:custom-style="{border: '1px solid #707070', marginLeft: '46rpx'}"
					:bold="false"
					@click="click"/>
			</view>
		</view>
		<view class="order_row2">
			<image src="@/static/kuaidiyuan.png"></image>
			<text>取件员联系方式：</text>
			<view v-if="cancel" class="order_row2_cancel">
				<image src="@/static/quxiao.png" style="width: 100%; height: 100%;"/>
			</view>
		</view>
		<view class="order_row4">
			<view v-if="!cancel">
				<text v-if="!torf(order.courier)" class="color_cancel">取件当天，会展示出取件员的信息哦~</text>
				<text v-else class="color_normal">{{ order.courier }}</text>
			</view>
			<!-- <text v-if="!cancel">取件当天，会展示出取件员的信息哦~</text> -->
			<!-- <view>
				<text>圆通速递 | 李明</text>
				<text style="margin-left: 16rpx;">18801146821</text>
			</view>
			<s-button
				v-if="!cancel"
				width="160"
				height="56"
				text="拨打"
				fontSize="28"
				background="#ffffff"
				color="#06180C"
				:custom-style="{border: '1px solid #707070', marginLeft: '46rpx'}"
				@click="call"/> -->
			<text v-else class="color_cancel">已取消取件</text>
		</view>
		<dot-line :height="20" 
				:itemNumber="25" 
				:customStyle="{marginRight: '-30rpx', marginLeft: '-46rpx', marginTop: '46rpx', opacity: '0.7'}"
				:lineStyle="{background: cancel ? '#B0B7B3' : '#43A668'}"/>
		<view class="order_row2">
			<image src="@/static/dingdan.png"></image>
			<text>订单信息</text>
		</view>
		<view class="order_row5">
			<view class="order_row5_address">
				<view>
					<text>取件地址：</text>
					<text>{{data.address}}</text>
				</view>
				<text>{{data.name}} {{data.phone}}</text>
			</view>
			<view class="order_row5_btn" >
				<s-button
					v-if="!cancel && !torf(order.courier)"
					width="160"
					height="56"
					text="修改地址"
					fontSize="28"
					background="#ffffff"
					color="#06180C"
					:custom-style="{border: '1px solid #707070'}"
					:bold="false"
					@click="click"/>
			</view>
		</view>
		<view class="order_row6" style="margin-bottom: 10rpx;">
			<view>
				<label>下单时间：</label>
				<text>{{data.createTime}}</text>
			</view>
			<view class="order_row6_relative">
				<label>订单编号：</label>
				<text>{{data.orderNum}}</text>
				<text style="margin-left: 16rpx;" @click="copy">复制</text>
				<view class="order_row6_relative_btn" >
					<s-button
						v-if="cancel"
						width="160"
						height="56"
						text="删除订单"
						fontSize="28"
						background="#ffffff"
						color="#06180C"
						:custom-style="{border: '1px solid #707070'}"
						:bold="false"
						@click="showModal('delete')"/>
				</view>
			</view>
		</view>
<!-- 		<view v-if="!cancel">
			<s-button
				width="600"
				height="120"
				text="能换哪些好礼？"
				:custom-style="{border: '1px solid #43A668', marginTop: '40rpx', marginBottom: '10rpx'}"
				color="#43A668"
				@click="toCollect"/>
		</view> -->
		<view class="order_row8" v-if="!cancel">
			<text @click="showModal('update')">取消订单</text>
		</view>
	</view>
</template>

<script>
	import dotLine from '@/components/pages/s-dot-line'
	import app from '../../../../App.vue'
	import {getDate} from '../utils/dateUtil.js'
	import sButton from '@/components/pages/s-button'
	
	export default {
		components: {
			dotLine,
			sButton
		},
		props:{
			order: {},
			cancels: false
		},
		data() {
			return {
				data: {
					// 取件时间
					expectTime: {},
					// 地址
					address: '',
					// 姓名
					name: '',
					// 电话
					phone: '',
					// 订单创建时间
					createTime: '',
					// 订单号
					orderNum: ''
				},
				cancel: this.$props.cancels,
				test:1
			}
		},
		created() {
			this.setData()
		},
		methods: {
			setData() {
				this.data.expectTime = getDate(this.order.expectTime)
				this.data.address = this.order.address
				this.data.name = this.order.name
				this.data.phone = this.order.phone
				this.data.createTime = this.order.createTime
				this.data.orderNum = this.order.orderNum
				// console.log(this.data.expectTime.startHour)
			},
			click() {
				app.ChooseOrder = this.$props.order
				console.log(this.$props.order)
				this.$emit('click')
			},
			showModal(type) {
				let content = type === 'delete' ? '确认删除该订单？' : '确认取消该订单'
				
				this.$tip.confirm(content, true).then(() => {
					if(type === 'delete') {
						this.deleteOrder()
					} else {
						this.updateOrder()
					}
				})
			},
			deleteOrder(){
				app.ChooseOrder = this.$props.order
				this.$emit('deleteOrder')
			},
			updateOrder(){
				app.ChooseOrder = this.$props.order
				this.$emit('updateOrder')
			},
			copy() {
				uni.setClipboardData({
				    data: this.data.orderNum,
					success: () => {
						this.$tip.toast('复制成功')
					}
				});
			},
			call() {
				uni.makePhoneCall({
				    phoneNumber: '114' //仅为示例
				});
			},
			toCollect() {
				uni.navigateTo({ url:'/pages/collect/index?from=recycle_order' })
			},
			torf(str) {
				if(str === undefined || str === '' || str === null) {
					return false
				} else {
					return true
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.color_normal {
		color: #06180C;
	}
	
	.color_cancel {
		color: #B0B7B3;
	}
	
	.color_green {
		color: #43A668
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
				color: #06180C;
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
				// font-weight: bolder;
				color: #B0B7B3;
				letter-spacing: 0;
				text-align: right;
				line-height: 42rpx;
			}
			
			&_tips2 {
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				// font-weight: bold;
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
				color: #7F8581;
				letter-spacing: 0;
				line-height: 40rpx;
			}
			
			&_cancel {
				position: absolute;
				width: 150rpx;
				height: 131rpx;
				right: 20rpx;
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
			}
		}
		
		&_row4 {
			margin-top: 29rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			text {
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
			
			&_relative {
				position: relative;
				display: flex;
				align-items: center;
				
				&_btn {
					position: absolute;
					right: 0;
				}
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
