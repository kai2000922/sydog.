<template>
	<view>
		<u-popup v-model="pshow" mode="center" width="690" borderRadius="40" @close="close">
			<view style="padding: 30rpx;">
				<view class="title_row">
					<text class="title">确定取消订单，并退款吗？</text>
				</view>
				<view class="commodity_info">
					<view class="commodity_info_img">
						<u-image :src="utils.getImgUrl(goods.images)" width="100%" height="100%"/>
					</view>
					<view class="commodity_info_box">
						<view class="commodity_info_box_row1">
							<text class="commodity_name">{{ order.goodsName }}</text>
							<view class="commodity_price">
								<text class="commodity_price_original">{{'¥' + goods.hxPrice}}</text>
								<text class="commodity_price_now">¥0</text>
							</view>
						</view>
						<view class="commodity_info_box_row2">
							<text>{{ order.goodsType }}</text>
						</view>
						<view class="commodity_info_box_row3">
							<s-tag
								width="92"
								height="36"
								text="付邮领"
								color="#F7970D"
								fontColor="#06180C"/>
						</view>
						<view class="commodity_info_box_row4">
							<text>运费：</text>
							<text>{{'¥' + goods.expressPrice}}</text>
							<text style="margin-left: 24rpx;">实付款：</text>
							<text>{{'¥' + order.zfPrice}}</text>
						</view>
					</view>
				</view>
				<view style="display: flex; justify-content: center; align-items: center;">
					<s-button
						width="600"
						height="120"
						:text="'立即退款：' + order.zfPrice"
						:custom-style="{border: '1px solid #707070', marginTop: '50rpx', marginBottom: '20rpx'}"
						color="#06180C"
						:bold="false"
						@click="tk"/>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import sTag from '@/components/pages/s-tag'
	import sButton from '@/components/pages/s-button'
	
	import api from '@/utils/api.js'

	export default {
		components: {
			sTag,
			sButton
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			goods: Object,
			order: Object
		},
		data() {
			return {
				pshow: false,
				utils: api
			}
		},
		created() {
			this.pshow = this.show
		},
		watch: {
			show(val) {
				this.pshow = val
			}
		},
		methods: {
			close() {
				this.$emit('update:show', false)
			},
			tk() {
				this.$emit('tk')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.title_row {
		display: flex;
		justify-content: center;
		align-items: center;

		.title {
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 54rpx;
		}
	}
	
	.commodity_info {
		margin-top: 50rpx;
		height: 200rpx;
		display: flex;
		flex-direction: row;
		
		&_img {
			width: 200rpx;
			border-radius: 30rpx;
			// background: #007AFF;
			overflow: hidden;
		}
		
		&_box {
			flex: 1;
			margin-left: 16rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			// background: #18B566;
			
			&_row1 {
				display: flex;
				justify-content: space-between;
				
				&>.commodity_name {
					font-family: PingFangSC-Semibold;
					font-size: 28rpx;
					color: $s_font_color;
					letter-spacing: 0;
					line-height: 42rpx;
				}
				
				&>.commodity_price {
					
					.commodity_price_original {
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						text-decoration: line-through;
						color: #B0B7B3;
						letter-spacing: 0;
						line-height: 42rpx;
					}
					
					.commodity_price_now {
						margin-left: 8rpx;
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						color: $s_font_color;
						letter-spacing: 0;
						line-height: 42rpx;
					}
				}
			}
			
			&_row2 {
				margin-top: 4rpx;
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 36rpx;
			}
			
			&_row3 {
				margin-top: 20rpx;
			}
			
			&_row4 {
				margin-top: 10rpx;
				display: flex;
				justify-content: flex-end;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 42rpx;
			}
		}
	}
</style>
