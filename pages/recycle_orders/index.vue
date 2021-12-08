<template>
	<z-paging-swiper>
		<view slot="top">
			<u-tabs-swiper ref="uTabs" :list="tabList" font-size="28" active-color="#06180C" inactive-color="#06180C" :bar-style="{backgroundImage: 'linear-gradient(270deg, #F7970D 0%, #FFD678 100%)'}" :current="current" @change="tabsChange" :is-scroll="false" swiperWidth="750"/>
		</view>
		<!-- swiper必须设置height:100%，因为swiper有默认的高度，只有设置高度100%才可以铺满页面  -->
		<swiper style="height: 100%;" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item>
				<recycle-swiper-item :tabIndex="0" :currentIndex="swiperCurrent" :reload.sync="recycleReload"/>
			</swiper-item>
			<swiper-item>
				<order-swiper-item :tabIndex="1" :currentIndex="swiperCurrent" :reload.sync="orderReload"/>
			</swiper-item>
		</swiper>
		
		<view class="abs_view">
<!-- 			<view class="abs_view_btn" @click="toHome">
					<image src="@/static/order_home.png"></image>
				</view> -->
			<view class="abs_view_btn">
				<contact-button tnt-inst-id="n8c_Hb8w" scene="SCE01205269" color="#30BB63" size="50" icon="https://hkkkkk.cn:8080/profile/upload/2021/11/09/2a1f5a55-11a1-4d27-bcaa-f15416cfa50a.png"/>
			</view>
		</view>
		
	</z-paging-swiper>
</template>

<script>
	import recycleSwiperItem from './components/recycle-swiper-item/index.vue'
	import orderSwiperItem from './components/order-swiper-item'

	export default {
		components: {
			recycleSwiperItem,
			orderSwiperItem
		},
		onShareAppMessage () {
		    return api.getShareObject()
		},
		data() {
			return {
				// tabs
				tabList: [{name: '旧衣回收订单'}, {name: '商城订单'}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				// 商品订单
				orderList: [],
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
				// 商城订单刷新
				orderReload: false,
				// 回收订单刷新
				recycleReload: false
			}
		},
		onLoad() {
			uni.setNavigationBarTitle({title: ''})
			uni.setBackgroundColor({backgroundColor: '#fafffc'})
			uni.setNavigationBarColor({backgroundColor: '#FFFFFF'})
		},
		onShow() {
			if(this.$store.getters.orderReload) {
				this.orderReload = true
				this.$store.commit('SET_ORDERRELOAD', false)
			}
			if(this.$store.getters.recycleReload) {
				this.recycleReload = true
				this.$store.commit('SET_RECYCLERELOAD', false)
			}
			if(this.$store.getters.ddTab !== -1) {
				this.current = this.$store.getters.ddTab
				this.swiperCurrent = this.current
				this.$store.commit('SET_DDTAB', -1)
			}
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},

			// 首页
			toHome() {
				uni.switchTab({ url: '/pages/index/index' })
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
		right: 30rpx;
		bottom: 80rpx;

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
