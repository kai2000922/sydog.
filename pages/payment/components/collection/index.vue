<template>
	<view class="collection">
		<view class="left">
			<view class="text_bottom">
				<text class="left_text">合计：</text>
				<text class="left_text">¥</text>
				<text class="left_text price">{{ zfPrice }}</text>
			</view>
		</view>
		<view>
			<s-button
				background="#43A668" 
				width="360" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="立即支付"
				:bold="false"
				@click="zfBtnClick"/>
		</view>
	</view>
</template>

<script>
	import sButton from '@/components/pages/s-button'
	
	export default {
		components: {
			sButton
		},
		props: {
			zfPrice: {
				type: [String, Number],
				default: 10
			}
		},
		methods: {
			zfBtnClick() {
				this.$emit('zfBtnClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.collection {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-family: PingFangSC-Regular;
		
		.left {
			flex: 1;
			display: flex;

			justify-content: center;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			
			.text_bottom {
				display: table-cell;
				vertical-align: bottom;
			}
			
			&_text {
				margin: 0!important;
				padding: 0!important;
			}
			
			.price {
				margin-left: 4rpx;
				font-size: 46rpx;
				font-weight: bold;
			}
		}
	}
</style>
