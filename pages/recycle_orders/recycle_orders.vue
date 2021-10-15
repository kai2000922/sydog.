<template>
	<view>
		
	</view>
</template>

<script>
	import app from '../../App.vue'
	
	export default {
		data() {
			return {
				orders: [],
				statusList: ["取消订单", "修改时间","修改地址"]
			}
		},
		onLoad(){
			this.getRecycleOrders()
		},
		methods: {
			getRecycleOrders(){
				if (app.userAcount != ''){
					uni.request({
						header: { 'content-type': 'application/x-www-form-urlencoded'},
						url: app.BaseUrl + '/recycle/list',
						data: {'user': app.userAcount},
						method: 'POST',
						success: (res) => {
							this.orders = res.data.rows
							console.log(this.orders[0].city)
						},
						fail(err) {
							console.log(err)
						}
					})
				}
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
			updateOrderStatus(orderID, status, param){
				let data = {
						'orderStatus': '',
						'param': param,
						'orderID': orderID
					}
				if (this.statusList[0] == status){
					data.orderStatus = '-1'
				}else if(this.statusList[1] == status){
					data.orderStatus = '-2'
				}else if(this.statusList[2] == status){
					data.orderStatus = '-3'
				}else{
					console.log("status不存在")
					return
				}
				
				uni.request({
					header: { 'content-type': 'application/x-www-form-urlencoded'},
					url: app.BaseUrl + '/recycle/edit',
					data: data,
					method: 'POST',
					success: (res) => {
						this.orders = res.data.rows
						console.log(this.orders[0].city)
					},
					fail(err) {
						console.log(err)
					}
				})
				
			}
		}
	}
</script>

<style>

</style>
