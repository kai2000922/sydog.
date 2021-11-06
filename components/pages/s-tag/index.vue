<template>
	<view class="tag" :style="{
		border: '1rpx solid ' + color,
		width: width + 'rpx',
		height: height + 'rpx',
		borderRadius: borderRadius + 'rpx'
		}">
		<text :style="{color: fontColor === '' ? color : fontColor, fontSize: fontSize + 'rpx'}" v-text="text"/>
	</view>
</template>

<script>
	export default {
		props: {
			width: {
				type: [Number, String],
				default: 90
			},
			height: {
				type: [Number, String],
				default: 34
			},
			text: {
				type: String,
				default: '付邮领'
			},
			fontSize: {
				type: [Number, String],
				default: 20
			},
			color: {
				type: String,
				default: '#43A668'
			},
			fontColor: {
				type: String,
				default: ''
			}
		},
		data() {
			return {
				borderRadius: 0
			}
		},
		created() {
			this.borderRadius = this.height / 2
		}
	}
</script>

<style lang="scss" scoped>
	.tag {
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		
		&>text {
			font-family: PingFangSC-Regular;
			letter-spacing: 0;
		}
	}
</style>
