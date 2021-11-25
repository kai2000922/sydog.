<template>
	<view class="content flex_colum">
		<view class="main">
			<scroll-view class="scroll" enableBackToTop="true" scroll-y>
				<goods-head :img="sapi.getImgUrl(goods.images)" :hx-price="goods.hxPrice" />
				<goods-info :express-price="goods.expressPrice" :goods-name="goods.goodsName" />
				<!-- <goods-spec :label="label.main" @click="show = true" /> -->
				
				<view class="flex_colum">
					<image style="width: 100%;" :lazy-load="true" v-for="(img, index) in descImgs" :key="index" :src="img" mode="widthFix"/>
					<!-- <u-image width="100%" v-for="(img, index) in descImgs" :src="img" mode="widthFix"/> -->
				</view>
			</scroll-view>
		</view>
		
		<view class="bottom">
			<s-button v-if="false"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="去环保回收，即可兑换"
				@click="toIndex"/>
			<s-button v-if="false"
				background='#BFBFBF'
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="称重后即可兑换"/>
			<s-button v-if="true"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="立即付邮兑换"
				@click="toPaymnet"/>
		</view>

		<u-popup v-model="show" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view style="padding: 30rpx;">
				<scroll-view scroll-y="true" style="height: 75%">
					<goods-briefly :img="sapi.getImgUrl(goods.images)" :hx-price="goods.hxPrice" :express-price="goods.expressPrice" />
					<u-line color="#DFDFDF" margin="30rpx 0" />
					<size :size-list="sizeList" :choose.sync="choose.size" @select="select" @cancel="cancel"/>
					<u-line color="#DFDFDF" margin="30rpx 0"/>
					<color :color-list="colorList" :choose.sync="choose.color" @select="select" @cancel="cancel"/>
					<view style="padding-top: 30rpx;">
						<s-button v-if="from === 'shopping'"
							background="#43A668" 
							width="690" 
							height="120" 
							color="#FFFFFF" 
							:custom-style="{}"
							text="去环保回收，即可兑换"
							@click="toIndex"/>
						<s-button v-if="from === 'collect'"
							background='#BFBFBF'
							width="690" 
							height="120" 
							color="#FFFFFF" 
							:custom-style="{}"
							text="称重后即可兑换"/>
						<s-button v-if="from === 'end'"
							background="#43A668" 
							width="690" 
							height="120" 
							color="#FFFFFF" 
							:custom-style="{}"
							text="立即付邮兑换"
							@click="toPaymnet"/>
					</view>
				</scroll-view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import goodsHead from './components/goods-head'
	import goodsInfo from './components/goods-info'
	import goodsSpec from './components/goods-spec'
	import goodsBriefly from './components/goods-briefly'
	import size from './components/size'
	import color from './components/color'
	import sButton from '@/components/pages/s-button'

	import api from '@/utils/api.js'

	export default {
		components: {
			goodsHead,
			goodsInfo,
			goodsSpec,
			goodsBriefly,
			size,
			color,
			sButton
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
				user: undefined,
				// 详情图
				descImgs: [],
				// 
				sapi: api,
				// 弹窗
				show: false,
				// 选项
				value: {
					size: undefined,
					color: undefined
				},
				label: {
					size: '',
					color: '',
					main: ''
				},
				choose: {
					size: -1,
					color: -1
				},
				sizeList: [
					{
						label: 'S',
						value: 'S'
					},
					{
						label: 'M',
						value: 'M'
					},
					{
						label: 'L',
						value: 'L'
					},
					{
						label: 'XL',
						value: 'XL'
					},
					{
						label: 'XL',
						value: 'XL'
					}
				],
				colorList: [
					{
						img: 'https://picsum.photos/seed/picsum/218/218',
						label: '红褐色',
						value: '红褐色'
					},
					{
						img: 'https://picsum.photos/seed/picsum/218/218',
						label: '白色',
						value: '白色'
					},
					{
						img: 'https://picsum.photos/seed/picsum/218/218',
						label: '绿色',
						value: '绿色'
					}
				],
			}
		},
		onLoad(options) {
			this.goodsID = options.goodsID;
			this.from = options.from
			this.getGoods()
			this.sendChannel(options.channelName)
			// this.getUser()
		},
		methods: {
			// 获取商品信息
			getGoods() {
				this.$tip.loading('加载中')
				this.$http.post('/recycle/goods/listByID', { goodsID: this.goodsID }).then(res => {
					let goods = res.data.data
					this.goods = goods
					this.descImgs = []
					goods.descImages.split(';').forEach(img => {
						if(img !== '') {
							this.descImgs.push(api.getImgUrl(img))
							console.log(api.getImgUrl(img))
						}
					})
				})
			},
			
			// 获取用户信息
			getUser() {
				this.$tip.loading('加载中')
				this.$http.post('/recycle/user/list', {userID: this.$store.getters.userid}).then(res => {
					this.user = res.data.rows[0]
				})
			},
			
			// 选项选择 
			select(type, item) {
				this.value[type] = item.value
				this.label[type] = item.label
				this.setLabel()
			},
			
			//取消选择
			cancel(type) {
				this.value[type] = undefined
				this.label[type] = ''
				this.setLabel()
			},
			
			// 设置label
			setLabel() {
				let str = ''
				str += this.label.size + '	'
				str += this.label.color
				this.label.main = str
			},
			
			// 首页
			toIndex() {
				uni.navigateBack({ delta: 2 });
			},
			
			// 支付页面
			toPaymnet() {
				let that = this
				if(this.goods === {}) {
					return
				}
				// if(!this.recycledJudge()) {
				// 	return
				// }
				uni.navigateTo({url: '/pages/payment/index?from=goods&goodsId=' + this.goods.goodID});
			},
			
			// 回收数验证
			recycledJudge() {
				if(this.user === undefined) {
					this.$tip.error('未知用户')
					return false
				}
				if(this.user.recycled < 1) {
					this.$tip.toast('请先回收订单才能兑换商品')
					return false
				}
				return true
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
