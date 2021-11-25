<template>
	<view class="content flex_colum">
		<view class="top-background" />

		<view class="flex_row flex_ai_center flex_jc_center title">旧衣换好礼商城</view>

		<s-swiper />

		<s-panel>
			<liuyuno-tabs :tabData="tabs.list" :activeIndex="tabs.index" @tabClick="onswiperchange" :config="{underLineBottom: '0'}"/>
			<swiper disable-touch :current="tabs.index" @change="onswiperchange">
				<swiper-item>
					<view>
						<view class="flex_row flex_ai_center" style="padding: 56rpx 0 36rpx 0;">
							<s-dot size="16"></s-dot>
							<text class="font_28 font_bold color_black"
								style="margin-left: 8rpx;">付邮费即可兑换以下好礼</text>
						</view>
						<view class="flex_row flex_jc_between flex_warp">
							<goods-item v-for="(item, index) in goods" :key="index" :item="item"
								:custom-style="index >= 2 ? {marginTop: '56rpx'} : {}" 
								@goodsClick="toGoods"/>
						</view>
						<u-loadmore margin-top="20" :status="goodsStatus" :load-text="goodsLoadText"
							@loadmore="goodsListErrorHandle" />
					</view>
				</swiper-item>
			</swiper>
		</s-panel>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sSwiper from '@/pages/index/components/s-swiper'
	import goodsItem from './components/goods-item'
	import sDot from '@/components/pages/s-dot'

	export default {
		components: {
			sPanel,
			sSwiper,
			goodsItem,
			sDot
		},
		data() {
			return {
				// tab
				tabs: {
					index: 0,
					list: ['付邮领专区']
				},
				heights: [],
				goods: [],
				goodsRequest: {
					pageSize: 10,
					pageNum: 0,
					over: false
				},
				goodsStatus: 'loading',
				goodsLoadText: {
					loadmore: '重新加载',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({
				title: ''
			})
			uni.setBackgroundColor({
				backgroundColor: '#fafffc'
			})
			uni.setNavigationBarColor({
				backgroundColor: '#44aa67'
			})
			this.sendChannel(options.channelName)
		},
		created() {
			this.getGoodsList()
		},
		onReachBottom() {
			if (!this.goodsRequest.over) {
				this.getGoodsList()
			}
		},
		methods: {
			// tab改变
			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.tabs.index = index;
				} else {
					this.tabs.index = e;
				}
			},

			// 获取商品列表
			getGoodsList() {
				this.goodsStatus = 'loading'
				this.goodsRequest.pageNum++
				this.$http.post('/recycle/goods/list', this.goodsRequest).then(res => {
					let rows = res.data.rows
					if (rows.length < this.goodsRequest.pageSize) {
						this.goodsRequest.over = true
					}
					if (rows.length > 0) {
						this.goods = this.goods.concat(rows)
					}
				}).catch(err => {
					this.goodsStatus = 'loadmore'
				}).finally(() => {
					this.goodsStatus = 'nomore'
				})
			},

			// 重新加载商品列表
			goodsListErrorHandle() {
				this.getGoodsList()
			},
			
			// 跳转到商品详情页
			toGoods(goodsID) {
				uni.navigateTo({ url: '/pages/goods/index?goodsID=' + goodsID + '&from=shopping' })
			},
			
			//发送渠道信息
			sendChannel(channelName){
				if (channelName != null)
					this.$http.post('recycle/channel/add', {'channelName': channelName, 'links': 'pages/index/index' + '?channelName=' + channelName},).then(res => {})
					.catch(err => {
							tip.confirm('渠道信息添加失败', true).then(() => {})
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		position: relative;
	}

	.top-background {
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 239rpx;
		background: #44aa67;
		z-index: -1;
	}

	.title {
		position: sticky;
		top: 0rpx;
		padding: 30rpx 0;
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 42rpx;
		background: #44aa67;
		z-index: 999;
	}

	.swiper {
		height: 400rpx;
	}
</style>
