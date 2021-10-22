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

		<s-panel>
			<u-row justify="between" align="center">
				<text class="s_text_bolder_main s_text_ellipsis">旧衣鞋帽包回收，换好礼！</text>
				<view class="extra-box">
					<image src="@/static/question-circle-fill.svg"></image>
					<text>有哪些好礼</text>
				</view>
			</u-row>
			<view class="s_mt_2">
				<uni-grid :column="gridData.length + 1" :showBorder="false" :highlight="false">
					<uni-grid-item v-for="(item, index) in gridData" :key="index">
						<view class="grid-item">
							<u-image width="80rpx" height="80rpx" :src="item.img"></u-image>
							<view class="grid-text" v-text="item.text" />
						</view>
					</uni-grid-item>
				</uni-grid>
			</view>
		</s-panel>

		<s-panel>
			<u-row justify="between" align="center">
				<text class="s_flex s_text_bolder_main s_text_dot">上门取件信息</text>
				<text class="extra">您无须承担任何费用</text>
			</u-row>

			<view style="padding-left: 32rpx;" class="s_mt_2">
				<u-form :model="form" ref="uForm" label-position="top">
					<u-form-item label="您的地址" :label-style="formStyle.lable" right-icon="/static/arrow-right.png"
						:right-icon-style="formStyle.rightIcon">
						<input v-model="form.address" class="i_input" placeholder-class="input_placeholder"
							placeholder="请填写您邮寄旧衣的地址" />
					</u-form-item>
					<u-form-item label="上门时间" :label-style="formStyle.lable" right-icon="/static/arrow-right.png"
						:right-icon-style="formStyle.rightIcon">
						<view @click="show = true">
							<input disabled v-model="form.date" class="i_input" placeholder-class="input_placeholder"
								placeholder="请选择上门取件时间" />
						</view>
						<u-select v-model="show" @change="timeChange()" mode="mutil-column" :list="dateList"
							@confirm="dateSelect"></u-select>
					</u-form-item>
				</u-form>
			</view>

			<u-row justify="between" align="center" customClass="s_mt_2">
				<text class="s_flex s_text_bolder_main s_text_dot">回收重量</text>
				<view class="s_flex">
					<number-box :step="1" :min="5" v-model="form.weight" />
					<text class="company">公斤</text>
				</view>
			</u-row>

			<u-row align="center" justify="center" customClass="s_mt_4">
				<button @click="sendData" class="i_button">预约上门回收</button>
			</u-row>
		</s-panel>

		<s-panel>
			<liuyuno-tabs :tabData="tabConfig.list" :activeIndex="tabConfig.index" @tabClick="onswiperchange"/>
			<swiper :current="tabConfig.index" :duration="300" @change="onswiperchange">
				<swiper-item>
					<view style="height: 500px;">
						<text class="s_flex s_text_dot s_text_bolder_min s_mt_5 s_mb_3">总回收重量≥5kg可兑换以下好礼</text>
						<s-goods></s-goods>
					</view>

				</swiper-item>
				<swiper-item>
					<view>
						<text class="s_flex s_text_dot s_text_bolder_min s_mt_5 s_mb_3">总回收重量≥8kg可兑换以下好礼</text>
						<s-goods></s-goods>
					</view>
				</swiper-item>
				<swiper-item>
					<view>
						<text class="s_flex s_text_dot s_text_bolder_min s_mt_5 s_mb_3">总回收重量≥10kg可兑换以下好礼</text>
						<s-goods></s-goods>
					</view>
				</swiper-item>
			</swiper>
		</s-panel>


	</view>
</template>

<script>
	import {
		getSwiperList
	} from '@/components/sn-swiper/esc-swiper/helper.js';

	import sPanel from '@/components/pages/s-panel'
	import step from '@/components/pages/step'
	import app from '../../App.vue'
	import NumberBox from './components/number-box'
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue"
	import sGoods from '@/components/pages/s-goods'


	export default {
		components: {
			sPanel,
			sGoods,
			step,
			NumberBox,
			liuyunoTabs
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
				gridData: [{
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
				tabConfig: {
					index: 0,
					list: [{
							label: '5kg以上专区',
							code: '0'
						},
						{
							label: '8kg以上专区',
							code: '1'
						},
						{
							label: '10kg以上专区',
							code: '2'
						}
					]
				},
				form: {
					address: '',
					date: '',
					weight: 5
				},
				show: false,
				dateList: [
					[],
					[]
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

			sendData() {
				this.orderInfo.expectWeight = this.form.weight
				if (this.form.date == ''){
					uni.showToast({
						title: '请选择上门时间'
					});
					return
				}
				uni.request({
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					url: app.BaseUrl + '/recycle/add', //仅为示例，并非真实接口地址。
					data: this.orderInfo,
					method: 'POST',
					success: (res) => {
						if (res.data.code == 0) {
							console.log(this.orderInfo)
							console.log(res.data)
							uni.redirectTo({
								url:'../collect/index'
							})
						} else {
							console.log(res.data.msg);
						}

					}
				})
			},

			getDateList() {
				let date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth();
				let days = this.getDaysOfMonth(date.getYear(), month)
				let weeks = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六");
				let day = date.getDate()
				let week = date.getDay()
				for (var i = 0; i < 7; i++) {
					if (day > days) day = 1;
					if (week > 6) week = 0;
					this.dateList[0].push({
						label: i === 0 ? '今天 ' + weeks[week] : month + '月' + day + '日 ' + weeks[week],
						value: year + '-' + month + '-' + day
					})
					day++;
					week++;
				}

				for (var i = 9; i < 23; i += 2) {
					if (i == 9) {
						this.dateList[1].push({
							label: '当日两小时',
							value: date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
						})
					}
					this.dateList[1].push({
						label: i + ":00~" + (i + 2) + ":00",
						value: i + ':00:00'
					})
				}
			},

			getDaysOfMonth(year, month) {
				let date = new Date(year, month, 0);
				let days = date.getDate();
				return days;
			},

			dateSelect(e) {
				this.form.date = e[0].label + ' ' + e[1].label
				console.log(this.form.date)
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
			font-size: 28rpx;
			font-weight: bold;
			color: $s_color_green;
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

	.extra {
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bolder;
		color: #7F8581;
		letter-spacing: 0;
		text-align: right;
	}

	.i_input {
		padding-left: 0;
		font-family: PingFangSC-Semibold;
		font-size: 28rpx;
		font-weight: bolder;
		color: #06180C;

		&:disabled {
			color: #06180C;
			opacity: 1;
			-webkit-text-fill-color: #06180C;
			-webkit-opacity: 1;
		}
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
		box-shadow: 0 2rpx 16rpx 0 rgba(67, 166, 104, 0.56);
		border-radius: 60rpx;
		line-height: 120rpx;
		font-family: PingFangSC-Semibold;
		font-size: 36rpx;
		color: #FFFFFF;
		letter-spacing: 0;
		text-align: center;
	}
</style>
