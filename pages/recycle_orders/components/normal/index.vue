<template>
	<view>
		<!-- 时间 -->
		<view class="label flex_row flex_ai_center">
			<image src="@/static/men.png"/>
			<text class="font_28 label_color line_42">上门取件时间：</text>
		</view>
		<normal-time :type="type" :expectTime="expectTime" @timeClick="timeClick"/>
		
		<!-- 快递员 -->
		<view class="label flex_row flex_ai_center">
			<image src="@/static/kuaidiyuan.png"/>
			<text class="font_28 label_color line_42">取件员联系方式：</text>
			<view v-if="type === 'cancel'" class="cancelImg">
				<image src="@/static/quxiao.png" style="width: 100%; height: 100%;"/>
			</view>
		</view>
		<view class="mt_20 flex_row flex_ai_center flex_jc_between font_28 font_bold"
			:class="type === 'pickup' ? 'color_black' : 'color_grey'">
			<text v-if="type === 'stay'">取件当天，会展示出取件员的信息哦~</text>
			<text v-if="type === 'pickup'">{{ courier }}</text>
			<text v-if="type === 'cancel'">已取消取件</text>
		</view>
	</view>
</template>

<script>
	import normalTime from '../normal-time'
	export default {
		components: {
			normalTime
		},
		props: {
			type: String,
			expectTime: Object,
			courier: String
		},
		methods: {
			timeClick() {
				this.$emit('timeClick')
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
			vertical-align: middle;
		}
		
		.cancelImg {
			position: absolute;
			width: 150rpx;
			height: 131rpx;
			right: 20rpx;
		}
	}
</style>
