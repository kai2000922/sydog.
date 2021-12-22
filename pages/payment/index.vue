<template>
	<view class="payment">
		<view class="payment_main">
			<pickup :address.sync="address"/>
			<order :img="goods.images" :goods-name="goods.goodsName" :goods-describe="goods.goodsDescribe" :hx-price="goods.hxPrice" :channel="parseInt(goods.channel)" :express-price="goods.expressPrice" :yh-price="goods.yhPrice" :zf-price="goods.zfPrice"/>
		</view>
		<view class="payment_bottom">
			<collection :zfPrice="goods.yhPrice + goods.expressPrice" @zfBtnClick="payBeforeHandler"/>
		</view>
	</view>
</template>

<script>
	import Pickup from './components/pickup'
	import Order from './components/order'
	import Collection from './components/collection'
	import Qs from 'qs'

	import { queryOrderStatus, queryOrderNum } from '@/utils/api/ali.js'
	import { login, getImgUrl } from '@/utils/common.js'
	import { addOrder, editOrder, editOrderForStatus } from '@/utils/api/order.js'
	import { getGoodsById } from '@/utils/api/goods.js'
	import { getUser } from '@/utils/api/user.js'
	
	export default {
		components: {
			Pickup,
			Order,
			Collection
		},
		data() {
			return {
				// 商品id
				goodsId: undefined,
				// 商品
				goods: {},
				// 来自
				from: '',
				// 订单号
				orderNum: undefined,
				// 表单
				orderNumQuery: {
					title: undefined,
					price: undefined,
					userID: undefined
				},
				// 收货方
				address: {
					// 联系人
					user: '',
					// 联系电话
					phone: '',
					// 省
					prov: '',
					// 市
					city: '',
					// 区
					area: '',
					// 路
					street: '',
					// 详细地址
					address: ''
				},
				// 商品订单表单
				orderQuery: {
					// 订单id
					ordersID: undefined,
					// 订单号
					ordersNum: undefined,
					// 商品id
					goodsId: undefined,
					// 商品名称
					goodsName: undefined,
					// 商品规格
					goodsType: undefined,
					// 支付价格
					zfPrice: undefined,
					// 用户id
					userId: undefined,
					// 用户名称
					userName: undefined,
					// 手机号
					userPhone: undefined,
					// 收货地址
					userAddress: undefined,
					// 支付宝订单号
					tradeNo: undefined,
					// 订单状态
					ordersStatus: undefined
				},
				// 用户
				user: {},
				// 错误？
				err: false,
				// 错误码
				errCode: 0,
				// 错误信息
				errMsg: '',
				// 请求次数
				frequency: 0,
				// 订单是否修改
				orderCreat: false,
				// 支付完成？
				isPay: false
			}
		},
		onLoad(option) {
			uni.setNavigationBarColor({ backgroundColor: '#FFFFFF' })
			this.from = option.from
			if(this.from === 'order') {
				let waitPayOrder = this.$store.getters.waitPayOrder
				
				if(!waitPayOrder) {
					this.err = true
					this.errMsg = '未找到待支付订单~请稍后重试'
					this.$tip.toast(this.errMsg)
				}
				
				this.goodsId = waitPayOrder.goodsId

				this.address.user = waitPayOrder.userName
				this.address.phone = waitPayOrder.userPhone
				this.address.address = waitPayOrder.userAddress

				this.orderQuery.ordersID = waitPayOrder.ordersID
				this.orderQuery.ordersNum = waitPayOrder.ordersNum
				this.orderQuery.goodsId = waitPayOrder.goodsId
				this.orderQuery.goodsName = waitPayOrder.goodsName
				this.orderQuery.goodsType = waitPayOrder.goodsType
				this.orderQuery.zfPrice = waitPayOrder.zfPrice
				this.orderQuery.userId = waitPayOrder.userId
				this.orderQuery.userName = waitPayOrder.userName
				this.orderQuery.userPhone = waitPayOrder.userPhone
				this.orderQuery.userAddress = waitPayOrder.userAddress
				this.orderQuery.tradeNo = waitPayOrder.tradeNo
				this.orderQuery.ordersStatus = waitPayOrder.ordersStatus

				this.getGoods()

				return
			}
			this.goodsId = option.goodsId
			login()
			this.getGoods()
		},
		methods: {
			// 获取商品信息
			getGoods() {
				this.$tip.loading('加载中')
				getGoodsById({ goodsID: this.goodsId }).then(res => {
					let goods = res.data.data
					if(goods.yhPrice === null) {
						goods.yhPrice = parseInt(goods.channel) === 1 ? 0 : goods.hxPrice
					}
					goods.images = getImgUrl(goods.images)
					this.goods = res.data.data
				}).catch(e => {
					if(!this.err) {
						this.err = true
						this.errMsg = '获取商品出错~请稍后重试'
					}
				})
			},

			// 验证收货地址是否选择
			addressJudge() {
				if(this.address.address != '' && this.address.user != '' && this.address.phone != '' && this.orderQuery.ordersID != undefined) {
					return true
				}
				if(this.address.prov === '' || this.address.city === '' || this.address.area === '' || this.address.address === '' || this.address.user === '' || this.address.phone === '') {
					this.$tip.toast('请完善收货信息')
					return false
				}
				return true
			},

			//调用支付前处理
			async payBeforeHandler() {
				if(this.err) {
					this.$tip.toast(this.errMsg)
					return
				}
				if(!this.addressJudge()) {
					return
				}
				if(this.isPay) {
					this.upOrderStatus('未发货')
					return
				}
				let flag = await login()
				if(!flag) {
					return
				}
				if(parseInt(this.goods.channel) === 1) {
					this.$tip.loading('获取用户信息中...')
					try {
						let temp = await getUser({userNo: this.$store.getters.userid})
						let user = temp.data.rows[0]
						if(!user) {
							this.$tip.toast('获取用户信息失败~')
							return
						}
						if(user.recycled <= 0) {
							this.$tip.toast('暂无优惠，请回收衣服后重试~')
							return
						}
					} catch(err) {
						this.$tip.toast('获取用户信息失败~')
						return
					}
				}
				this.orderNumQuery.title = this.goods.goodsName
				this.orderNumQuery.price = this.goods.hxPrice + this.goods.expressPrice
				// this.orderNumQuery.price = 0.01
				this.orderNumQuery.userID = this.$store.getters.userid
				
				let isOk
				// 判断在本页面，用户是否修改或创建过订单，创建过则直接走修改api
				if(this.orderCreat) {
					isOk = await this.editOrder()
				} else {
					if(this.from === 'order') {
						isOk = await this.editOrder()
					} else {
						isOk = await this.addOrder()
					}
				}
				
				if(isOk) {
					this.getOrderNumAndPay()
				}
			},
			
			// 获取支付单号
			getOrderNumAndPay() {
				let timer
				this.$tip.loading('请求支付中...')
				queryOrderNum(this.orderNumQuery, {autoload: false, neglectError: true}).then(res => {
					this.frequency = 0
					this.$tip.loaded()
					this.orderNum = res.data.msg
					this.pay(this.orderNum)
				}).catch(e => {
					if(this.frequency >= 10 || e.data.msg) {
						this.frequency = 0
						this.$tip.loaded()
						this.$tip.toast(e.data.msg)
						return
					} else {
						this.frequency++
						// 调用失败则700ms后重试
						timer = setTimeout(() => {
							this.getOrderNumAndPay()
						}, 700)
					}
				})
			},

			// 支付
			pay(orderNumber) {
				let that = this
				uni.requestPayment({
				    provider: 'alipay',
				    orderInfo: orderNumber, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				    success: function (res) {
						switch(res.resultCode) {
							case '6001':
								that.$tip.toast('支付已取消')
								that.payAfterHandler()
								break
							case '6002':
								that.$tip.toast('网络连接出错')
								that.payAfterHandler()
								break
							default:
								that.payAfterHandler()
								break
						}
				    },
				    fail: function (err) {
						that.$tip.toast('出现未知错误' + err.errMsg)
				    }
				});
			},

			// 调用支付后处理
			payAfterHandler() {
				let timer
				this.$tip.loading('获取支付结果中...')
				queryOrderStatus({ orderNo: this.orderNum }, {autoload: false, neglectError: true}).then(res => {
					this.frequency = 0
					this.$tip.loaded()
					if(res.data.msg === 'TRADE_FINISHED' || res.data.msg === 'TRADE_SUCCESS') {
						this.isPay = true
						this.upOrderStatus('未发货')
					} else if(res.data.msg === 'WAIT_BUYER_PAY') {
						// this.$tip.toast('已生成一笔待支付订单')
						// this.$store.commit('SET_ORDERRELOAD', true)
						// this.$store.commit('SET_DDTAB', 1)
						// uni.switchTab({ url: '/pages/recycle_orders/index' })
						this.isPay = true
						this.upOrderStatus('待支付')
					}
				}).catch(e => {
					if(this.frequency >= 10 || e.data.msg) {
						this.frequency = 0
						this.$tip.loaded()
						this.$tip.toast(e.data.msg)
						return
					} else {
						this.frequency++
						// 调用失败则700ms后重试
						timer = setTimeout(() => {
							this.payAfterHandler()
						}, 700)
					}
				})
			},
			
			// 修改订单
			async editOrder() {
				this.orderQuery.userName = this.address.user
				this.orderQuery.userPhone = this.address.phone
				this.orderQuery.userAddress = this.address.prov + this.address.city + this.address.area + this.address.street + this.address.address
				this.orderQuery.ordersStatus = '待支付'
				this.$tip.loading('生成订单中...')
				try {
					await editOrder(this.orderQuery)
					this.orderCreat = true
					return true
				} catch (e) {
					return false
				}
				
			},
			
			// 添加订单
			async addOrder() {
				this.orderQuery.goodsId = this.goods.goodID
				this.orderQuery.goodsName = this.goods.goodsName
				this.orderQuery.goodsType = this.goods.goodsType
				this.orderQuery.zfPrice = this.goods.zfPrice
				this.orderQuery.userId = this.$store.getters.userid
				this.orderQuery.userName = this.address.user
				this.orderQuery.userPhone = this.address.phone
				this.orderQuery.userAddress = this.address.prov + this.address.city + this.address.area + this.address.street + this.address.address
				this.orderQuery.ordersStatus = '待支付'
				this.$tip.loading('生成订单中...')
				try {
					let res = await addOrder(this.orderQuery)
					this.orderQuery.ordersID = res.data.data
					this.orderCreat = true
					return true
				} catch(e) {
					console.log(e);
					return false
				}
			},
			
			// 修改订单状态
			upOrderStatus(status) {
				let timer
				const query = Qs.stringify({
					orderID: this.orderQuery.ordersID,
					tradeNo: this.orderNum,
					status: status
				})
				this.$tip.loading('更新订单状态...')
				editOrderForStatus(query, {autoload: false, neglectError: true}).then(res => {
					this.isPay = false
					this.$tip.loaded()
					this.$store.commit('SET_ORDERRELOAD', true)
					this.$store.commit('SET_DDTAB', 1)
					if(status === '未发货') {
						uni.redirectTo({ url:'/pages/end/index' })
					} else {
						uni.switchTab({ url: '/pages/recycle_orders/index' })
					}
				}).catch(e => {
					if(this.frequency >= 10 || e.data.msg) {
						this.frequency = 0
						this.$tip.loaded()
						this.$tip.toast('更新订单失败~请点击重试或联系客服')
						return
					} else {
						this.frequency++
						// 调用失败则700ms后重试
						timer = setTimeout(() => {
							this.upOrderStatus('未发货')
						}, 700)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.payment {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100vh;

		&_main {
			flex: 1;
		}

		&_bottom {
			background: #FFFFFF;
			box-sizing: border-box;
			width: 100%;
			padding: 30rpx;
		}
	}
</style>
