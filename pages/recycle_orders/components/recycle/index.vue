<template>
	<s-panel>
		<!-- 标题 -->
		<view class="flex_row flex_jc_between flex_ai_center">
			<view class="flex_row flex_ai_center">
				<s-dot :color="titleColor"/>
				<text style="margin-left: 8rpx;" class="font_24 color_black">{{ title }}</text>
			</view>
			<view>
				<text v-if="type === 'stay'|| type === 'cancel'" style="line-height: 42rpx;"
					class="font_28 color_grey">{{ type === 'stay' ? '您无须承担任何费用' : '已取消' }}</text>
			</view>
		</view>
		
		<success v-if="type === 'success'" :actualWeight="item.actualWeight" @sto="sto"/>

		<normal v-if="type !== 'success'" :type="type" :expectTime="expectTime" :courier="item.courier" :courier-error="courierError" :courier-name="courierName" :courier-phone="courierPhone" @timeClick="formChange"/>

		<dot-line :height="20" :itemNumber="25"
			:customStyle="{marginRight: '-30rpx', marginLeft: '-30rpx', marginTop: '46rpx', opacity: '0.7'}"
			:lineStyle="{background: type === 'cancel' ? '#B0B7B3' : '#43A668'}" />
		
		<view class="flex_colum font_24 line_36" :class="type === 'cancel' ? 'color_c' : 'color_n'">
			<view class="label flex_row flex_ai_center">
				<image src="@/static/order/dingdan.png"/>
				<text class="ml_10 font_28 label_color line_42">订单信息：</text>
			</view>
			
			<view class="flex_row flex_ai_center flex_jc_between">
				<view class="flex_colum">
					<text>{{ '取件地址：' + item.address }}</text>
					<text>{{item.name}} {{item.phone}}</text>
				</view>
				<s-button
					v-if="type === 'stay'"
					width="160"
					height="56"
					text="修改地址"
					fontSize="28"
					background="#ffffff"
					color="#06180C"
					:custom-style="{border: '1px solid #707070', marginLeft: '46rpx'}"
					:bold="false"
					@click="formChange"/>
			</view>
			
			<view class="mt_20 flex_colum">
				<text>{{ '下单时间：' + item.createTime }}</text>
				<view class="flex_row flex_ai_center flex_jc_between">
					<view>
						<text>{{ '订单编号：' + item.orderNum }}</text>
						<text style="margin-left: 16rpx;" @click="copy">复制</text>
					</view>
						
					<s-button
						v-if="type === 'cancel'"
						width="160"
						height="56"
						text="删除订单"
						fontSize="28"
						background="#ffffff"
						color="#06180C"
						:custom-style="{border: '1px solid #707070'}"
						:bold="false"
						@click="showModal('delete')"/>
				</view>
				<s-button
					v-if="type === 'stay' || type === 'pickup'"
					background="#43A668" 
					width="600" 
					height="120" 
					color="#FFFFFF" 
					:custom-style="{margin: '30rpx auto 0 auto'}"
					text="去兑换好礼 GO"
					@click="toShopping"/>
			</view>
		</view>
		
		<view class="mt_20 flex_row flex_ai_center flex_jc_center font_24 line_36 color_grey" v-if="type === 'stay'">
			<text @click="showModal('update')">取消订单</text>
		</view>
	</s-panel>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sDot from '@/components/pages/s-dot'
	import normal from '../normal'
	import success from '../success'
	import dotLine from '@/components/pages/s-dot-line'
	import sButton from '@/components/pages/s-button'

	import { getDate } from '@/utils/dateUtil.js'

	export default {
		components: {
			sPanel,
			sDot,
			normal,
			dotLine,
			sButton,
			success
		},
		props: {
			item: Object
		},
		data() {
			return {
				// 小标题
				title: '',
				// 小标题颜色
				titleColor: '',
				// 类型
				type: '',
				// 时间
				expectTime: {},
				// 快递员异常？
				courierError: false,
				// 快递员姓名
				courierName: '',
				// 快递员电话
				courierPhone: '',
			}
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				switch (this.item.orderStatus) {
					case '待上门':
						if(this.item.courier != undefined && this.item.courier != '' && this.item.courier != null) {
							this.type = 'pickup'
							if(this.item.courier.indexOf(' ') === -1) {
								this.courierError = true
							}
							let arr = this.item.courier.split(' ')
							if(arr[1] && arr[1].length === 11) {
								this.courierName = arr[0]
								this.courierPhone = arr[1]
							} else {
								this.courierError = true
							}
							this.title = '上门中'
							this.titleColor = '#FA9E19'
							
						} else {
							this.type = 'stay'
							this.title = '等待上门'
							this.titleColor = '#FA9E19'
						}
						break
					case '邮寄中':
						this.type = 'success'
						this.title = '已完成'
						this.titleColor = '#43A668'
						break
					case '已取消':
						this.type = 'cancel'
						this.title = '已取消'
						this.titleColor = '#B0B7B3'
						break
				}
				this.expectTime = getDate(this.item.expectTime)
			},
			
			showModal(type) {
				let content = type === 'delete' ? '确认删除该订单？' : '确认取消该订单'
				
				this.$tip.confirm(content, true).then(() => {
					if(type === 'delete') {
						this.deleteOrder()
					} else {
						this.updateOrder()
					}
				})
			},
			
			deleteOrder(){
				this.$emit('delete')
			},
			
			updateOrder(){
				this.$emit('update')
			},
			
			// 弹出层
			formChange() {
				this.$emit('formChange', this.item)
			},
			
			// 前往商品页
			toShopping() {
				uni.switchTab({url: '/pages/shopping/index'})
			},
			
			// 复制
			copy() {
				uni.setClipboardData({
				    data: this.item.orderNum,
					success: () => {
						this.$tip.toast('复制成功')
					}
				});
			},
			
			sto() {
				this.$emit('sto')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.color_n {
		color: #7F8581
	}
	
	.color_c {
		color: #B0B7B3;
	}
	
	.label_color {
		color: #7F8581;
	}
	
	.label {
		margin-top: 40rpx;
		position: relative;
		
		&>image {
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
		}
	}
</style>
