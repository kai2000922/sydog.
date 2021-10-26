<template>
	<view class="s_gd">
		<s-goods-item :goods="item" :customStyle="index > 1 ? itemStyle : {}" v-for="(item,index) in goodsList"  @toGoodsPage="toGoodPage"></s-goods-item>
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
				},
				goodsList:[
					{
					  "goodID" : '1',
					  "goodsName" : '手提纸巾',
					  "describe" : '',
					  "type" : '',
					  "hxPrice" : '40',
					  "yhPrice" : '',
					  "zfPrice" : '',
					  "expressPrice" : '1',
					  "images" : 'https://picsum.photos/300/200',
					  "descImages" : '',
					  "orderImages" : '',
					  "channel" : '',
					  "goodsNum" : '',
					  "exportName" : ''
					},
					{
					  "goodID" : '2',
					  "goodsName" : '手提纸巾',
					  "describe" : '',
					  "type" : '',
					  "hxPrice" : '40',
					  "yhPrice" : '',
					  "zfPrice" : '',
					  "expressPrice" : '1',
					  "images" : 'https://picsum.photos/300/200',
					  "descImages" : '',
					  "orderImages" : '',
					  "channel" : '',
					  "goodsNum" : '',
					  "exportName" : ''
					},
					{
					  "goodID" : '3',
					  "goodsName" : '手提纸巾',
					  "describe" : '',
					  "type" : '',
					  "hxPrice" : '40',
					  "yhPrice" : '',
					  "zfPrice" : '',
					  "expressPrice" : '1',
					  "images" : 'https://picsum.photos/300/200',
					  "descImages" : '',
					  "orderImages" : '',
					  "channel" : '',
					  "goodsNum" : '',
					  "exportName" : ''
					},
					{
					  "goodID" : '4',
					  "goodsName" : '手提纸巾',
					  "describe" : '',
					  "type" : '',
					  "hxPrice" : '40',
					  "yhPrice" : '',
					  "zfPrice" : '',
					  "expressPrice" : '1',
					  "images" : 'https://picsum.photos/300/200',
					  "descImages" : '',
					  "orderImages" : '',
					  "channel" : '',
					  "goodsNum" : '',
					  "exportName" : ''
					},
				]
			}
		},
		
		methods:{
			toGoodPage(goods){
				goods = encodeURIComponent(JSON.stringify(goods))
				uni.navigateTo({
					url:'../goods/goods?goods=' + goods
				})
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
