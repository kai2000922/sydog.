<template>
	<view>
		<s-panel
			:custom-style="{ width: '650rpx', height: '332rpx', margin: '15rpx 0 -4rpx 30rpx', display: 'flex', flexDirection: 'column', flexShrink: '0'}">
			<!-- 底纹 -->
			<image class="shading" src="@/static/index/shading.png" mode="widthFix" />
			<!-- 标题 -->
			<view class="flex_row flex_jc_between flex_ai_center">
				<text class="cl_grey font_24 line_36 font_bold">进行中的订单…</text>
				<view class="flex_row flex_ai_center">
					<s-dot size="8" />
					<text style="margin-left: 8rpx;" class="color_black font_24 line_36 font_bold">{{ type === 'stay' || courierError ? '等待上门' : '上门中' }}</text>
				</view>
			</view>
			<!-- 取件时间 -->
			<view class="mt_30 flex_row" style="z-index: 10;">
				<view>
					<image style="width: 34rpx; height: 34rpx; margin-top: 8rpx;" src="@/static/order/shangmenshijian.png" />
				</view>
				<view style="margin-left: 16rpx; flex: 1;" class="flex_colum">
					<view class="flex_row flex_ai_end">
						<text v-if="type === 'stay' || courierError" class="color_green ft_32 ln_48 font_bold">{{ expectTime.distance < 0 ? '等待上门' : expectTime.distance === 0 ? '今日上门' : expectTime.distance + '天后上门' }}</text>
						<text v-if="type === 'stay' || courierError" class="cl_grey ft_22 ln_34 ml_10">{{ expectTime.month + '月' + expectTime.day + '日 ' }}</text>
						<text v-if="type === 'pickup' && !courierError" class="color_green ft_32 ln_48 font_bold">快递小哥正在赶来…</text>
					</view>
					<view style="margin-top: 8rpx;" class="flex_row flex_ai_center flex_jc_between">
						<text class="ft_32 ln_34 color_black font_bold">10:00 ~ 11:00 上门取件</text>
						<s-button v-if="type === 'stay'" background="rgba(0, 0, 0, 0)" color="#06180C" width="160" height="56" :bold="false" :custom-style="{border: '1px solid #7F8581'}" text="修改订单" font-size="28" @click="showUpdate"/>
					</view>
				</view>
			</view>
			<!-- 快递员 -->
			<view style="margin-top: 40rpx; z-index: 10;" class="flex_row flex_ai_center flex_jc_between">
				<view style="flex: 1;">
					<image style="width: 34rpx; height: 34rpx; vertical-align: middle;" src="@/static/order/kuaidiyuan.png" />
					<text class="ml_10 ft_22 line_42 cl_grey font_bold">取件员：</text>
					<text v-if="type === 'stay'" class="ft_22 color_grey line_42">取件当天，会展示出取件员的信息哦~</text>
					<text v-if="type === 'pickup' && courierError" class="ft_22 color_black line_42">{{ item.courier }}</text>
					<text v-if="type === 'pickup' && !courierError" class="ft_22 color_black line_42 font_bold">{{ courierName }}</text>
					<text v-if="type === 'pickup' && !courierError" class="ml_10 ft_22 cl_green line_42 font_bold">{{ courierPhone }}</text>
				</view>
				<s-button v-if="type === 'pickup' && !courierError" background="#43A668" color="#FFFFFF" width="128" height="56" :custom-style="{}" :bold="false" text="拨打" font-size="28" @click="call"/>
			</view>
		</s-panel>
		
		<!-- 修改订单弹窗 -->
		<u-popup v-model="alterPopup" height="75%" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view class="alter">
				<view class="alter_title">
					<text>修改订单信息</text>
				</view>
				<view class="alter_form">
					<s-form :addressObj.sync="updateInfo.expectAddress" :date.sync="updateInfo.expectTime" :weight.sync="updateInfo.expectWeight" :address="updateInfo.expectAddressLabel" :contacts="updateInfo.contacts" />
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-bottom: 48rpx;">
					<s-button background="#43A668" width="690" height="120" color="#FFFFFF" :custom-style="{zIndex: '10'}" text="确认修改" @click="updateRecycle(updateInfo.recycleID, -1)" />
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import sPanel from '@/components/pages/s-panel'
	import sDot from '@/components/pages/s-dot'
	import sButton from '@/components/pages/s-button'
	import sForm from '@/components/pages/s-form'

	import {
		getDate
	} from '@/utils/dateUtil.js'

	export default {
		components: {
			sPanel,
			sDot,
			sButton,
			sForm
		},
		props: {
			order: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				// 快递员异常？
				courierError: false,
				// 快递员姓名
				courierName: '',
				// 快递员电话
				courierPhone: '',
				// 类型
				type: 'stay',
				// item
				item: {},
				// 时间
				expectTime: {},
				// 弹窗
				alterPopup: false,
				// 修改
				updateInfo: {
					recycleID: '',
					contacts: '',
					expectTime: '',
					expectWeight: 0,
					expectAddressLabel: '',
					expectAddress: {}
				},
			}
		},
		created() {
			this.item = this.order
			if (this.item.courier != undefined && this.item.courier != '' && this.item.courier != null) {
				this.type = 'pickup'
				if(this.item.courier.indexOf(' ') === -1) {
					this.courierError = true
				}
				let arr = this.item.courier.split(' ')
				// let reg = /^1(3\d|47|(5[0-3|5-9])|(7[0|7|8])|(8[0-3|5-9]))-?\d{4}-?\d{4}$/
				if(arr[1] && arr[1].length === 11) {
					this.courierName = arr[0]
					this.courierPhone = arr[1]
				} else {
					this.courierError = true
				}
			} else {
				this.type = 'stay'
			}
			this.expectTime = getDate(this.item.expectTime)
		},
		methods: {
			// 修改弹窗弹出
			showUpdate() {
				this.updateInfo.recycleID = this.item.recycleID
				this.updateInfo.contacts = this.item.name + ' ' + this.item.phone
				this.updateInfo.expectAddressLabel = this.item.address
				this.updateInfo.expectTime = this.item.expectTime
				this.updateInfo.expectWeight = this.item.expectWeight
				this.alterPopup = true
			},
			
			getAddressString() {
				//修改后的收货地址
				let addressInfo = this.updateInfo.expectAddress.prov == null ? ' ' : this.updateInfo.expectAddress.prov +
					";" + this.updateInfo.expectAddress.city + ";" + this.updateInfo.expectAddress.area + ";" +
					this.updateInfo.expectAddress.prov + this.updateInfo.expectAddress.city + this.updateInfo.expectAddress
					.area + this.updateInfo.expectAddress.street +
					this.updateInfo.expectAddress.address + ";" + this.updateInfo.expectAddress.fullname + ";" + this
					.updateInfo.expectAddress.mobilePhone
			
				//修改后的时间
				let timeInfo = this.updateInfo.expectTime
			
				//修改后的期望重量
				let weightInfo = this.updateInfo.expectWeight
			
				return timeInfo + "," + weightInfo + "," + addressInfo
			},
			
			// 修改订单
			updateRecycle(recycleID, status) {
				this.$tip.loading('修改中')
				this.$http.post('/recycle/recycle/editOrder', {
					orderStatus: status,
					param: this.getAddressString(),
					orderID: recycleID
				}).then(res => {
					this.$tip.success('修改成功！')
				}).finally(() => {
					this.alterPopup = false
					this.$emit('update')
				})
			},
			
			// 拨打电话号码
			call() {
				uni.makePhoneCall({phoneNumber: this.courierPhone})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cl_grey {
		color: #7F8581;
	}
	
	.cl_green {
		color: #43A668;
	}

	.ft_32 {
		font-size: 32rpx;
	}

	.ft_22 {
		font-size: 22rpx;
	}

	.ln_48 {
		line-height: 48rpx;
	}

	.ln_34 {
		line-height: 34rpx;
	}

	.shading {
		position: absolute;
		width: 303rpx;
		bottom: 0;
		right: 22rpx;
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
</style>
