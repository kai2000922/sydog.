<template>
	<view class="container">
		<view class="top-background" />
		<step/>

		<s-panel>
			<view class="ok">
				<image class="ok_img" src="@/static/ok.png"></image>
				<text class="ok_title">预约旧衣回收成功</text>
				<text class="ok_tips">快递员将按您要求的时间上门</text>
			</view>
			<view class="coupons mt_20 flex_row flex_ai_center flex_jc_center">
				<image :src="img" mode="widthFix" @click="getCoupons"/>
			</view>
			<s-button v-if="haveCoupons" width="600" height="120" text="去兑换好礼 GO" background="#43A668"
				:custom-style="{margin: '40rpx auto 0 auto'}"
				color="#FFFFFF" @click="toShopping" />
		</s-panel>
		
		<s-button width="600" height="120" text="查看订单"
			:custom-style="{border: '1px solid #B0B7B3', margin: '40rpx auto 0 auto', background: 'rgba(0, 0, 0, 0)'}"
			color="#7F8581" @click="toRecycleOrders" />
	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	import sDot from '@/components/pages/s-dot'

	export default {
		components: {
			step,
			sPanel,
			sButton,
			sDot
		},
		data() {
			return {
				img: '/static/collect/coupons.gif',
				haveCoupons: false
			}
		},
		onLoad(option) {
			uni.setNavigationBarTitle({title: ''})
			uni.setBackgroundColor({backgroundColor: '#fafffc'})
			uni.setNavigationBarColor({backgroundColor: '#44aa67'})
		},
		methods: {

			// 订单页
			toRecycleOrders() {
				uni.switchTab({ url: '/pages/recycle_orders/index' })
			},
			
			getCoupons() {
				if(this.haveCoupons) {
					this.$tip.toast('请勿重复领取~')
					return
				}
				this.$tip.loading('领取中...')
				setTimeout(()=> {
					this.$tip.loaded()
					this.$tip.toast('领取成功~')
					this.haveCoupons = true
					this.img = '/static/collect/coupons-grey.jpg'
				}, Math.round(Math.random() * 300 + 300))
			},
			
			toShopping() {
				uni.switchTab({ url: '/pages/shopping/index' })
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		position: relative;
	}
	
	.coupons {
		height: 180rpx;
		
		&>image {
			width: 630rpx;;
			height: 100%;
		}
	}

	.ok {
		padding-top: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&_img {
			width: 116rpx;
			height: 116rpx;
		}

		&_title {
			margin-top: 24rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 54rpx;
		}

		&_tips {
			margin-top: 8rpx;
			font-family: PingFangSC-Regular;
			font-size: 24rpx;
			color: #B0B7B3;
			letter-spacing: 0;
			line-height: 36rpx;
		}
	}
</style>
