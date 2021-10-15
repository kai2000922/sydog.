<template>
	<view>
		
	</view>
</template>

<script>
	import app from '../../App.vue'
	
	
	export default {
		data() {
			return {
				orders: []
			}
		},
		onLoad(){
			this.getRecycleOrders()
		},
		methods: {
			getRecycleOrders(){
				uni.request({
					header: { 'content-type': 'application/x-www-form-urlencoded'},
					url: app.BaseUrl + '/recycle/list',
					data: {'user': app.userAcount},
					method: 'POST',
					success: (res) => {
						let orders = res.data.rows
						console.log(orders[0].city)
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
