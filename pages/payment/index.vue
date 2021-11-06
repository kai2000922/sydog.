<template>
	<view class="payment">
		<view class="payment_main">
			<pickup/>
			<order :goods="goods"/>
		</view>
		<view class="payment_bottom">
			<collection :zfPrice="goods.zfPrice" @zfBtnClick="toEnd"/>
		</view>
	</view>
</template>

<script>
	import Pickup from './components/pickup'
	import Order from './components/order'
	import Collection from './components/collection'
	export default {
		components: {
			Pickup,
			Order,
			Collection
		},
		data() {
			return {
				goods: {},
				from: '',
				orderNumQuery: {
					funGoods: {
						zfPrice: undefined,
						goodesName: undefined
					},
					userID: undefined
				}
			}
		},
		onLoad(option) {
			uni.setNavigationBarColor({ backgroundColor: '#FFFFFF' })
			this.from = option.from
			let that = this
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('setData', function(data) {
				that.goods = data.goods
			})
		},
		methods: {
			payBeforeHandle() {
				this.orderNumQuery.funGoods.goodesName = this.goods.goodsName
				this.orderNumQuery.funGoods.zfPrice = this.goods.zfPrice
				this.orderNumQuery.userID = this.$store.getters.userid
				
				this.$http.post('/ali/queryOrderNum', this.orderNumQuery).then(res => {
					console.log(res);
				})
			},
			pay() {
				uni.requestPayment({
				    provider: 'alipay',
				    orderInfo: '2021110522001411110512429457', //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
			},
			
			toEnd() {
				if(this.from === 'order') {
					uni.navigateBack({delta: 1})
				} else {
					uni.redirectTo({ url:'/pages/end/index?from=pay' })
				}
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
