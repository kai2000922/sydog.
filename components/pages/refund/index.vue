<template>
	<view>
		<u-popup v-model="pshow" mode="center" width="690" borderRadius="40" @close="refundClose">
			<view style="padding: 30rpx;" class="flex_colum">
				<view class="flex_row flex_ai_center flex_jc_center">
					<text class="font_36 font_bold line_54 color_black">确定取消订单，并退款吗？</text>
				</view>
				<view style="margin-top: 50rpx;">
					<order-briefly :img="tkObj.img" :goods-name="tkObj.goodsName" :goods-type="tkObj.goodsType" :hx-price="tkObj.hxPrice" :express-price="tkObj.expressPrice" :zf-price="tkObj.zfPrice"/>
				</view>
				<view style="display: flex; justify-content: center; align-items: center;">
					<s-button width="600" height="120" :text="'立即退款：¥' + tkObj.zfPrice"  background="#ffffff"
					:custom-style="{border: '1px solid #707070', marginTop: '50rpx', marginBottom: '20rpx'}" color="#06180C" :bold="false" @click="tk"/>
				</view>
			</view>
		</u-popup>
		
		<u-popup v-model="okShow" mode="center" width="690" borderRadius="40" @close="okClose">
			<view style="padding: 30rpx;" class="flex_colum flex_ai_center flex_jc_center">
				<view class="refundImg flex_colum flex_ai_center flex_jc_center">
					<u-image :src="tkObj.img" width="100%" height="100%"/>
					<view class="mask flex_colum flex_ai_center flex_jc_center">
						<image src="@/static/tuikuan.png" />
						<text class="font_24 line_36">已退款</text>
					</view>
				</view>
				<text style="margin-top: 4rpx;" class="font_28 line_42 color_black">{{ '退款金额：¥' + tkObj.zfPrice }}</text>
				<text style="margin-top: 8rpx;" class="font_36 line_54">退款成功，已退回原账户</text>
				
				<s-button
					width="600"
					height="120"
					text="我知道了"
					:custom-style="{border: '1rpx solid #707070', marginTop: '28rpx'}"
					background="rgba(0, 0 ,0 , 0)"
					color="#06180C"
					:bold="false"
					@click="okClose"/>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import sButton from '@/components/pages/s-button'
	
	import orderBriefly from '@/components/pages/order-briefly'
	
	export default {
		components: {
			sButton,
			orderBriefly
		},
		props: {
			refundShow: {
				type: Boolean,
				default: false
			},
			okShow: {
				type: Boolean,
				default: false
			},
			tkObj: {
				type: Object,
				default: () => ( {
					// 图片
					img: '',
					// 商品名
					goodsName: '商品',
					// 规格
					goodsType: '规格',
					// 画线价格
					hxPrice: 30,
					// 运费
					expressPrice: 10,
					// 支付价格
					zfPrice: 10
				} )
			}
		},
		data() {
			return {
				pshow: false,
				lshow: false
			}
		},
		created() {
			this.pshow = this.refundShow
			this.lshow = this.okShow
		},
		watch: {
			refundShow(val) {
				this.pshow = val
			},
			okShow(val) {
				this.lshow = this.okShow
			}
		},
		methods: {
			refundClose() {
				this.$emit('update:refundShow', false)
			},
			
			okClose() {
				this.$emit('update:okShow', false)
			},
			
			tk() {
				this.$emit('tk')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.refundImg {
		position: relative;
		border-radius: 20rpx;
		width: 200rpx;
		height: 200rpx;
		overflow: hidden;
		
		.mask {
			position: absolute;
			top: 0;
			left: 0;
			width: 200rpx;
			height: 200rpx;
			background: rgba($color: #000000, $alpha: 0.5);
			
			&>image {
				width: 80rpx;
				height: 80rpx
			}
			
			&>text {
				margin-top: 8rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}
	}
</style>
