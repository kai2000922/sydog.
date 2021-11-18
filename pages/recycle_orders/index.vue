<template>
	<view class="page flex_colum">
		<liuyuno-tabs :config="{height: '110rpx', lineHeight: '110rpx', underLineBottom: '26rpx'}"
			:tabData="tabs.list" :activeIndex="tabs.index" @tabClick="onswiperchange" />
		<swiper class="page_swiper" :current="tabs.index" @change="onswiperchange">
			<swiper-item class="page_swiper_item">
				<scroll-view class="page_swiper_item_view" style="flex: 1;" enableBackToTop="true" scroll-y>
					<u-empty v-if="isNull.recycle" text="订单为空" mode="order" />
					<view v-for="(item, index) in recycleList">
						<recyle :item="item" @formChange="showUpdate" @update="updateRecycle(item.recycleID, -2)" @delete="deleteRecycle(item)" @sto="toEnd(item.actualWeight)"/>
					</view>
				</scroll-view>
			</swiper-item>
			<swiper-item class="page_swiper_item">
				<scroll-view class="page_swiper_item_view" style="flex: 1;" enableBackToTop="true" scroll-y>
					<u-empty v-if="isNull.order" text="订单为空" mode="order"/>
					<order 
						v-for="(item, index) in orderList" 
						:key="index" 
						:item="item"
						@zfClick="toPayment"
						@tkClick="refund"/>
				</scroll-view>
			</swiper-item>
		</swiper>
		
		<!-- 修改订单弹窗 -->
		<u-popup v-model="alterPopup" height="85%" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view class="alter">
				<view class="alter_title">
					<text>修改订单信息</text>
				</view>
				<view class="alter_form">
					<s-form :addressObj.sync="updateInfo.expectAddress" :date.sync="updateInfo.expectTime" :weight.sync="updateInfo.expectWeight" :address="updateInfo.expectAddressLabel" :contacts="updateInfo.contacts" />
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-bottom: 48rpx;">
					<s-button background="#43A668" width="690" height="120" color="#FFFFFF" :custom-style="{}" text="确认修改" @click="updateRecycle(updateInfo.recycleID, -1)" />
				</view>
			</view>
		</u-popup>
		
		<!-- 退款弹窗 -->
		<refund :refund-show.sync="refundPopup" :ok-show.sync="refundOkPopup" :tkObj="tkObj"  @tk="tk"/>
		
		<view class="abs_view">
			<view class="abs_view_btn" @click="toHome">
				<image src="@/static/order_home.png"></image>
			</view>
			<view class="abs_view_btn">
				<contact-button tnt-inst-id="n8c_Hb8w" scene="SCE01205269" color="#30BB63" size="50" icon="https://hkkkkk.cn:8080/profile/upload/2021/11/09/2a1f5a55-11a1-4d27-bcaa-f15416cfa50a.png"/>
			</view>
		</view>
	</view>
</template>

<script>
	import dotLine from '@/components/pages/s-dot-line'
	import sPanel from '@/components/pages/s-panel'
	import sButton from '@/components/pages/s-button'
	import sForm from '@/components/pages/s-form'
	import recyle from './components/recycle'
	import order from './components/order'
	import refund from '@/components/pages/refund'

	import api from '@/utils/api.js'

	export default {
		components: {
			dotLine,
			sPanel,
			sButton,
			sForm,
			recyle,
			order,
			refund
		},
		data() {
			return {
				// tabs
				tabs: {
					index: 0,
					list: [
						'旧衣回收订单',
						'商城订单'
					]
				},
				// 回收订单数据
				recycleList: [],
				// 商品订单
				orderList: [],
				// 数据为空
				isNull: {
					recycle: true,
					order: true
				},
				// 修改弹出层
				alterPopup: false,
				// 修改表单
				updateInfo: {
					recycleID: '',
					contacts: '',
					expectTime: '',
					expectWeight: 0,
					expectAddressLabel: '',
					expectAddress: {}
				},
				// 退款弹出层
				refundPopup: false,
				// 退款成功弹出层
				refundOkPopup: false,
				// 需要退款的订单
				tkObj: {
					// 图片
					img: '',
					// 商品名
					goodsName: '商品',
					// 规格
					goodsType: '规格',
					// 画线价格
					hxPrice: 30,
					// 运费
					expressPrice: 10,
					// 支付价格
					zfPrice: 10
				},
				tkQuery: undefined,
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({title: ''})
			uni.setBackgroundColor({backgroundColor: '#fafffc'})
			uni.setNavigationBarColor({backgroundColor: '#FFFFFF'})
		},
		onShow() {
			if(this.$store.getters.userid === '') {
				api.getUserId().then(() => {
					this.getRecycleList()
					this.getOrderList()
				})
			} else {
				this.getRecycleList()
				this.getOrderList()
			}
		},
		watch: {
			recycleList: {
				handler(newValue, oldValue) {
					if (this.recycleList.length === 0) {
						this.isNull.recycle = true
					} else {
						this.isNull.recycle = false
					}
				},
				deep: true
			},
			orderList: {
				handler(newValue, oldValue) {
					if(this.orderList.length === 0) {
						this.isNull.order = true
					} else {
						this.isNull.order = false
					}
				},
				deep: true
			}
		},
		methods: {
			// 标题页改变
			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.tabs.index = index;
				} else {
					this.tabs.index = e;
				}
			},
			
			// 修改弹窗弹出
			showUpdate(item) {
				this.updateInfo.recycleID = item.recycleID
				this.updateInfo.contacts = item.name + ' ' + item.phone
				this.updateInfo.expectAddressLabel = item.address
				this.updateInfo.expectTime = item.expectTime
				this.updateInfo.expectWeight = item.expectWeight
				this.alterPopup = true
			},

			// 删除回收订单
			deleteRecycle(item) {
				this.$tip.loading('删除中')
				if (item.recycleID !== '') {
					this.$http.post('/recycle/recycle/removeOrder', {ids: item.recycleID}).then(res => {
						this.$tip.success('删除成功')
						this.getRecycleList()
					})
				} else {
					this.$tip.toast('订单不存在')
				}
			},

			//获取回收订单
			getRecycleList() {
				this.$tip.loading()
				this.recycleList = []
				console.log(this.$store.getters.userid)
				this.$http.post('/recycle/recycle/list', {user: this.$store.getters.userid}).then(res => {
					this.recycleList = res.data.rows.reverse()
				})
				// this.recycleList = [
				// 	{
				// 		searchValue: null, 
				// 		createBy: null,
				// 		createTime: "2021-11-17 19:46:15",
				// 		updateBy: null,
				// 		updateTime: null,
				// 		remark: null,
				// 		params: {},
				// 		recycleID: 199,
				// 		user: "2088422584081420",
				// 		name: "Alpha",
				// 		prov: "浙江省",
				// 		city: "杭州市",
				// 		area: "西湖区",
				// 		address: "浙江省杭州市西湖区西溪路阿里巴巴西溪园区 不放自提柜 送到家 送到家 送到家 送到家",
				// 		phone: "158***5632",
				// 		expectWeight: 17,
				// 		actualWeight: 18,
				// 		isNow: 1,
				// 		expectTime: "2021-11-17 09:00:00",
				// 		receiveAddId: 5,
				// 		expressNum: null,
				// 		expressPrice: null,
				// 		expressVlo: null,
				// 		expressStatus: null,
				// 		expressUpdateTime: null,
				// 		courier: '圆通 张三 13258632456',
				// 		channelNum: "FYSD1637149574510",
				// 		channelSource: null,
				// 		orderStatus: "邮寄中",
				// 		cacelReason: "等待发送订单",
				// 		billingTime: null,
				// 		orderNum: "1637149574510",
				// 	}
				// ]
			},

			/*
				orderID 订单ID
				status 修改后的订单状态，
				param 修改订单后附带的参数
				1. 取消原因
				2. 修改时间 字符串 yyyy-mm-dd hh-mm-ss
				3. 修改地址 重新获取后拼接成的字符串，由
				省份 城市 地区 详细地址 姓名 联系电话 6部分组成，中间用英文";"分割。
			*/
			updateRecycle(recycleID, status) {
				this.$tip.loading('修改中')
				this.$http.post('/recycle/recycle/editOrder', {
					orderStatus: status,
					param: this.getAddressString(),
					orderID: recycleID
				}).then(res => {
					this.$tip.success('修改成功！')
					this.getRecycleList()
				}).finally(() => {
					this.alterPopup = false
				})
			},

			getAddressString() {
				//修改后的收货地址
				let addressInfo = this.updateInfo.expectAddress.prov == null ? ' ' : this.updateInfo.expectAddress.prov +
					";" + this.updateInfo.expectAddress.city + ";" + this.updateInfo.expectAddress.area + ";" +
					this.updateInfo.expectAddress.prov + this.updateInfo.expectAddress.city + this.updateInfo.expectAddress
					.area + this.updateInfo.expectAddress.street +
					this.updateInfo.expectAddress.address + ";" + this.updateInfo.expectAddress.fullname + ";" + this
					.updateInfo.expectAddress.mobilePhone

				//修改后的时间
				let timeInfo = this.updateInfo.expectTime

				//修改后的期望重量
				let weightInfo = this.updateInfo.expectWeight

				return timeInfo + "," + weightInfo + "," + addressInfo
			},
			
			// 获取商品订单列表
			getOrderList() {
				this.$tip.loading()
				this.orderList = []
				this.$http.post('/recycle/orders/list',{ userId: this.$store.getters.userid }).then(res => {
					this.orderList = res.data.rows.reverse()
				})
			},
			
			// 前往支付页面
			toPayment(waitPayOrder) {
				this.$store.commit('SET_WAITPAYORDER', waitPayOrder)
				uni.navigateTo({ url: '/pages/payment/index?from=order' });
			},
			
			// 退款弹窗
			refund(tkObj, tkQuery) {
				this.tkObj = tkObj
				this.tkQuery = tkQuery
				this.refundPopup = true
			},
			
			// 退款
			tk() {
				this.$tip.loading('退款中...')
				this.$http.post('/recycle/orders/refund', this.tkQuery).then(res => {
					this.refundPopup = false
					this.refundOkPopup = true
					this.getOrderList()
				})
			},
			
			// 首页
			toHome() {
				uni.navigateBack({ delta: getCurrentPages().length });
			},
			
			// 
			toEnd(actualWeight) {
				uni.navigateTo({ url: '/pages/end/index?from=order&actualWeight=' + actualWeight});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.page {
		position: relative;
		height: 100vh;
		
		&_swiper {
			flex: 1;
		
			&_item {
				height: 100%;
				flex: 1;
				flex-direction: column;
		
				&_view {
					position: absolute;
					left: 0;
					top: 0;
					right: 0;
					bottom: 0;
					flex-direction: column;
				}
			}
		}
	}

	.alter {
		&_title {
			display: flex;
			justify-content: center;
			margin-top: 40rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 54rpx;
		}

		&_form {
			padding: 56rpx 92rpx 48rpx 92rpx;
		}
	}
	
	.abs_view {
		position: absolute;
		bottom: 160rpx;
		right: 30rpx;
		
		&>view:first-child {
			margin-top: 0rpx;
		}
		
		&_btn {
			margin-top: 20rpx;
			width: 100rpx;
			height: 100rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #FFFFFF;
			box-shadow: 0 9rpx 26rpx 0 rgba(24,67,40,0.15);
			border-radius: 40rpx;
			
			&>image {
				width: 100rpx;
				height: 100rpx;
				vertical-align: middle;
			}
		}
	}
</style>
