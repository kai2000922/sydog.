<template>
	<view class="item" 
		:style="{width: width + 'rpx', border: select ? '4rpx solid #30BB63' : ''}"
		@click="itemClick">
		<view v-if="!select" class="item_circular"/>
		<view v-if="select" class="item_circular_choice">
			<view/>
		</view>
		<text class="item_text">{{ obj.label }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: [String, Number],
				default: 275
			},
			obj: {
				type: Object,
				default: () => ({
					label: '8kg 约20件',
					value: 8,
					choice: false
				})
			},
		},
		data() {
			return {
				choice: false
			}
		},
		created() {
			this.choice = this.select
		},
		watch: {
			select(val) {
				this.choice = val
			}
		},
		methods: {
			itemClick() {
				this.$emit('select', this.obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		margin-top: 15rpx;
		height: 100rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #E2F7EA;
		border-radius: 20rpx;
		
		&_circular {
			box-sizing: border-box;
			width: 36rpx;
			height: 36rpx;
			border-radius: 18rpx;
			border: 1rpx solid #30BB63;
		}
		
		&_circular_choice {
			width: 36rpx;
			height: 36rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 18rpx;
			background: #FFFFFF;
			
			&>view {
				width: 20rpx;
				height: 20rpx;
				border-radius: 10rpx;
				background: #30BB63;
			}
		}
		
		&_text {
			margin-left: 12rpx;
			font-family: PingFangSC-Semibold;
			font-size: 28rpx;
			color: #30BB63;
			letter-spacing: 0;
			line-height: 42rpx;
		}
	}
</style>
