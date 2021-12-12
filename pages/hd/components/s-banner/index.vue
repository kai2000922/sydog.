<template>
	<esc-swiper :autoplay="autoplay" 
			:circular="circular" 
			:current.sync="current"
			:size="bannerImage.length" 
			:plus="plus" 
			:width="width" 
			:height="height"
			:itemWidth="itemWidth" 
			:space="space"
			:key="key">
		<esc-swiper-item v-for="(item, index) in imgList" :index="index" :key="index">
			<view class="swiper-item"  @click="click(item)">
				<image :src="item.image" class="item-image" />
			</view>
		</esc-swiper-item>
	</esc-swiper>
</template>

<script>
	import {getSwiperList} from '@/components/sn-swiper/esc-swiper/helper.js';
	import {BASE_URL} from '@/utils/request.js'
	
	export default {
		props: {
			// 来源{0: 首页, 1: 商城}
			from: Number,
			list: Array
		},
		// created() {
		// 	if(this.from === 0) {
		// 		this.loadHomeBanner()
		// 	} else {
		// 		this.LoadShoppingBanner()
		// 	}
		// },
		data() {
			return {
				autoplay: false,
				circular: false,
				width: 750,
				height: 250,
				itemWidth: 690,
				space: 30,
				current: 0,
				plus: 0,
				imgList: [
					
				],
				key: 0
			}
		},
		created() {
			
		},
		watch: {
			list: {
				handler(newVal) {
					if(newVal.length >= 3) {
						this.autoplay = true
						this.circular = true
						this.plus = 2
						this.imgList = getSwiperList(this.list, {circular: this.circular,plus: this.plus})
						this.k++
					} else {
						this.autoplay = false
						this.circular = false
						this.plus = 0
						this.imgList = newVal
						this.k++
					}
				},
				deep: true
			}
		},
		// computed: {
		// 	bannerImage() {
		// 		return getSwiperList(this.list, {
		// 			circular: this.circular,
		// 			plus: this.plus
		// 		});
		// 	}
		// },
		methods: {
			// loadHomeBanner(){
			// 	this.imgList = []
			// 	this.$http.get('recycle/goods/getBanner').then(res => {
			// 		for(let i = 0 ;i < res.data.data.length; i++){
			// 			this.imgList.push({image: BASE_URL + res.data.data[i].filePath, toPages: res.data.data[i].toPages, goodsId: res.data.data[i].goodsId})
			// 		}
			// 	}).catch(err => {
			// 		console.log(err)
			// 	})
			// },
			// LoadShoppingBanner() {
			// 	this.imgList = []
			// 	this.$http.get('recycle/goods/getStore').then(res => {
			// 		for(let i = 0 ;i < res.data.data.length; i++){
			// 			this.imgList.push({image: BASE_URL + res.data.data[i].filePath, toPages: res.data.data[i].toPages, goodsId: res.data.data[i].goodsId})
			// 		}
			// 	}).catch(err => {
			// 		console.log(err)
			// 	})
			// },
			click(item){
				if (item.toPages != '-1'){
					if(item.toPages === 'pages/shopping/index') {
						my.switchTab({ url: '/pages/shopping/index' })
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
