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
				<image :src="item.image" class="item-image" />
			</view>
		</esc-swiper-item>
	</esc-swiper>
</template>

<script>
	import {
		getSwiperList
	} from '@/components/sn-swiper/esc-swiper/helper.js';

	export default {
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
				imgList: [{
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
