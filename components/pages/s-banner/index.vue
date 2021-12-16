<template>
	<esc-swiper :autoplay="autoplay" 
			:circular="circular" 
			:current.sync="current"
			:size="imgList.length" 
			:plus="plus" 
			:width="width" 
			:height="height"
			:itemWidth="itemWidth" 
			:space="space"
			v-if="show">
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
	
	import {getMiniProgram, sendChannel} from '@/utils/common.js'
	
	export default {
		props: {
			// 来源{0: 首页, 1: 商城}
			from: Number,
			list: Array
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
				imgList: [],
				show: true,
			}
		},
		watch: {
			list: {
				handler(newVal) {
					if(newVal.length >= 3) {
						this.autoplay = true
						this.circular = true
						this.plus = 2
						this.imgList = getSwiperList(this.list, {circular: this.circular,plus: this.plus})
					} else {
						this.autoplay = false
						this.circular = false
						this.plus = 0
						this.itemWidth = 690
						this.space = 30
						this.imgList = newVal
					}
					this.show = false
					this.$nextTick(() => {
						this.show = true
					})
				},
				deep: true
			}
		},
		methods: {
			click(item){
				if (item.toPages != '-1') {
					if(item.toPages === 'pages/shopping/index') {
						my.switchTab({ url: '/pages/shopping/index' })
					} else if( item.toPages.indexOf('alipays') !== -1 ) {
						let res = getMiniProgram(item.toPages)
						if(res.status === false) return
						sendChannel('TTZQ', '', '跳转其他小程序')
						my.navigateToMiniProgram({
							appId: res.appId,  // 要跳转的目标小程序 appId。
							path: res.page,  // 打开的页面路径，如果为空则打开首页。 
							extraData: {},
							fail: (e) => { this.$tip.error(e.message) },
						})
					} else {
						uni.navigateTo({ url: '/' + item.toPages + '?goodsID=' + item.param })
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
