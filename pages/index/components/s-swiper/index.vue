<template>
	<esc-swiper :autoplay="autoplay" 
			:circular="circular" 
			:current.sync="current"
			:size="bannerImage.length" 
			:plus="plus" 
			:width="width" 
			:height="height"
			:itemWidth="itemWidth" 
			:space="space">
		<esc-swiper-item v-for="(item, index) in bannerImage" :index="index" :key="index">
			<view class="swiper-item"  @click="toGoods(item)">
				<image :src="item.image" class="item-image" />
			</view>
		</esc-swiper-item>
	</esc-swiper>
</template>

<script>
	import {getSwiperList} from '@/components/sn-swiper/esc-swiper/helper.js';
	import {BASE_URL} from '@/utils/request.js'
	
	export default {
		created() {
			if(this.from === 0) {
				this.loadHomeBanner()
			} else {
				this.LoadShoppingBanner()
			}
		},
		props: {
			// 来源{0: 首页, 1: 商城}
			from: Number
		},
		data() {
			return {
				autoplay: true,
				circular: true,
				width: 750,
				height: 250,
				itemWidth: 650,
				space: 24,
				current: 0,
				plus: 2,
				imgList: [
					{
						image: 'https://picsum.photos/750/300?blur=1',
						toPages: '',
						goodsID: 0
					}
				]
			}
		},
		computed: {
			bannerImage() {
				return getSwiperList(this.imgList, {
					circular: this.circular,
					plus: this.plus
				});
			}
		},
		methods: {
			loadHomeBanner(){
				this.imgList = []
				this.$http.get('recycle/goods/getBanner').then(res => {
					for(let i = 0 ;i < res.data.data.length; i++){
						this.imgList.push({image: BASE_URL + res.data.data[i].filePath, toPages: res.data.data[i].toPages, goodsId: res.data.data[i].goodsId})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			LoadShoppingBanner() {
				this.imgList = []
				this.$http.get('recycle/goods/getStore').then(res => {
					for(let i = 0 ;i < res.data.data.length; i++){
						this.imgList.push({image: BASE_URL + res.data.data[i].filePath, toPages: res.data.data[i].toPages, goodsId: res.data.data[i].goodsId})
					}
				}).catch(err => {
					console.log(err)
				})
			},
			toGoods(item){
				if (item.toPages != '-1'){
					if(item.toPages === 'pages/shopping/index') {
						my.switchTab({ url: '/pages/shopping/index',
							fail: (e) => {
								console.error(e)
								this.$tip.toast(JSON.stringify(e))
						}})
					} else {
						uni.navigateTo({ url: '/' + item.toPages + '?goodsID=' + item.goodsId })
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.swiper-item {
		position: relative;
		width: 100%;
		border-radius: 30rpx;
		background: #cbcecb;
		overflow: hidden;
		transform: translateY(0);
	
		.item-image {
			width: 100%;
			will-change: transform;
			height: 100%;
		}
	}
</style>
