<template>
	<view>
		<button class="s_button" 
				:style="{
					height: height + 'rpx', 
					width: width + 'rpx', 
					background: background, 
					borderRadius: height / 2,
					color: color,
					fontSize: fontSize + 'rpx',
					
				}" 
				@click="click"
				v-text="text"/>
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
			text: String
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
		box-shadow: 0 2rpx 16rpx 0 rgba(67, 166, 104, 0.56);
		font-family: PingFangSC-Semibold;
		letter-spacing: 0;
		font-weight: bold;
	}
	.s_button:hover {
		background: none;
	}
</style>
