<template>
	<view class="freight" :style="customStyle">
		<s-tag v-if="tagShow" width="92" height="36" text="付邮领"/>
		<text class="freight_freight" :style="{marginLeft: tagShow ? '16rpx' : '0rpx'}" v-text="(tagShow ? '需支付运费' : '运费') + freight + '元'"/>
	</view>
</template>

<script>
	import sTag from '@/components/pages/s-tag'
	export default {
		components: {
			sTag
		},
		props: {
			// tag文字
			tag: {
				type: String,
				default: '付邮领'
			},
			// 运费价格
			freight: {
				type: [String, Number],
				default: '9.9'
			},
			// 自定义样式
			customStyle: {
				type: Object,
				default: () => {return {}}
			},
			// 显示开关
			tagShow: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.freight {
		display: flex;
		align-items: center;
	
		&_freight {
			font-family: PingFangSC-Regular;
			font-size: 28rpx;
			color: #7F8581;
			letter-spacing: 0;
			line-height: 42rpx;
		}
	}
</style>
