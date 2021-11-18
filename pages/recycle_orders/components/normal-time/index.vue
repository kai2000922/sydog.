<template>
	<view class="time flex_colum" :class="type === 'cancel' ? 'color_grey' : 'color_black'">
		<view>
			<text v-if="expectTime.isToday" class="font_36 font_bold line_54" :class="type === 'cancel' ? 'color_grey' : 'color_green'">今日</text>

			<text v-if="!expectTime.isToday" class="font_36 font_bold line_54">{{ expectTime.month + '月' + expectTime.day + '日 ' }}</text>
			<text v-if="!expectTime.isToday" class="font_36 font_bold line_54" :class="type === 'cancel' ? 'color_grey' : 'color_green'">{{ expectTime.week }}</text>

			<text v-if="type === 'cancel'" class="font_36 font_bold line_54">（订单已取消）</text>
			<text v-if="type === 'pickup'" class="font_36 font_bold line_54 ml_18 color_green">正在上门中…</text>
		</view>
		<view class="flex_row flex_ai_center flex_jc_between">
			<text class="font_36 font_bold line_54">{{ expectTime.startHour + ':00 ~ ' + expectTime.endHour + ':00 上门取件' }}</text>
			<s-button v-if="type === 'stay'" width="160" height="56" text="修改时间" fontSize="28" background="#ffffff"
				color="#06180C" :bold="false" :custom-style="{border: '1px solid #707070', marginLeft: '46rpx'}" @click="click"/>
		</view>
	</view>
</template>

<script>
	import sButton from '@/components/pages/s-button'
	export default {
		components: {
			sButton
		},
		props: {
			type: String,
			expectTime: Object
		},
		methods: {
			click() {
				this.$emit('timeClick')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.ml_18 {
		margin-left: 18rpx;
	}

	.time {
		margin-top: 20rpx;
	}
</style>
