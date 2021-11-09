<template>
	<view class="form">
		<view class="form_title_row">
			<text>上门取件信息</text>
			<text class="card_right_text">*无需承担任何费用</text>
		</view>
		<view class="form_row">
			<label class="form_row_title">上门地址</label>
			<view class="form_row_content" @click="addressChoose">
				<text :class="addressLabel === '请填写您邮寄旧衣的地址' ? 'form_row_content_placeholder' : 'form_row_content_text'" v-text="addressLabel"/>
				<image class="form_arrow_right" src="@/static/arrow-right.png"></image>
				<slot></slot>
			</view>
			<label v-if="contactsLabel != ''" class="form_row_personal" v-text="contactsLabel"/>
		</view>
		<view class="form_row">
			<label class="form_row_title">上门时间</label>
			<view class="form_row_content" @click="dateSelectShow =true">
				<text :class="dateLabel === '请选择上门取件时间' ? 'form_row_content_placeholder' : 'form_row_content_text'" v-text="dateLabel"/>
				<u-select v-model="dateSelectShow" 
						mode="mutil-column-auto"
						confirm-color="#06180C"
						:list="dateList"
						@confirm="dateSelect"/>
				<image class="form_arrow_right" src="@/static/arrow-right.png"></image>
			</view>
			<label v-if="dateLabel != '请选择上门取件时间'" class="form_row_contact">快递员将在此日联系您</label>
		</view>
		<view class="form_row2">
			<text class="form_row2_text">回收重量</text>
			<view class="form_row2_select">
				
				<s-select-item v-for="(item, index) in weightObj.list"
					:key="index"
					:obj="item"
					:width="item.width"
					:select="weightObj.select === item.index ? true : false"
					@select="weightChange"/>
			</view>
		</view>
	</view>
</template>

<script>
	import sSelectItem from '../s-select-item'

	export default {
		components: {
			sSelectItem
		},
		props: {
			// 回收重量
			weight: {
				type: Number,
				default: 10
			},
			// 地址信息
			address: {
				type: String,
				default: '请填写您邮寄旧衣的地址'
			},
			// 联系人信息
			contacts: {
				type: String,
				default: ''
			},
			// 日期信息
			date: {
				type: String,
				default: '请选择上门取件时间'
			},
			// 弹窗信息
			minMsg: {
				type: String,
				default: '最低不能低于8KG'
			},
			// 地址对象
			addressObj: {
				type: Object,
				default: () => ({})
			}
		},
		data() {
			return {
				weightObj: {
					select: 0,
					list: [
						{
							index: 1,
							label: '8kg 约20件',
							width: 275,
							value: 8
						},
						{
							index: 2,
							label: '16kg 约40件',
							width: 275,
							value: 16
						},
						{
							index: 3,
							label: '16kg以上 约40件以上',
							width: 572,
							value: 17
						}
					]
				},
				dateList: [],
				dateSelectShow: false,
				dateLabel: '',
				addressLabel: '',
				contactsLabel: '',
				addressInfo: {}
			}
		},
		created() {
			switch(this.weight) {
				case 8:
					this.weightObj.select = 1
					break
				case 16: 
					this.weightObj.select = 2
					break
				default:
					this.weightObj.select = 3
					break
			}
			this.dateLabel = this.date === '' ? '请选择上门取件时间' : this.date
			this.addressLabel = this.address
			this.contactsLabel = this.contacts
			this.addressInfo = this.addressObj
			this.getDateList()
		},
		methods: {
			
			addressChoose(){
				uni.chooseAddress({
					success: (res) => {
						console.log(res);
						try{
							if (res.resultStatus == 9000){
								this.addressLabel = res.result.prov + res.result.city + res.result.area + res.result.street + res.result.address
								this.contactsLabel = res.result.fullname + "  " + res.result.mobilePhone
								this.$emit("update:addressObj", res.result)
							}
						}catch(e){
							console.log(e)
						}
					},
					fail: (err) => {
						this.$tip.toast("请允许获取地址权限！")
					}
				})
			},
			
			getDateList() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let days = this.getDaysOfMonth(date.getYear(), month)
				let weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
				let day = date.getDate()
				let week = date.getDay()
				let HourFlag = (date.getHours() > 16)
				for (var i = 0; i < 7; i++) {
					if (day > days) {
						day = 1;
						month++;
					}
					if (week > 6) {
						week = 0;	
					}
					
					if(HourFlag) {
						HourFlag = false
						day++
						week++
						continue
					}
					this.dateList.push({
						label: i === 0 ? '今天 ' + weeks[week] : month + '月' + day + '日 ' + weeks[week],
						value: year + '-' + month + '-' + day,
						children: this.getDayTime(date, i)
					})
				day++
				week++				
			}
			},
			
			getDayTime(date, val) {
				let i = 9
				let list = []
				if(val === 0 && date.getHours() > i) {
					list.push({
						label: '当日两小时',
						value: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
					})
					i = date.getHours() + 2
				} else { 
					i = 9
				}
				for ( ; i + 2 <= 19; i += 2) {
					list.push({
						label: i + ":00~" + (i + 2) + ":00",
						value: i + ':00:00'
					})
				}
				if(i + 1 === 19) {
					list.push({
						label: i + ":00~" + (i + 1) + ":00",
						value: i + ':00:00'
					})
				}
				return list
			},

			getDaysOfMonth(year, month) {
				let date = new Date(year, month, 0);
				let days = date.getDate();
				return days;
			},
			
			// 日期选择
			dateSelect(e) {
				this.dateLabel = e[0].label + ' ' + e[1].label
				this.$emit("update:date", e[0].value + ' ' + e[1].value)
			},
			// 回收重量改变
			weightChange(val) {
				this.weightObj.select = val.index
				this.$emit("update:weight", val.value)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.form {

		&_arrow_right {
			width: 40rpx;
			height: 40rpx;
			vertical-align: middle;
		}

		&_title_row {
			display: flex;
			justify-content: space-between;
			align-items: center;

			&>text:first-child {
				margin-left: -32rpx;
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

			// &>text:last-child {
			// 	font-family: PingFangSC-Semibold;
			// 	font-size: 28rpx;
			// 	font-weight: bold;
			// 	color: #7F8581;
			// 	letter-spacing: 0;
			// 	text-align: right;
			// 	line-height: 42rpx;
			// }
		}

		&_row {
			margin-top: 40rpx;
			display: flex;
			flex-direction: column;

			&_title {
				font-family: PingFangSC-Semibold;
				font-size: 24rpx;
				font-weight: bold;
				color: #06180C;
				letter-spacing: 0;
				line-height: 36rpx;
			}

			&_content {
				// position: relative;
				margin-top: 8rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				&_text {
					flex: 1;
					font-family: PingFangSC-Semibold;
					font-size: 28rpx;
					font-weight: bold;
					color: #06180C;
					letter-spacing: 0;
					line-height: 42rpx;
				}
				
				&_placeholder {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #B0B7B3;
					letter-spacing: 0;
					line-height: 42rpx;
				}
			}

			&_personal {
				margin-top: 4rpx;
				font-family: PingFangSC-Regular;
				font-size: 24rpx;
				font-weight: bold;
				color: #7F8581;
				letter-spacing: 0;
				line-height: 36rpx;
			}

			&_contact {
				font-family: PingFangSC-Semibold;
				font-size: 24rpx;
				font-weight: bold;
				color: #43A668;
				letter-spacing: 0;
				line-height: 36rpx;
			}
		}

		&_row2 {
			margin-top: 64rpx;
			display: flex;
			flex-direction: column;
			// align-items: center;
			// justify-content: space-between;

			&_text {
				margin-left: -32rpx;
				display: flex;
				align-items: center;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: #06180C;;
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
			
			&_select {
				margin-top: 20rpx;
				display: flex;
				justify-content: space-around;
				align-items: center;
				flex-wrap: wrap;
				
			}
		}
	}
</style>
