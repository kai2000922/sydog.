<template>
	<view class="container">
		<view class="top-background"/>
		<step step-style="padding: 63rpx 0;" :dataList="stepList" />
		<index-swiper/>
		
		<s-panel>
			<index-grid :gridList="gridList"/>
		</s-panel>

		<s-panel>
			<view style="padding-left: 32rpx;">
				<orde-form :addressObj.sync="addressInfo" :date.sync="orderInfo.expectTime" :weight.sync="orderInfo.expectWeight"></orde-form>
			</view>
			<view style="display: flex; align-items: center; justify-content: center; margin-top: 48rpx;">
				<s-button background="#43A668" width="570" height="120" color="#FFFFFF" @click="sendData" text="预约上门回收"/>
			</view>
			<!-- 首页-我的订单 -->
			<view class="movable_box">
				<movable-area>
					<movable-view direction="vertical">
						<image src="@/static/sydd.png"/>
					</movable-view>
				</movable-area>
			</view>
		</s-panel>

		<s-panel>
			<liuyuno-tabs :tabData="tabConfig.list" :activeIndex="tabConfig.index" @tabClick="onswiperchange"/>
			<swiper :current="tabConfig.index" :duration="300" @change="onswiperchange">
				<swiper-item>
					<view style="height: 500px;">
						<text class="swiper_item_title">总回收重量≥5kg可兑换以下好礼</text>
						<s-goods></s-goods>
					</view>
				</swiper-item>
			</swiper>
		</s-panel>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import step from '@/components/pages/step'
	import indexSwiper from './components/index-swiper'
	import indexGrid from './components/index-grid'
	import ordeForm from '@/components/pages/oder-form'
	import app from '../../App.vue'
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue"
	import sGoods from '@/components/pages/s-goods'
	import sButton from '@/components/pages/s-button'


	export default {
		components: {
			sPanel,
			sGoods,
			step,
			indexSwiper,
			indexGrid,
			ordeForm,
			liuyunoTabs,
			sButton
		},
		data() {
			return {
				stepList: [{
						index: '01',
						span: '4',
						choice: true,
						title: '预约回收',
						subTitle: '提交信息'
					},
					{
						index: '02',
						span: '4',
						choice: false,
						title: '上门取衣',
						subTitle: '免费上门0运费'
					},
					{
						index: '03',
						span: '4',
						choice: false,
						title: '换好礼',
						subTitle: '付邮领取'
					}
				],
				gridList: [{
						img: '/static/itemize/yiwu.png',
						text: '衣物'
					},
					{
						img: '/static/itemize/xiexue.png',
						text: '鞋靴'
					},
					{
						img: '/static/itemize/maozi.png',
						text: '帽子'
					},
					{
						img: '/static/itemize/baobao.png',
						text: '包包'
					},
					{
						img: '/static/itemize/chuangdan.png',
						text: '床单'
					}
				],
				tabConfig: {
					index: 0,
					list: [{
							label: '兑换好礼专区',
							code: '0'
						}
					]
				},
				orderInfo: {
					user: 'kai2000922',
					phone: '15824641868',
					isNow: '1',
					name: '韩国凯',
					prov: '河南',
					city: '安阳',
					expectTime: '',
					expectWeight: 5,
					address: '河南省安阳市内黄县梁庄镇',
					area: '内黄县',
					orderStatus: '待上门',
				},
				addressInfo: {}
			}
		},
		methods: {

			sendData() {
				if (this.orderInfo.expectTime == '' || this.addressInfo.prov == null){
					this.$tip.toast("请补全信息！")
					return
				}
				this.orderInfo.prov = this.addressInfo.prov
				this.orderInfo.city = this.addressInfo.city
				this.orderInfo.area = this.addressInfo.area
				this.orderInfo.address = this.addressInfo.prov + this.addressInfo.city + this.addressInfo.area + this.addressInfo.street + this.addressInfo.address
				this.orderInfo.name = this.addressInfo.fullname
				this.orderInfo.phone = this.addressInfo.mobilePhone
				this.$tip.loading('请求中')
				this.$http.post('recycle//recycle/add', this.orderInfo).then(res => {
					this.$tip.loaded()
					uni.navigateTo({ url:'../collect/index' })
				})
			},
			
			toRecycleOrders() {
				uni.navigateTo({ url: '/pages/recycle_orders/recycle_orders' })
			},

			onswiperchange(e) {
				if (Object.prototype.toString.call(e) === '[object Object]') {
					let index = e.target.current || e.detail.current;
					this.tabConfig.index = index;
				} else {
					this.tabConfig.index = e;
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	.container {
		position: relative;
	}
	
	.top-background {
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 300rpx;
		background: #44aa67;
		z-index: -1;
	}
	
	.movable_box {
		position: absolute;
		top: 0;
		right: -30rpx;
		height: 666rpx;
		width: 30rpx;
		
		&>movable-area {
			height: 100%;
			width: 100%;
			
			&>movable-view {
				height: 105rpx;
				border-top-left-radius: 53rpx;
				border-bottom-left-radius: 53rpx;
				width: 150rpx;
				margin-left: -120rpx;
				overflow: hidden;
				
				&>image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
	}
	
	.swiper_item_title {
		margin-top: 56rpx;
		margin-bottom: 36rpx;
		display: flex;
		align-items: center;
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bold;
		color: $s_font_color;
		letter-spacing: 0;
		line-height: 42rpx;
		
		&::before {
			content: '';
			display: block;
			margin-right: 16rpx;
			width: 16rpx;
			height: 16rpx;
			border-radius: 8rpx;
			background: #FA9E19;
		}
	}
</style>

