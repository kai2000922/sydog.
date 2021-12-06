<template>
	<view class="content">
		<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :auto="false" empty-view-text="暂时没有订单哦~" @onRefresh="refresh">
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view v-for="(item, index) in dataList" :key="index">
				<order :item="item" @zfClick="toPayment" @tkClick="refund"/>
			</view>
		</z-paging>
		
		<!-- 退款弹窗 -->
		<refund :refund-show.sync="refundPopup" :ok-show.sync="refundOkPopup" :tkObj="tkObj"  @tk="tk"/>
	</view>
</template>

<script>
	import order from '../order'
	import refund from '@/components/pages/refund'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			order,
			refund
		},
		props: {
			//当前组件的index，也就是当前组件是swiper中的第几个
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			//当前swiper切换到第几个index
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			}
		},
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				// 第一次加载
				firstLoaded: false,
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
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						//懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							setTimeout(() => {
								this.$refs.paging.reload();
							}, 5);
						}
					}
				},
				immediate: true
			}
		},
		methods: {
			refresh() {
				this.$refs.paging.reload()
			},
			// 获取商品订单列表
			queryList(pageNo, pageSize) {
				api.login().then(flag => {
					if(!flag) {
						this.$refs.paging.complete(false);
						return
					}
					const params = {
						pageNum: pageNo,
						pageSize: pageSize,
						userId: this.$store.getters.userid
					}
					this.$tip.loading()
					this.$http.post('/recycle/orders/list', params).then(res => {
						this.$refs.paging.complete(res.data.rows);
						this.firstLoaded = true;
					}).catch(err => {
						this.$refs.paging.complete(false);
					})
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
					this.$refs.paging.refresh()
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */
	.content {
		height: 100%;
	}
</style>
