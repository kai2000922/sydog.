<template>
	<view class="payment">
		<view class="payment_main">
			<pickup/>
			<order/>
		</view>
		<view class="payment_bottom">
			<collection/>
		</view>
	</view>
</template>

<script>
	import Pickup from './components/pickup'
	import Order from './components/order'
	import Tag from './components/tag'
	import Collection from './components/collection'
	export default {
		components: {
			Pickup,
			Order,
			Tag,
			Collection
		},
		onLoad() {
			uni.setNavigationBarColor({ backgroundColor: '#FFFFFF' })
		}
	}
</script>

<style lang="scss" scoped>
	.payment {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;
		
		&_main {
			flex: 1;
		}
		
		&_bottom {
			background: #FFFFFF;
			box-sizing: border-box;
			width: 100%;
			padding: 30rpx;
		}
	}
</style>
