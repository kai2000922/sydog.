<template>
	<view class="step" :style="stepStyle">
		<view class="step_logo">
			<image src="@/static/logo.png"/>
		</view>
	</view>
</template>

<script>
	export default {
		name: "Step",
		props: {
			stepStyle: {
				type: Object,
				default: () => ({})
			}
		},
	}
</script>

<style lang="scss" scoped>

	$s_color_green: #44aa67;

	.step {

		&_logo {
			margin-bottom: 13rpx;

			&>image {
				width: 220rpx;
				height: 56rpx;
			}
		}
	}
</style>
