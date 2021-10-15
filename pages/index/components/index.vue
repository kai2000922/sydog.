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

		<uni-card :border-radius="30" 
			card-class="card-base" 
			title="旧衣鞋帽包回收，换好礼！" 
			title-class="card-title"
			head-class="card-head-pd" 
			context-class="card-context-pd" 
			mode="title" 
			:is-shadow="false"
			:card-border="false">
			<view slot="extra" class="extra-box">
				<image src="@/static/question-circle-fill.svg"></image>
				<text>有哪些好礼</text>
			</view>
		
			<u-grid :col="6">
				<u-grid-item :customStyle="{}">
					<u-image width="80rpx" height="80rpx" src="@/static/itemize/yiwu.png"></u-image>
					<view class="grid-text">衣物11111111111</view>
				</u-grid-item>
				<u-grid-item :customStyle="{}">
					<u-image width="80rpx" height="80rpx" src="@/static/itemize/xiexue.png"></u-image>
					<view class="grid-text">鞋靴</view>
				</u-grid-item>
				<u-grid-item :customStyle="{}">
					<u-image width="80rpx" height="80rpx" src="@/static/itemize/maozi.png"></u-image>
					<view class="grid-text">帽子</view>
				</u-grid-item>
				<u-grid-item :customStyle="{}">
					<u-image width="80rpx" height="80rpx" src="@/static/itemize/baobao.png"></u-image>
					<view class="grid-text">包包</view>
				</u-grid-item>
				<u-grid-item :customStyle="{}">
					<u-image width="80rpx" height="80rpx" src="@/static/itemize/chuangdan.png"></u-image>
					<view class="grid-text">床单</view>
				</u-grid-item>
			</u-grid>
		</uni-card>
		
		<view class="block-base">
			<view class="title-row">
				<text class="title title-zdy">上门取件信息</text>
				<text class="extra">您无须承担任何费用</text>
			</view>
			
			<view style="padding-left: 32rpx;" class="">
				<u-form :model="form" ref="uForm" label-position="top">
					<u-form-item label="您的地址" :label-style="formStyle.lable" right-icon="/static/arrow-right.png" :right-icon-style="formStyle.rightIcon">
						<u-input v-model="form.address" placeholder="请填写您邮寄旧衣的地址" :custom-style="formStyle.input" height="42rpx"/>
					</u-form-item>
					<u-form-item label="上门时间" :label-style="formStyle.lable" right-icon="/static/arrow-right.png" :right-icon-style="formStyle.rightIcon">
						<u-input v-model="form.date" type="select" :select-icon="false" placeholder="请选择上门取件时间" @click="show = true" :custom-style="formStyle.input" height="42rpx"/>
						<u-select v-model="show" mode="mutil-column" :list="dateList" @confirm="confirm"></u-select>
						<input placeholder="请选择上门取件时间"/>
					</u-form-item>
				</u-form>
			</view>
			
			<view style="margin-top: 63rpx;" class="title-row">
				<text class="title title-zdy">回收重量</text>
				<u-number-box v-model="form.weight" :min="5"></u-number-box>
			</view>
			
			<view style="display: flex; justify-content: center; margin-top: 57rpx;">
				<!-- <button>预约上门回收</button> -->
				<u-button shape="circle" :custom-style="btnStyle" hover-class="none">预约上门回收</u-button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		getSwiperList
	} from '@/components/sn-swiper/esc-swiper/helper.js';

	import step from '@/components/pages/step'

	export default {
		components: {
			step,
		},
		data() {
			return {
				title: 'Hello',
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
					},
					input: {
						padding: '0rpx',
						fontFamily: 'PingFangSC-Semibold',
						fontSize: '28rpx',
						color: '#06180C',
						letterSpacing: '0',
					}
				},
				btnStyle: {
					width: '566rpx',
					height: '120rpx',
					background: '#43A668',
					boxShadow: '0 2px 16px 0 rgba(67,166,104,0.56)',
					fontFamily: 'PingFangSC-Semibold',
					fontSize: '36rpx',
					color: '#FFFFFF',
					letterSpacing: '0',
					textAlign: 'center'
				},
				show: false,
				dateList: [
					[],
					[
						{
							label: '当日三个小时',
							value: '2'
						}
					]
				],
				indicatorStyle: 'height: 50px; color: #44aa67;'
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
					this.dateList[0].push({
						month: month,
						day: day,
						week: weeks[week],
						label: i === 0 ? '明天 ' + weeks[week] : month + '月' + day + '日 ' + weeks[week],
						value: i,
					})
					day++;
					week++;
				}
				console.log(this.dateList);
			},
			
			getDaysOfMonth(year,month){
			    let date=new Date(year, month, 0);
			    let days=date.getDate();
			    return days;
			},
			
			confirm(e) {
				this.form.date = e[0].label + e[1].label
				console.log(e)
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

	.grid-text {
		font-size: 24rpx;
		color: #B0B7B3;
		letter-spacing: 0;
	}
	
	.title-zdy {
		font-family: PingFangSC-Semibold;
		font-size: 36rpx;
		font-weight: bolder;
		color: #06180C;
		letter-spacing: 0;
	}
	
	.title-zdy:before {
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
	
	
</style>
