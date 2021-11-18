<template>
	<view>
		<s-button background="#43A668" 
			width="690" 
			height="120" 
			color="#FFFFFF" 
			:custom-style="{}"
			text="提交订单" @click="tjTest" />
	</view>
</template>

<script>
	import sButton from '@/components/pages/s-button'
	import api from '@/utils/api.js'
	
	export default {
		components: {
			sButton
		},
		created() {
			api.getUserId()
		},
		data() {
			return {
				orderNumberForm: {
					// funGoods: {
					// 	zfPrice: undefined,
					// 	goodsName: undefined
					// },
					title: undefined,
					price: undefined,
					userID: undefined
				}
			}
		},
		methods: {
			tjTest() {
				this.orderNumberForm.price = 39.99
				this.orderNumberForm.title = '手提纸巾'
				this.orderNumberForm.userID = this.$store.getters.userid
				this.$tip.loading()
				this.$http.post('/ali/queryOrderNum', this.orderNumberForm).then(res => {
					
					this.pay(res.data.msg)
					console.log(res);
				})
				// this.$http.post('/ali/queryOrderStatus', {orderNo: '2021111222001481425713906321'}).then(res => {
				// 	console.log(res);
				// })
			},
			pay(orderNumber) {
				uni.requestPayment({
				    provider: 'alipay',
				    orderInfo: orderNumber, //微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名】
				    success: function (res) {
				        console.log('success:' + JSON.stringify(res));
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
			}
		}
	}
</script>

<style>
</style>
