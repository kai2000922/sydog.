<template>
	<view class="goods">
		<view class="goods_main">
			<scroll-view class="goods_main_view" enableBackToTop="true" scroll-y>
				<view class="goods_info">
					<view class="goods_info_img">
						<u-image :src="utils.getImgUrl(goods.images)" width="100%" height="100%"></u-image>
					</view>
					<view class="goods_info_cost">
						<view class="goods_info_cost_describe">
							<text>环保回收专享价</text>
							<text>回收公斤数门槛</text>
						</view>
						<view class="goods_info_cost_price">
							<cost present-price="0" :original-price="goods.hxPrice" />
							<view class="goods_info_cost_price_right">
								<text>8公斤及以上</text>
							</view>
						</view>
					</view>
				</view>

				<s-panel>
					<view class="goods_explain">
						<view class="goods_explain_row1">
							<freight :custom-style="{flex: 1}" :freight="goods.expressPrice"/>
							<view class="goods_explain_row1_right">
								<text class="goods_explain_row1_right_people">65598人已换</text>
							</view>
						</view>
						<view class="goods_explain_title">
							<text class="goods_explain_title_text">{{goods.goodsName}}</text>
						</view>
					</view>
				</s-panel>

				<s-panel>
					<view class="goods_norms">
						<view class="goods_norms_row" @click="show = true">
							<view class="goods_norms_row_left">
								<text class="goods_norms_row_left_text">{{ '选择商品规格：' + infoLabel }}</text>
							</view>
							<view class="goods_norms_row_right">
								<image src="@/static/arrow-right.png"></image>
							</view>
						</view>
					</view>
				</s-panel>
			</scroll-view>
		</view>
		<view class="goods_bottom">
			<s-button v-if="buy === '1'"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="去环保回收，即可兑换"
				@click="toIndex"/>
			<s-button v-if="buy === '2'"
				background="#BFBFBF" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="称重后即可兑换"/>
			<s-button v-if="buy === '3'"
				background="#43A668" 
				width="690" 
				height="120" 
				color="#FFFFFF" 
				:custom-style="{}"
				text="立即付邮兑换"
				@click="toPaymnet"/>
			<!-- <button class="goods_bottom_btn">立即付邮兑换</button> -->
		</view>
		
		<u-popup v-model="show" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view class="goods_pm">
				<scroll-view scroll-y="true" style="height: 75%">
					<view class="goods_pm_show">
						<view class="goods_pm_show_left">
							<u-image :src="utils.getImgUrl(goods.images)" width="100%" height="100%"></u-image>
						</view>
						<view class="goods_pm_show_right">
							<cost present-price="0" :original-price="goods.hxPrice" font-color="#06180C" original-price-color="#B0B7B3"/>
							<freight :custom-style="{marginTop: '25rpx'}" :freight="goods.expressPrice"/>
						</view>
					</view>
					<u-line color="#DFDFDF" margin="30rpx 0"/>
					<size :size-list="sizeList" :choose="choose.size" @click="sizeSelect"/>
					<u-line color="#DFDFDF" margin="30rpx 0"/>
					<color :color-list="colorList" :choose="choose.color" @click="colorSelect"/>
				</scroll-view>
				<view class="confrim-btn" style="padding-top: 30rpx;">
					<s-button v-if="buy === '1'"
						background="#43A668" 
						width="690" 
						height="120" 
						color="#FFFFFF" 
						:custom-style="{}"
						text="去环保回收，即可兑换"
						@click="toIndex"/>
					<s-button v-if="buy === '2'"
						background="#BFBFBF" 
						width="690" 
						height="120" 
						color="#FFFFFF" 
						:custom-style="{}"
						text="称重后即可兑换"/>
					<s-button v-if="buy === '3'"
						background="#43A668" 
						width="690" 
						height="120" 
						color="#FFFFFF" 
						:custom-style="{}"
						text="立即付邮兑换"
						@click="toPaymnet"/>
				</view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import cost from './components/cost'
	import freight from './components/freight'
	import size from './components/size'
	import color from './components/color'
	import sButton from '@/components/pages/s-button'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			sPanel,
			cost,
			freight,
			size,
			color,
			sButton
		},
		data() {
			return {
				utils: api,
				show: false,
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
				goodID: '',
				goods: {},
				buy: 0,
				choose: {
					size: -1,
					color: -1
				},
				select: {
					size: undefined,
					color: undefined
				},
				infoLabel: '',
				payQuery: {
					funGoods: {
						goodID: ''
					},
					userID: '',
				}
			}
		},
		onLoad(option) {
			uni.setNavigationBarColor({
				backgroundColor: '#FFFFFF'
			})
			this.goodID = option.goodID
			this.buy = option.buy
			this.getGoods()
		},
		methods: {
			// pay() {
			// 	this.payQuery.goodID = this.goods.goodID
			// 	this.payQuery.userID = this.$store.getters.userid
			// 	this.$http.post('/ali/queryOrderNum', this.payQuery).then(res => {
			// 		console.log(res.data);
			// 	})
			// },
			
			// 获取商品信息
			getGoods() {
				this.$tip.loading('加载中')
				this.$http.post('/recycle/goods/listByID', {goodsID: this.goodID}).then(res => {
					this.goods = res.data.data
					this.$tip.loaded()
				}).catch(err => {
					this.$tip.loaded()
					this.$tip.toast('获取商品信息失败，请稍后重试')
				})
			},
			
			sizeSelect(name = '', index = -1, item = null) {
				if(item === null) {
					this.choose.size = -1
					this.select.size = undefined
				} else {
					this.select.size = item
					this.choose.size = index
				}
				this.setLabel()
			},
			
			colorSelect(name = '', index = -1, item = null) {
				if(item === null) {
					this.choose.color = -1
					this.select.color = undefined
				} else {
					this.select.color = item
					this.choose.color = index
				}
				this.setLabel()
			},
			
			setLabel() {
				this.infoLabel = ''
				for(let key in this.select) {
					if(this.select[key] != undefined) {
						this.infoLabel += this.select[key].label + ' '
					}
				}
			},
			
			// 返回首页
			toIndex() {
				uni.navigateBack({
				    delta: 1
				});
			},
			
			toPaymnet() {
				let that = this
				uni.navigateTo({
				    url: '/pages/payment/index?from=goods',
					success: function(res) {
					    // 通过eventChannel向被打开页面传送数据
					    res.eventChannel.emit('setData', { goods: that.goods })
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

	.goods {
		display: flex;
		flex-direction: column;
		height: 100vh;

		&_main {
			position: relative;
			flex: 1;
			display: flex;
			flex-direction: column;
			
			&_view {
				flex: 1;
				position: absolute;
				left: 0;
				top: 0;
				right: 0;
				bottom: 0;
				flex-direction: column;
			}
		}

		&_bottom {
			box-sizing: border-box;
			padding-top: 24rpx;
			padding-bottom: 24rpx;
			width: 750rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #ffffff;
			
			&_btn {
				width: 690rpx;
				height: 120rpx;
				background: #43A668;
				border-radius: 60rpx;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: #FFFFFF;
				letter-spacing: 0;
				text-align: center;
				line-height: 120rpx;
			}
		}

		&_info {
			display: flex;
			flex-direction: column;

			&_img {
				width: 750rpx;
				height: 750rpx;
			}

			&_cost {
				display: flex;
				flex-direction: column;
				padding: 30rpx;
				background: #43A668;

				&_describe {
					display: flex;
					justify-content: space-between;
					align-items: center;

					&>text {
						font-family: PingFangSC-Semibold;
						font-size: 24rpx;
						font-weight: bold;
						color: #FFFFFF;
						letter-spacing: 0;
						line-height: 36rpx;
					}
				}

				&_price {
					margin-top: 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: flex-end;

					&_right {
						&>text {
							font-family: PingFangSC-Semibold;
							font-size: 36rpx;
							color: #FFFFFF;
							letter-spacing: 0;
							line-height: 54rpx;
						}
					}
				}
			}
		}

		&_explain {
			display: flex;
			flex-direction: column;

			&_row1 {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&_right {
					display: flex;
					align-items: center;
					
					&_people {
						font-family: PingFangSC-Regular;
						font-size: 24rpx;
						color: #B0B7B3;
						letter-spacing: 0;
						text-align: right;
						line-height: 36rpx;
					}
				}
			}

			&_title {
				margin-top: 24rpx;
				overflow: hidden;
				text-overflow: ellipsis;

				&_text {
					font-family: PingFangSC-Semibold;
					font-size: 36rpx;
					font-weight: bold;
					color: $s_font_color;
					letter-spacing: 0;
					line-height: 54rpx;
					white-space: nowrap;
				}
			}
		}

		&_norms {
			padding-top: 33rpx;
			padding-bottom: 33rpx;

			&_row {
				display: flex;
				align-items: center;
				justify-content: space-between;

				&_left {

					&_text {
						display: flex;
						align-items: center;
						font-family: PingFangSC-Semibold;
						font-size: 36rpx;
						font-weight: bold;
						color: #06180C;
						letter-spacing: 0;
						line-height: 54rpx;

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

				}

				&_right {
					width: 40rpx;
					height: 40rpx;

					&>image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		
		&_pm {
			padding: 30rpx;
			
			&_show {
				display: flex;
				justify-content: space-between;
				
				&_left {
					width: 200rpx;
					height: 200rpx;
					border-radius: 40rpx;
					overflow: hidden;
				}
				
				&_right {
					margin-left: 24rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
				}
			}
		}
	}
</style>
