<template>
	<view :style="{
		width: size + 'rpx',
		height: size + 'rpx',
		borderRadius: size / 2 + 'rpx',
		background: color,
		verticalAlign: 'middle'
	}">
	</view>
</template>

<script>
	export default {
		props: {
			// 大小
			size: {
				type: [String,Number],
				default: 8
			},
			// 颜色
			color: {
				type: String,
				default: '#FA9E19'
			}
		}
	}
</script>

<style lang="scss" scoped>
	.text {
		display: flex;
		align-items: center;
		
		&_dot {
			
		}
	}
</style>
