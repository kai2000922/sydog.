<template>
	<view class="content flex_colum">
		<view style="height: 460rpx;" class="top-background" />

		<view class="flex_row flex_ai_center flex_jc_center title">小鸽商城</view>

		<s-swiper :from="1"/>

		<s-panel>
			<liuyuno-tabs :tabData="tabs.list" :activeIndex="tabs.index" @tabClick="onswiperchange" :config="{underLineBottom: '0'}"/>
			<view style="padding-top: 50rpx;">
				<view v-show="tabs.index === 0" class="flex_row flex_ai_center" style="padding: 0 0 36rpx 0;">
					<s-dot size="16"/>
					<text class="font_28 font_bold color_black" style="margin-left: 8rpx;">预约旧衣回收，即可付邮兑换以下好礼</text>
				</view>
				<!-- 防止图片闪烁，使用v-show控制显示列表 -->
				<view v-show="tabs.index === 0" class="flex_row flex_jc_between flex_warp">
					<goods-item v-for="(item, index) in goods[0]" :key="index" :item="item"
						:custom-style="index >= 2 ? {marginTop: '50rpx'} : {}"
						@goodsClick="toGoods"/>
				</view>
				<view v-show="tabs.index === 1" class="flex_row flex_jc_between flex_warp">
					<goods-item v-for="(item, index) in goods[1]" :key="index" :item="item"
						:custom-style="index >= 2 ? {marginTop: '50rpx'} : {}"
						@goodsClick="toGoods"/>
				</view>
				<u-loadmore margin-top="20" :status="goodsStatus" :load-text="goodsLoadText"
					@loadmore="goodsListErrorHandle" />
			</view>
		</s-panel>
		
		<u-back-top duration="300" :scroll-top="scrollTop"></u-back-top>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sSwiper from '@/pages/index/components/s-swiper'
	import goodsItem from './components/goods-item'
	import sDot from '@/components/pages/s-dot'

	import api from '@/utils/api.js'

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
					list: ['回收福利专区', '直销专区']

				},
				// 商品列表
				goods: [[], []],
				// 请求参数
				goodsRequest: [
					{
						pageSize: 10,
						pageNum: 0,
						channel: 1,
						over: false
					},
					{
						pageSize: 10,
						pageNum: 0,
						channel: 0,
						over: false
					}
				],
				// 加载状态
				goodsStatus: 'loading',
				// 加载提示
				goodsLoadText: {
					loadmore: '重新加载',
					loading: '正在加载...',
					nomore: '没有更多了'
				},
				// 滚动距离
				scrollTop: 0
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
			api.login().then(flag => {
				this.getGoodsList()
			})
		},
		watch: {
			'tabs.index': {
			    handler(newVal, oldVal) {
					this.getGoodsList()
			    },
			  }
		},
		onShareAppMessage () {
		    return api.getShareObject()
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 滚动到底事件
		onReachBottom() {
			if (!this.goodsRequest[this.tabs.index].over) {
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
				let num = this.tabs.index
				this.goodsRequest[num].pageNum++
				this.$http.post('/recycle/goods/list', this.goodsRequest[num]).then(res => {
					let rows = res.data.rows
					if (rows.length < this.goodsRequest[num].pageSize) {
						this.goodsRequest[num].over = true
					}
					if (rows.length > 0) {
						this.goods[num] = this.goods[num].concat(rows)
					} else {
						this.goodsRequest[num].pageNum--
					}
				}).catch(err => {
					this.goodsRequest[num].pageNum--
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
				uni.navigateTo({ url: '/pages/goods/index?goodsID=' + goodsID })
			},

			//发送渠道信息
			sendChannel(channelName){
				if (channelName != null) {
					this.$http.post('recycle/channel/add', {'channelName': channelName, 'links': 'pages/index/index' + '?channelName=' + channelName},).then(res => {})
					.catch(err => {
							tip.confirm('渠道信息添加失败', true).then(() => {})
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	image {
		will-change: transform
	}
	.content {
		position: relative;
	}

	.title {
		position: sticky;
		top: 0rpx;
		padding: 25rpx 0;
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bold;
		color: #FFFFFF;
		letter-spacing: 0;
		line-height: 42rpx;
		background: #44aa67;
		z-index: 999;
	}
</style>
