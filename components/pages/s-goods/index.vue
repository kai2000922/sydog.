<template>
	<view class="s_gd">
		<s-goods-item
			v-for="(item, index) in goodsList"
			:goods="item"
			:key="index"
			:type="itemType"
			:customStyle="itemStyle" 
			@click="itemClick"/>
	</view>
</template>

<script>
	
	import sGoodsItem from '../s-goods-item'
	
	export default {
		props: {
			itemType: String,
			goodsList: {
				type: Array,
				default: () => []
			},
			itemStyle: {
				type: Object,
				default: () => ({})
			}
		},
		
		components: {
			sGoodsItem,
		},
		
		methods:{
			itemClick(goods){
				this.$emit('itemClick', goods)
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
