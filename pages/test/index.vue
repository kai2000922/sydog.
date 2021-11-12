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
					funGoods: {
						zfPrice: undefined,
						goodesName: undefined
					},
					userID: undefined
				}
			}
		},
		methods: {
			tjTest() {
				this.orderNumberForm.funGoods.goodesName = '手提纸巾'
				this.orderNumberForm.funGoods.zfPrice = 10
				this.orderNumberForm.userID = this.$store.getters.userid
				this.$tip.loading()
				this.$http.post('/ali/queryOrderNum', this.orderNumberForm).then(res => {
					console.log(res);
				})
			}
		}
	}
</script>

<style>
</style>
