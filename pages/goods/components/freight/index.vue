<template>
	<view class="freight" :style="customStyle">
		<s-tag width="92" height="36" text="付邮领"/>
		<text class="freight_freight" v-text="'需支付运费' + freight + '元'"/>
	</view>
</template>

<script>
	import sTag from '@/components/pages/s-tag'
	export default {
		components: {
			sTag
		},
		props: {
			tag: {
				type: String,
				default: '付邮领'
			},
			freight: {
				type: [String, Number],
				default: '9.9'
			},
			customStyle: {
				type: Object,
				default: () => {return {}}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.freight {
		display: flex;
		align-items: center;
	
		&_freight {
			margin-left: 8rpx;
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #43A668;
			letter-spacing: 0;
			line-height: 42rpx;
		}
	}
</style>
