<template>
	<view class="content">
		<view class="top-background" />
		<step :step-style="{marginBottom: '40rpx'}" :dataList="stepList" />
		
		<!-- 轮播图 -->
		<s-swiper/>
		
		<s-goods-swiper :list="storeList" @goodsClick="toGoods"/>
		
		<!-- 流程 -->
		<s-flow />
		
		<!-- 我的订单 -->
		<view class="sticky">
			<image @click="toRecycleOrders" src="@/static/wdddicon.png" />
		</view>

		<view class="form">
			<s-panel :custom-style="{marginTop: '0', marginBottom: '10rpx'}">
				<view style="padding-left: 32rpx;">
					<s-form :addressObj.sync="addressInfo" :date.sync="orderInfo.expectTime"
						:weight.sync="orderInfo.expectWeight"/>
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-top: 48rpx;">
					<form @submit="sendData" @reset="formReset" report-submit="true">
					<s-button background="#43A668" width="570" height="120" color="#FFFFFF" @click="sendData"
						text="预约上门回收" />
					<!-- <button form-type="submit">Submit</button> -->
					</form>
				</view>
			</s-panel>
			<!-- 首页-我的订单图标 -->
<!-- 			<view class="movable_box">
				<movable-area>
					<movable-view direction="vertical">
						<image @click="toRecycleOrders" src="@/static/wdddicon.png" />
					</movable-view>
				</movable-area>
			</view> -->
		</view>

		<!-- 问题 -->
		<s-problem />

	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sSwiper from './components/s-swiper'
	import sGoodsSwiper from './components/s-goods-swiper'
	import sFlow from './components/s-flow'
	import sPanel from '@/components/pages/s-panel'
	import sForm from '@/components/pages/s-form'
	import sButton from '@/components/pages/s-button'
	import sProblem from './components/s-problem'

	import api from '@/utils/api.js'

	export default {
		components: {
			step,
			sSwiper,
			sGoodsSwiper,
			sFlow,
			sPanel,
			sForm,
			sButton,
			sProblem
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
						title: '完成',
						subTitle: '回收完成'
					}
				],
				// 订单表单
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
				// 地址信息
				addressInfo: {},
				// 商品展示列表
				storeList: []
			}
		},
		onLoad(options) {
			uni.setNavigationBarTitle({ title: '' })
			uni.setBackgroundColor({ backgroundColor: '#fafffc' })
			uni.setNavigationBarColor({ backgroundColor: '#44aa67' })
			this.sendChannel(options.channelName)
		},
		created() {
			api.getUserId()
			this.getStoreList()
		},
		methods: {
			sendData(e) {
				// 示例
				my.getAuthCode({
				  // 订单服务授权：order_service。如需同时获取用户多项授权，可在 scopes 中传入多个 scope 值。
				  scopes: ['order_service'],
				  success: (res) => {
				    console.log(res)
				  },
				  fail: (res) => {
					  console.log(res)
				    // 订单服务授权失败，根据自己的业务场景来进行错误处理
				  },
				});
				if (this.orderInfo.expectTime == '' || this.addressInfo.prov == null) {
					this.$tip.toast("请补全信息！")
					return
				}
				if (this.$store.getters.userid === '') {
					api.getUserId()
				}
				this.orderInfo.user = this.$store.getters.userid
				this.orderInfo.name = this.addressInfo.fullname
				this.orderInfo.phone = this.addressInfo.mobilePhone
				this.orderInfo.prov = this.addressInfo.prov
				this.orderInfo.city = this.addressInfo.city
				this.orderInfo.area = this.addressInfo.area
				this.orderInfo.address = this.addressInfo.prov + this.addressInfo.city + this.addressInfo.area + this
					.addressInfo.street + this.addressInfo.address
				this.$tip.loading('请求中')
				this.$http.post('recycle/recycle/add', this.orderInfo).then(res => {
					uni.navigateTo({
						url: '/pages/collect/index?from=index'
					})
				})
				
			},
			
			// 首页商品展示
			getStoreList() {
				this.storeList = []
				this.$http.get('/recycle/goods/getStoreList').then(res => {
					res.data.data.forEach(obj => {
						obj = JSON.parse(obj)
						if(obj.img.charAt(obj.img.length - 1) === ';') {
							obj.img = api.getImgUrl(obj.img.substr(0, obj.img.length - 1))
						}
						this.storeList.push(obj)
					})
				})
			},
			
			toRecycleOrders() {
				uni.navigateTo({ url: '/pages/recycle_orders/index' })
			},
			
			toGoods(goodsId){
				uni.navigateTo({ url: '/pages/goods/index?goodsID=' + goodsId + '&from=shopping' })
			},
			
			sendChannel(channelName){
				if (channelName != null)
					this.$http.post('recycle/channel/add', {'channelName': channelName, 'links': 'pages/index/index' + '?channelName=' + channelName},).then(res => {})
					.catch(err => { tip.confirm('渠道信息添加失败', true).then(() => {}) })
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
		height: 300rpx;
		background: #44aa67;
		z-index: -1;
	}
	
	.sticky {
		position: sticky;
		margin-left: 624rpx;
		top: 35%;
		display: flex;
		justify-content: flex-end;
		height: 88rpx;
		width: 126rpx;
		border-top-left-radius: 53rpx;
		border-bottom-left-radius: 53rpx;
		z-index: 999;
		overflow: hidden;

		&>image {
			height: 100%;
			width: 100%;
		}
	}
	
	.form {
		margin-top: -88rpx;
	}

	// .movable_box {
	// 	position: absolute;
	// 	top: 0;
	// 	bottom: 0;
	// 	right: 0rpx;
	// 	width: 30rpx;
		
	// 	&>movable-area {
	// 		height: 100%;
	// 		width: 100%;

	// 		&>movable-view {
	// 			height: 88rpx;
	// 			border-top-left-radius: 53rpx;
	// 			border-bottom-left-radius: 53rpx;
	// 			width: 126rpx;
	// 			margin-left: -96rpx;
	// 			overflow: hidden;

	// 			&>image {
	// 				width: 100%;
	// 				height: 100%;
	// 			}
	// 		}
	// 	}
	// }
</style>
