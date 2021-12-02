<template>
	<view>
		<button class="s_button" 
			:style="[{
				height: height + 'rpx', 
				width: width + 'rpx', 
				background: background, 
				borderRadius: height / 2,
				color: color,
				fontSize: fontSize + 'rpx',
				fontWeight: bold ? 'bold' : 'normal'
			}, customStyle]" 
			:open-type="openType"
			@click="click"
			v-text="text"
			form-type="submit"
			/>
	</view>
</template>

<script>
	export default {
		props: {
			height: [String, Number],
			width: [String, Number],
			background: String,
			color: String,
			fontSize: {
				type: [String, Number],
				default: 36
			},
			bold: {
				type: Boolean,
				default: true
			},
			text: String,
			customStyle: {
				type: Object,
				default: () => ({
					boxShadow: '0 2rpx 16rpx 0 rgba(67, 166, 104, 0.56)'
				})
			},
			openType: {
				type: String,
				default: ''
			}
		},
		methods: {
			click() {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s_button {
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		border: 0;
		font-family: PingFangSC-Semibold;
		letter-spacing: 0;
		// font-weight: normal;
		
		// &:hover {
		// 	background: none;
		// }
		
		// &:checked {
		// 	background: none;
		// }
	}
</style>
