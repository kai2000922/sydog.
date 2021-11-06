<template>
	<view class="container">
		<view class="top-background"/>
		<step step-style="padding: 63rpx 0;" :dataList="stepList" />
		<index-swiper/>
		
		<s-panel>
			<index-grid :gridList="gridList"/>
		</s-panel>

		<s-panel>
			<view style="padding-left: 32rpx;">
				<orde-form :addressObj.sync="addressInfo" :date.sync="orderInfo.expectTime" :weight.sync="orderInfo.expectWeight"/>
			</view>
			<view style="display: flex; align-items: center; justify-content: center; margin-top: 48rpx;">
				<s-button background="#43A668" width="570" height="120" color="#FFFFFF" @click="sendData" text="预约上门回收"/>
			</view>
			<!-- 首页-我的订单图标 -->
			<view class="movable_box">
				<movable-area>
					<movable-view direction="vertical">
						<image @click="toRecycleOrders" src="@/static/sydd.png"/>
					</movable-view>
				</movable-area>
			</view>
		</s-panel>

		<s-panel>
			<view class="goods_box_title">
				<text>兑换好礼专区</text>
			</view>
			<view>
				<!-- <text class="swiper_item_title">总回收重量≥5kg可兑换以下好礼</text> -->
				<s-goods item-type="1" :goods-list="goodsList" :item-style="{paddingTop: '56rpx'}" @itemClick="toGoodPage"/>
				<u-loadmore margin-top="20" :status="goodsStatus" :load-text="goodsLoadText" @loadmore="goodsListErrorHandle"/>
			</view>
		</s-panel>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import step from '@/components/pages/step'
	import indexSwiper from './components/index-swiper'
	import indexGrid from './components/index-grid'
	import ordeForm from '@/components/pages/oder-form'
	import sGoods from '@/components/pages/s-goods'
	import sButton from '@/components/pages/s-button'
	import sGoodsItem from '@/components/pages/s-goods-item'
	
	import api from '@/utils/api.js'


	export default {
		components: {
			sPanel,
			sGoods,
			step,
			indexSwiper,
			indexGrid,
			ordeForm,
			sButton,
			sGoodsItem
		},
		data() {
			return {
				stepList: [{
						index: '01',
						span: '4',
						choice: true,
						title: '预约回收',
						subTitle: '提交信息'
					},
					{
						index: '02',
						span: '4',
						choice: false,
						title: '上门取衣',
						subTitle: '免费上门0运费'
					},
					{
						index: '03',
						span: '4',
						choice: false,
						title: '换好礼',
						subTitle: '付邮领取'
					}
				],
				gridList: [{
						img: '/static/itemize/yiwu.png',
						text: '衣物'
					},
					{
						img: '/static/itemize/xiexue.png',
						text: '鞋靴'
					},
					{
						img: '/static/itemize/maozi.png',
						text: '帽子'
					},
					{
						img: '/static/itemize/baobao.png',
						text: '包包'
					},
					{
						img: '/static/itemize/chuangdan.png',
						text: '床单'
					}],
				goodsList: [],
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
				orderInfo: {
					user: '',
					phone: '',
					isNow: '1',
					name: '',
					prov: '',
					city: '',
					expectTime: '',
					expectWeight: 8,
					address: '',
					area: '',
					orderStatus: '待上门',
				},
				addressInfo: {}
			}
		},
		created() {
			api.getUserId()
			this.getGoodsList()
		},
		onReachBottom() {
			if(!this.goodsRequest.over) {
				this.getGoodsList()
			}
		},
		methods: {
			
			// 获取商品列表
			getGoodsList() {
				this.goodsStatus = 'loading'
				this.goodsRequest.pageNum++
				this.$http.post('/recycle/goods/list', this.goodsRequest).then(res => {
					let rows = res.data.rows
					if(rows.length < this.goodsRequest.pageSize) {
						this.goodsRequest.over = true
					}
					if(rows.length > 0) {
						this.goodsList = this.goodsList.concat(rows)
					}
				}).catch( res => {
					this.$tip.toast('商品加载失败，请点击重新加载')
					this.goodsStatus = 'loadmore'
				}).finally(() => {
					this.goodsStatus = 'nomore'
				})
			},
			
			// 重新加载商品列表
			goodsListErrorHandle() {
				this.getGoodsList()
			},
			
			// 跳转到商品页面
			toGoodPage(goods){
				uni.navigateTo({
					url:'/pages/goods/goods?goodID=' + goods.goodID + '&buy=1'
				})
			},

			sendData() {
				if (this.orderInfo.expectTime == '' || this.addressInfo.prov == null){
					this.$tip.toast("请补全信息！")
					return
				}
				if(this.$store.getters.userid === '') {
					this.getUserId()
					return
				}
				this.orderInfo.user = this.$store.getters.userid
				this.orderInfo.name = this.addressInfo.fullname
				this.orderInfo.phone = this.addressInfo.mobilePhone
				this.orderInfo.prov = this.addressInfo.prov
				this.orderInfo.city = this.addressInfo.city
				this.orderInfo.area = this.addressInfo.area
				this.orderInfo.address = this.addressInfo.prov + this.addressInfo.city + this.addressInfo.area + this.addressInfo.street + this.addressInfo.address
				this.$tip.loading('请求中')
				this.$http.post('recycle/recycle/add', this.orderInfo).then(res => {
					this.$tip.loaded()
					uni.navigateTo({ url:'/pages/collect/index' })
				}).catch(res => {
					this.$tip.loaded()
					this.$tip.toast('请求失败，请稍后重试')
				})
			},
			
			toRecycleOrders() {
				uni.navigateTo({ url: '/pages/recycle_orders/recycle_orders' })
			},

			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.tabConfig.index = index;
				} else {
					this.tabConfig.index = e;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.container {
		position: relative;
	}
	
	.top-background {
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 300rpx;
		background: #44aa67;
		z-index: -1;
	}
	
	.movable_box {
		position: absolute;
		top: 0;
		right: -30rpx;
		height: 666rpx;
		width: 30rpx;
		
		&>movable-area {
			height: 100%;
			width: 100%;
			
			&>movable-view {
				height: 105rpx;
				border-top-left-radius: 53rpx;
				border-bottom-left-radius: 53rpx;
				width: 150rpx;
				margin-left: -120rpx;
				overflow: hidden;
				
				&>image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
	}
	
	.goods_box_title {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		&>text {
			font-family: PingFangSC-Semibold;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
			
			&::after {
				content: '';
				margin: 4rpx auto 0 auto;
				display: block;
				width: 80rpx;
				height: 6rpx;
				background-image: linear-gradient(270deg, #F7970D 0%, #FFD678 100%);
				border-radius: 3rpx;
			}
		}
	}
	
	.swiper_item_title {
		margin-top: 56rpx;
		margin-bottom: 36rpx;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bold;
		color: $s_font_color;
		letter-spacing: 0;
		line-height: 42rpx;
		
		&::before {
			content: '';
			display: block;
			margin-right: 16rpx;
			width: 16rpx;
			height: 16rpx;
			border-radius: 8rpx;
			background: #FA9E19;
		}
	}
</style>

