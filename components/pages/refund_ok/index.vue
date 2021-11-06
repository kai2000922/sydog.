<template>
	<view>
		<u-popup v-model="pshow" mode="center" width="690" borderRadius="40" @close="close">
			<view class="refund_ok">
				<view class="refund_ok_img">
					<u-image :src="utils.getImgUrl(img)" width="100%" height="100%"/>
					<view class="refund_ok_img_mask">
						<image src="@/static/tuikuan.png" />
						<text>已退款</text>
					</view>
				</view>
				<text class="refund_ok_price">{{ '退款金额：¥' + price }}</text>
				<text class="refund_ok_info">退款成功，已退回原账户</text>
				
				<s-button
					width="600"
					height="120"
					text="我知道了"
					:custom-style="{border: '1rpx solid #707070', marginTop: '28rpx'}"
					background="rgba(0, 0 ,0 , 0)"
					color="#06180C"
					:bold="false"
					@click="close"/>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import sButton from '@/components/pages/s-button'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			sButton
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			img: String,
			price: [String, Number]
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
			}
		}
	}
</script>

<style lang="scss" scoped>
	.refund_ok {
		padding: 30rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		&_img {
			position: relative;
			border-radius: 20rpx;
			width: 200rpx;
			height: 200rpx;
			overflow: hidden;
			
			&_mask {
				position: absolute;
				top: 0;
				left: 0;
				width: 200rpx;
				height: 200rpx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				background: rgba($color: #000000, $alpha: 0.5);
				
				&>image {
					width: 80rpx;
					height: 80rpx
				}
				
				&>text {
					margin-top: 8rpx;
					font-family: PingFangSC-Regular;
					font-size: 24rpx;
					color: #FFFFFF;
					letter-spacing: 0;
					text-align: center;
					line-height: 36rpx;
				}
			}
		}
		
		&_price {
			margin-top: 4rpx;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
		}
		
		&_info {
			margin-top: 8rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			color: #06180C;
			letter-spacing: 0;
			line-height: 54rpx;
		}
	}
</style>
