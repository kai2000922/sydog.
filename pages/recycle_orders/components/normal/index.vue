<template>
	<view>
		<!-- 时间 -->
		<view class="label flex_row flex_ai_center">
			<image src="@/static/order/shangmenshijian.png"/>
			<text class="font_28 label_color line_42">上门取件时间：</text>
		</view>
		<normal-time :type="type" :expectTime="expectTime" :courier-error="courierError" @timeClick="timeClick"/>
		
		<!-- 快递员 -->
		<view class="label flex_row flex_ai_center">
			<image src="@/static/order/kuaidiyuan.png"/>
			<text class="ml_10 font_28 label_color line_42">取件员联系方式：</text>
			<view v-if="type === 'cancel'" class="cancelImg">
				<image src="@/static/order/quxiao.png" style="width: 100%; height: 100%;"/>
			</view>
		</view>
		<view class="mt_20 flex_row flex_ai_center flex_jc_between font_28 font_bold" :class="type === 'pickup' ? 'color_black' : 'color_grey'">
			<view style="flex: 1;">
				<text v-if="type === 'stay'">取件当天，会展示出取件员的信息哦~</text>
				<text v-if="type === 'pickup' && !courierError">{{ courierName }}</text>
				<text v-if="type === 'pickup' && !courierError" class="ml_10" :class="type === 'pickup' ? 'color_green' : 'color_grey'">{{ courierPhone }}</text>
				<text v-if="type === 'pickup' && courierError">{{ courier }}</text>
				<text v-if="type === 'cancel'">已取消取件</text>
			</view>
			<s-button v-if="type === 'pickup' && !courierError" background="#43A668" color="#FFFFFF" width="128" height="56" :custom-style="{}" :bold="false" text="拨打" font-size="28" @click="call"/>
		</view>
	</view>
</template>

<script>
	import normalTime from '../normal-time'
	import sButton from '@/components/pages/s-button'
	export default {
		components: {
			normalTime,
			sButton
		},
		props: {
			type: String,
			expectTime: Object,
			courier: String,
			courierError: Boolean,
			courierPhone: String,
			courierName: String
		},
		methods: {
			timeClick() {
				this.$emit('timeClick')
			},
			
			// 拨打电话号码
			call() {
				uni.makePhoneCall({phoneNumber: this.courierPhone})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.label_color {
		color: #7F8581;
	}
	.label {
		margin-top: 40rpx;
		position: relative;
		
		&>image {
			width: 40rpx;
			height: 40rpx;
			margin-top: -6rpx;
		}
		
		.cancelImg {
			position: absolute;
			width: 150rpx;
			height: 131rpx;
			right: 20rpx;
		}
	}
</style>
