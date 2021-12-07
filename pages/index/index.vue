<template>
	<view class="content">
		<view class="top-background" />
		<step :step-style="{marginBottom: '40rpx'}"/>

		<!-- 轮播图 -->
		<s-swiper :from="0"/>

		<s-goods-swiper :list="storeList" @goodsClick="toGoods"/>

		<view style="margin-top: 15rpx;">
			<scroll-view scroll-x="true" class="scroll_x" :scroll-left="left" scroll-with-animation>
				<s-order v-for="(item, index) in recycleList" :key="index" :order="item" @update="getRecycle"/>
				<view style="width: 750rpx; flex-shrink: 0;">
					<image style="width: 100%;" src="@/static/index/liucheng.png" mode="widthFix"/>
				</view>
			</scroll-view>	
		</view>

		<view class="monitor-box" style="z-index: 1;">
			<s-panel :custom-style="{marginTop: '0rpx', paddingBottom: '0rpx'}">
				<view style="padding-left: 32rpx;">
					<s-form :addressObj.sync="addressInfo" :date.sync="orderInfo.expectTime"
						:weight.sync="orderInfo.expectWeight"/>
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-top: 48rpx;">
					<form @submit="sendData" @reset="formReset" report-submit="true">
						<view class="monitor-btn" style="padding-bottom: 30rpx;">
							<s-button background="#43A668" width="570" height="120" color="#FFFFFF"
								text="预约上门回收" />
						</view>
					</form>
				</view>
			</s-panel>
		</view>

		<uni-transition custom-class="transition" :mode-class="['fade', 'slide-bottom']" :show="btnShow">
			<s-button width="630" height="120" color="#FFFFFF" bgImg="linear-gradient(270deg, #43A668 0%, #30BB63 100%)"
				:custom-style = "{ boxShadow: '0 2rpx 16rpx 0 rgba(67,166,104,0.56)' }"
				text="预约上门回收"
				@click="toForm"/>
		</uni-transition>

		<!-- 问题 -->
		<s-problem />

	</view>
</template>

<script>
	import step from '@/components/pages/step'
	import sSwiper from './components/s-swiper'
	import sGoodsSwiper from './components/s-goods-swiper'
	import sPanel from '@/components/pages/s-panel'
	import sForm from '@/components/pages/s-form'
	import sButton from '@/components/pages/s-button'
	import sProblem from './components/s-problem'
	import sOrder from './components/s-order'

	import api from '@/utils/api.js'

	export default {
		components: {
			step,
			sSwiper,
			sGoodsSwiper,
			sPanel,
			sForm,
			sButton,
			sProblem,
			sOrder
		},
		data() {
			return {
				// 显示高度
				viewHeight: 0,
				// 表单高度
				formHeight: 0,
				// 表单距离顶部距离
				formTop: 0,
				// 按钮高度
				btnHeight: 0,
				// 固定按钮是否显示
				btnShow: true,
				// 滑动中？
				isScroll: false,
				// 进行中的订单
				recycleList: [],
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
					authCode: '',
					channelSource: '',
					orderStatus: '待上门',
				},
				// 地址信息
				addressInfo: {},
				// 商品展示列表
				storeList: []
			}
		},
		onShareAppMessage () {
		    return api.getShareObject()
		},
		onLoad(options) {
			uni.setNavigationBarTitle({ title: '' })
			uni.setBackgroundColor({ backgroundColor: '#fafffc' })
			uni.setNavigationBarColor({ backgroundColor: '#44aa67' })
			this.sendChannel(options.channelName)
		},
		onShow() {
			this.getRecycle()
		},
		created() {
			api.login()
			this.getStoreList()
			this.getRecycle()
		},
		mounted() {
			let that = this
			this.$nextTick().then(function () {
				that.scrollDataLoad()
			})
		},
		onPageScroll() {
			if(this.isScroll) {
				return
			}
			uni.createSelectorQuery().select('.monitor-box').boundingClientRect(data => {
				if(this.viewHeight - data.top >= data.height - this.btnHeight && data.height + data.top >= 0) {
					this.btnShow = false
				}
				else {
					this.btnShow = true
				}
			}).exec();
		},
		methods: {
			// 准备滚动所需数据
			scrollDataLoad() {
				 uni.createSelectorQuery().select('.monitor-btn').boundingClientRect(data => {
					this.btnHeight = data.height
				}).exec()
				uni.createSelectorQuery().select('.monitor-box').boundingClientRect(data => {
					this.formHeight = data.height
					this.formTop = data.top
				}).exec()
				this.viewHeight = uni.getSystemInfoSync().windowHeight
			},

			// 创建回收订单
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
				// 判断表单是否完整
				if (this.orderInfo.expectTime == '' || this.addressInfo.prov == null) {
					this.$tip.toast("请补全信息！")
					return
				}
				// 判断是否登录
				api.login().then(flag => {
					if(flag) {
						this.orderInfo.user = this.$store.getters.userid
						this.orderInfo.name = this.addressInfo.fullname
						this.orderInfo.phone = this.addressInfo.mobilePhone
						this.orderInfo.prov = this.addressInfo.prov
						this.orderInfo.city = this.addressInfo.city
						this.orderInfo.area = this.addressInfo.area
						this.orderInfo.authCode = e.detail.formId
						this.orderInfo.address = this.addressInfo.prov + this.addressInfo.city + this.addressInfo.area + this
							.addressInfo.street + this.addressInfo.address
						this.$tip.loading('请求中')
						this.$http.post('recycle/recycle/add', this.orderInfo).then(res => {
							this.getRecycle()
							this.$store.commit('SET_RECYCLERELOAD', true)
							uni.navigateTo({ url: '/pages/collect/index' })
						})
					}
				})
			},
			
			// 获取订单
			async getRecycle() {
				let flag = await api.login()
				if(flag) {
					let dsm = await this.$http.post('/recycle/recycle/list', {user: this.$store.getters.userid, orderStatus: '待上门'})
					this.recycleList = dsm.data.rows
				}
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

			// 滚动到表单
			toForm() {
				this.isScroll = true
				this.btnShow = false
				uni.pageScrollTo({
					scrollTop: this.formTop - (this.viewHeight - this.formHeight) / 2 + 30,
					duration: 300,
					complete: () => {
						this.isScroll = false
					}
				})
			},

			toGoods(goodsId){
				uni.navigateTo({ url: '/pages/goods/index?goodsID=' + goodsId + '&from=shopping' })
			},

			sendChannel(channelName){
				if (channelName != null){
					this.$http.post('recycle/channel/add', {'channelName': channelName, 'links': 'pages/index/index' + '?channelName=' + channelName},).then(res => {})
					.catch(err => { tip.confirm('渠道信息添加失败', true).then(() => {}) })
					this.orderInfo.channelSource = channelName
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/deep/ ::-webkit-scrollbar {
		display: none;//设置隐藏
		width: 0 !important;//设置大小
		height: 0 !important;//设置大小
		-webkit-appearance: none;
		background: transparent;
	}
	
	.content {
		position: relative;
	}

	/deep/ .transition {
		position: fixed;
		bottom: 20rpx;
		width: 100%;
		display: flex;
		justify-content: center;
		z-index: 666;
	}
	
	.scroll_x {
		margin-bottom: 30rpx;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
	}
</style>
