<template>
	<view class="container">
		<view class="top-background"></view>
		<step step-style="padding: 63rpx 0;" :dataList="stepData" />

		<esc-swiper :autoplay="bannerConfig.autoplay" :circular="bannerConfig.circular"
			:current.sync="bannerConfig.current" :size="bannerImage.length" :plus="bannerConfig.plus"
			:width="bannerConfig.width" :height="bannerConfig.height" :itemWidth="bannerConfig.itemWidth"
			:space="bannerConfig.space">
			<esc-swiper-item v-for="(item, index) in bannerImage" :index="index" :key="index">
				<view class="swiper-item">
					<image :src="item.image" class="item-image" />
				</view>
			</esc-swiper-item>
		</esc-swiper>
		
		<view class="app-block">
			<view class="block-title-row">
				<text class="title title-zdy">旧衣鞋帽包回收，换好礼！</text>
				<view class="extra-box">
					<image src="@/static/question-circle-fill.svg"></image>
					<text>有哪些好礼</text>
				</view>
			</view>
			<view>
				<uni-grid :column="gridData.length + 1" :showBorder="false" :highlight="false">
					<uni-grid-item v-for="(item, index) in gridData" :key="index">
						<view class="grid-item">
							<u-image width="80rpx" height="80rpx" :src="item.img"></u-image>
							<view class="grid-text" v-text="item.text"/>
						</view>
					</uni-grid-item>
				</uni-grid>				
			</view>
		</view>
		
		<view class="app-block">
			<view class="block-title-row">
				<text class="title title-zdy title_dot">上门取件信息</text>
				<text class="extra">您无须承担任何费用</text>
			</view>
			
			<view style="padding-left: 32rpx;" class="">
				<u-form :model="form" ref="uForm" label-position="top">
					<u-form-item label="您的地址" :label-style="formStyle.lable" right-icon="/static/arrow-right.png" :right-icon-style="formStyle.rightIcon">
						<input v-model="form.address" class="i_input" placeholder-class="input_placeholder" placeholder="请填写您邮寄旧衣的地址"/>
					</u-form-item>
					<u-form-item label="上门时间" :label-style="formStyle.lable" right-icon="/static/arrow-right.png" :right-icon-style="formStyle.rightIcon">
						<view @click="show = true">
							<input disabled class="i_input" placeholder-class="input_placeholder" placeholder="请选择上门取件时间" />
						</view>
						<u-select v-model="show" @change="timeChange()" mode="mutil-column" :list="dateList" @confirm="confirm"></u-select>
					</u-form-item>
				</u-form>
			</view>
			
			<view style="margin-top: 63rpx;" class="block-title-row">
				<text class="title title-zdy title_dot">回收重量</text>
				<number-box :step="1" :min="5" v-model = "form.weight"/>
				<text class="company">公斤</text>
				<!-- <u-number-box v-model="form.weight" :min="5"></u-number-box> -->
			</view>
			
			<view style="display: flex; justify-content: center; margin-top: 57rpx;" @click="sendData()">
				<button class="i_button">预约上门回收</button>
			</view>
		</view>
		
		<view>
			
		</view>
	</view>
</template>

<script>
	import {
		getSwiperList
	} from '@/components/sn-swiper/esc-swiper/helper.js';

	import step from '@/components/pages/step'
	import app from '../../App.vue'
	import NumberBox from './components/number-box'
	

	export default {
		components: {
			step,
			NumberBox
		},
		data() {
			return {
				stepData: [{
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
				bannerConfig: {
					autoplay: true,
					circular: true,
					width: 750,
					height: 250,
					itemWidth: 650,
					space: 24,
					current: 0,
					plus: 2,
					imgList: [{
							image: 'https://picsum.photos/750/300?blur=1'
						},
						{
							image: 'https://picsum.photos/seed/picsum/750/300'
						},
						{
							image: 'https://picsum.photos/750/300'
						}
					]
				},
				gridData: [
					{
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
				form: {
					address: '',
					date: '',
					weight: 5
				},
				formStyle: {
					lable: {
						fontSize: '24rpx',
						fontWeight: 'bolder',
						color: '#06180C',
						letterSpacing: 0
					},
					rightIcon: {
						width: '22.6rpx',
						height: '22.6rpx'
					}
				},
				show: false,
				dateList: [
					[],
					[
						{
							label: '当日两小时',
							value: '2'
						}
					]
				],
				orderInfo: {
					'user': 'kai2000922',
					'phone': '15824641868',
					'isNow': '1',
					'name': '韩国凯',
					'prov': '河南',
					'city': '安阳',
					'expectTime': '2021-10-10 23:01:00',
					'expectWeight': '5',
					'address': '河南省安阳市内黄县梁庄镇',
					'area': '内黄县',
					'orderStatus': '待上门'
				},
				baseURL: '106.13.18.124'
			}
		},
		onLoad() {
			this.getDateList()
		},
		computed: {
			bannerImage() {
				return getSwiperList(this.bannerConfig.imgList, {
					circular: this.bannerConfig.circular,
					plus: this.bannerConfig.plus
				});
			}
		},
		methods: {
			
			sendData(){
				this.orderInfo.expectWeight = this.form.weight
				uni.request({
					header: { 'content-type': 'application/x-www-form-urlencoded'},
				    url: app.BaseUrl + '/recycle/add', //仅为示例，并非真实接口地址。
				    data: this.orderInfo,
					method: 'POST',
				    success: (res) => {
						if (res.data.code == 0){
							console.log(this.orderInfo)
							console.log(res.data);
						}else{
							console.log(res.data.msg);
						}
				        
				    }
				})
			},
			
			getDateList() {
				let date = new Date();
				let month = date.getMonth();
				let days = this.getDaysOfMonth(date.getYear(), month)
				let weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
				let day = date.getDate()
				let week = date.getDay()
				for (var i = 0; i < 7; i++) {
					if(day > days) day = 1;
					if(week > 6) week = 0;
					if (i == 0){
						let hour = date.getHours() + 2
						if (hour > 24){
							continue
						}
						this.dateList[0].push({
							month: month,
							day: day,
							week: weeks[week],
							label: '今天 ' + weeks[week],
							value: i,
						})
						
						for (; hour < 24; hour += 2){
							this.dateList[1].push({
								month: month,
								day: day,
								week: weeks[week],
								label: hour + ":00 —— " + (hour+2) + ":00",
								value: i,
							})
						}
					}else{
						this.dateList[0].push({
							month: month,
							day: day,
							week: weeks[week],
							label: i === 0 ? '今天 ' + weeks[week] : month + '月' + day + '日 ' + weeks[week],
							value: i,
						})
						for (let hour = 8; hour < 24; hour += 2){
							this.dateList[1].push({
								month: month,
								day: day,
								week: weeks[week],
								label: hour + ":00 —— " + (hour+2) + ":00",
								value: i,
							})
						}
					}
					day++;
					week++;
				}
			},
			
			getDaysOfMonth(year,month){
			    let date=new Date(year, month, 0);
			    let days=date.getDate();
			    return days;
			},
			
			confirm(e) {
				this.form.date = e[0].label + e[1].label
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top-background {
		position: absolute;
		left: 0;
		top: 0;
		width: 750rpx;
		height: 300rpx;
		background: #44aa67;
		z-index: -1;
	}

	.swiper-item {
		position: relative;
		width: 100%;
		border-radius: 30rpx;
		background: #cbcecb;
		overflow: hidden;
		transform: translateY(0);

		.item-image {
			width: 100%;
			will-change: transform;
			height: 100%;
		}
	}

	.extra-box {
		height: 100%;
		display: inline-flex;
		align-items: center;

		image {
			width: 32rpx;
			height: 32rpx;
			vertical-align: middle;
		}

		text {
			font-size: $app-card-extra-font-size;
			font-weight: bold;
			color: $app-theme-color;
		}
	}
	
	.grid-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
		
		.grid-text {
			font-size: 24rpx;
			color: #B0B7B3;
			letter-spacing: 0;
		}
	}
	
	.title-zdy {
		font-family: PingFangSC-Semibold;
		font-size: 36rpx;
		font-weight: bolder;
		color: #06180C;
		letter-spacing: 0;
	}
	
	.title_dot:before {
		content: '';
		display: block;
		margin-right: 16rpx;
		width: 16rpx;
		height: 16rpx;
		border-radius: 8rpx;
		background: #FA9E19;
	}
	
	.extra {
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bolder;
		color: #7F8581;
		letter-spacing: 0;
		text-align: right;
	}
	
	.i_input {
		padding-left: 0rpx;
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bolder;
		color: #06180C;
		letter-spacing: 0;
	}
	
	.company {
		padding-left: 16rpx;
		font-family: PingFangSC-Regular;
		font-size: 28rpx;
		color: #B0B7B3;
		letter-spacing: 0;
	}
	
	.i_button {
		box-sizing: border-box;
		border: 0;
		width: 566rpx;
		height: 120rpx;
		background: #43A668;
		box-shadow: 0 2rpx 16rpx 0 rgba(67,166,104,0.56);
		border-radius: 60rpx;
		line-height: 120rpx;
		font-family: PingFangSC-Semibold;
		font-size: 36rpx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
</style>
