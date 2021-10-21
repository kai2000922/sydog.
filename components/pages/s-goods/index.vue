<template>
	<view class="s_gd">
		<s-goods-item :customStyle="i > 2 ? itemStyle : {}" v-for="i in 4"></s-goods-item>
	</view>
</template>

<script>
	
	import sGoodsItem from '../s-goods-item'
	
	export default {
		components: {
			sGoodsItem,
		},
		
		data() {
			return {
				itemStyle: {
					paddingTop: '56rpx'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s_gd {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.mt-56 {
		margin-top: 56rpx;
	}
</style>
