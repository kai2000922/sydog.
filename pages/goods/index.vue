<template>
	<view class="content flex_colum">
		<view class="main">
			<scroll-view class="scroll" enableBackToTop="true" scroll-y>
				<!-- 商品图片 -->
				<view>
					<u-image width="750rpx" height="750rpx" :src="sapi.getImgUrl(goods.images)"/>
				</view>
				<!-- 详细信息 -->
				<goods-info :express-price="goods.expressPrice" :goods-name="goods.goodsName" :original-price="goods.hxPrice" :original-price-show="channel === 0 || (channel === 1 && user.recycled > 0)" :present-price="channel === 0 ? goods.yhPrice : user.recycled < 1 ? goods.hxPrice : goods.yhPrice" :tag-show="channel === 1 && user.recycled > 0"/>
				<!-- 介绍 -->
				<view class="flex_colum">
					<image style="width: 100%;" :lazy-load="true" v-for="(img, index) in descImgs" :key="index" :src="img" mode="widthFix"/>
				</view>
			</scroll-view>
		</view>
		
		<view v-if="!notHave" class="bottom">
			<s-button v-if="channel === 1 && user.recycled > 0"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="立即兑换"
				@click="toPaymnet"/>
				
			<s-button v-if="channel === 1 && user.recycled <= 0"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				:text="'回收立减' + goods.hxPrice + '元'"
				@click="toIndex"/>
			
			<s-button v-if="channel === 0"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="立即购买"
				@click="toPaymnet"/>
		</view>
		
		<view v-else class="bottom">
			<s-button
				background="#BFBFBF" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="商品已下架"/>
		</view>
	</view>
</template>

<script>
	import goodsInfo from './components/goods-info'
	import sButton from '@/components/pages/s-button'

	import api from '@/utils/api.js'

	export default {
		components: {
			goodsInfo,
			sButton
		},
		onShareAppMessage () {
		    return api.getShareObject()
		},
		data() {
			return {
				// 商品id
				goodsID: undefined,
				// 上一页
				from: '',
				// 商品
				goods: {},
				// 用户
				user: {
					recycled: 0
				},
				// 详情图
				descImgs: [],
				// 
				sapi: api,
				// channel
				channel: 0,
				// 是否下架
				notHave: false
			}
		},
		onLoad(options) {
			let params = options.goodsID.split("_");
			if (params.length > 1){
				this.sendChannel(params[1])
				this.goodsID = params[0];
			} else {
				this.goodsID = options.goodsID;
			}
			api.login().then(flag => {
				this.$tip.loading('加载中')
				this.$http.post('/recycle/user/list', {userNo: this.$store.getters.userid}).then(res => {
					let user = res.data.rows[0]
					this.user = user
				})
				this.getGoods()
			})
		},
		watch: {
			channel() {
				if(this.channel === 1) {
					api.login().then(flag => {
						if(!flag) {
							uni.switchTab({ url: '/pages/shopping/index' })
							return
						}
						if(this.user.userNo !== null) {
							return
						}
						this.$tip.loading('加载中')
						this.$http.post('/recycle/user/list', {userNo: this.$store.getters.userid}).then(res => {
							let user = res.data.rows[0]
							this.user = user
						}).catch(err => {
							uni.switchTab({ url: '/pages/shopping/index' })
						})
					})
				}
			}
		},
		methods: {
			// 获取商品信息
			getGoods() {
				this.$tip.loading('加载中')
				this.$http.post('/recycle/goods/listByID', { goodsID: this.goodsID }).then(res => {
					let goods = res.data.data
					if(goods.yhPrice === null) {
						goods.yhPrice = parseInt(goods.channel) === 1 ? 0 : goods.hxPrice
					}
					this.goods = goods
					this.channel = parseInt(goods.channel)
					this.descImgs = []
					goods.descImages.split(';').forEach(img => {
						if(img !== '') {
							this.descImgs.push(api.getImgUrl(img))
						}
					})
				}).catch(e => {
					if(e.data.msg === '商品不存在') {
						this.notHave = true
					}
				})
			},
			
			// 首页
			toIndex() {
				uni.switchTab({ url: '/pages/index/index' })
			},
			
			// 支付页面
			toPaymnet() {
				let that = this
				if(this.goods === {}) {
					return
				}
				uni.navigateTo({url: '/pages/payment/index?from=goods&goodsId=' + this.goods.goodID});
			},
			
			//发送渠道信息
			sendChannel(channelName){
				if (channelName != null)
					this.$http.post('recycle/channel/add', {'channelName': channelName, 'links': 'pages/index/index' + '?channelName=' + channelName},).then(res => {})
					.catch(err => {
							tip.confirm('渠道信息添加失败', true).then(() => {})
					})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		display: flex;
		flex-direction: colum;
		
		.main {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			
			.scroll {
				flex: 1;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				flex-direction: column;
			}
		}
		
		.bottom {
			box-sizing: border-box;
			padding-top: 24rpx;
			padding-bottom: 24rpx;
			width: 750rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #ffffff;
		}
	}
	
	
</style>
