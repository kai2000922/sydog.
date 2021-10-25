<template>
	<view class="s_panel">
		<slot></slot>
	</view>
</template>

<script>
	export default {
		name: 's-panel'
	}
</script>

<style lang="scss" scoped>
	
	$s_space_4: 40rpx;
	$s_space_3: 30rpx;
	$s_bg_white: #FFFFFF;
	$s_margin: 32rpx 30rpx 30rpx 30rpx;
	$s_box-shadow: 0 1rpx 24rpx 0 #E8F0EB;
	
	.s_panel {
		box-sizing: border-box;
		position: relative;
		padding: $s_space_3;
		margin: $s_margin;
		background: $s_bg_white;
		box-shadow: $s_box-shadow;
		border-radius: $s_space_4;
	}
</style>
