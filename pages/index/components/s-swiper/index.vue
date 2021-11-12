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
			<view class="swiper-item">
				<u-image width="100%" height="100%" :src="item.image" />
			</view>
		</esc-swiper-item>
	</esc-swiper>
</template>

<script>
	import {getSwiperList} from '@/components/sn-swiper/esc-swiper/helper.js';
	import {BASE_URL} from '@/utils/request.js'
	
	export default {
		created() {
			this.loadImg()
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
						image: 'https://picsum.photos/750/300?blur=1'
					},
					{
						image: 'https://picsum.photos/seed/picsum/750/300'
					},
					{
						image: 'https://picsum.photos/750/300'
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
			loadImg(){
				this.$http.get('recycle/goods/getBanner').then(res => {
					this.imgList = []
					for(let i = 0 ;i < res.data.data.length; i++){
						this.imgList.push({image: BASE_URL + res.data.data[i].filePath})
					}
				})
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
