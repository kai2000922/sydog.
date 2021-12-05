<template>
	<view class="container">
		<view class="top-background" />
		
		<step :step-style="{marginBottom: '40rpx'}"/>
		
		<view>
			<s-panel>
				<view style="padding: 40rpx 0;" class="flex_colum flex_ai_center">
					<image class="ok_img" src="@/static/ok.png"/>
					<text style="margin-top: 37rpx;" class="font_36 font_bold color_black line_54">支付成功</text>
					<text style="margin-top: 8rpx;" class="font_24 font_bold color_black line_36">我们将在48小时内为您发货</text>
				</view>			
			</s-panel>
			<s-button
				width="600"
				height="120"
				text="已兑换，去查看好礼订单！"
				:custom-style="{border: '1rpx solid #707070', margin: '0 auto'}"
				background="rgba(0, 0 ,0 , 0)"
				color="#06180C"
				@click="toOrder"
			/>	
		</view>
	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'

	import api from '@/utils/api.js'

	export default {
		components: {
			step,
			sPanel,
			sButton,
		},
		data() {
			return {
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({ title: '' })
			uni.setBackgroundColor({ backgroundColor: '#fafffc' })
			uni.setNavigationBarColor({ backgroundColor: '#44aa67' })
		},
		methods: {

			// 跳转到订单页
			toOrder() {
				uni.switchTab({ url: '/pages/recycle_orders/index' })
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}
	
	.ok_img {
		width: 116rpx;
		height: 116rpx;
	}
</style>
