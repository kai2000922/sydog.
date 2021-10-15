<template>
	<view :style="stepStyle">
		<u-row :gutter="itemGutter">
			<u-col v-for="(item,index) in dataList" :key="index" :span="item.span">
				<view class="schedule">
					<span class="step-icon" :class="{'step-icon-choice': item.choice === true}">{{ item.index }}</span>
					<view class="step-text" :class="{'step-text-choice': item.choice === true}">
						<span v-text="item.title"></span>
						<span v-text="item.subTitle"></span>
					</view>
				</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		name: "Step",
		props: {
			dataList: {
				type: Array,
				default: () => []
			},
			itemGutter: {
				type: String,
				default: '0'
			},
			stepStyle: {
				type: String,
				default: ''
			}
		},
	}
</script>

<style lang="scss" scoped>
	.schedule {
		display: flex;
		align-items: center;
		justify-content: center;

		.step-icon {
			display: inline-block;
			box-sizing: border-box;
			height: 48rpx;
			width: 48rpx;
			border-radius: 50%;
			border: 1rpx dashed #ffffff;
			color: #ffffff;
			text-align: center;
			font-size: 24rpx;
			opacity: 0.7;
		}

		.step-icon-choice {
			background: #ffffff;
			color: $app-theme-color;
			font-weight: bolder;
			opacity: 1;
		}

		.step-text {
			display: inline-flex;
			margin-left: 16rpx;
			height: 100%;
			flex-direction: column;
			justify-content: space-between;
			vertical-align: top;
			opacity: 0.7;
		}

		.step-text-choice {
			color: #ffffff;
			font-weight: bolder;
			opacity: 1;
		}

		.step-text>span:first-child {
			line-height: normal;
			font-size: 32rpx;
			color: #ffffff;
		}

		.step-text>span:last-child {
			line-height: normal;
			font-size: 24rpx;
			color: #ffffff;
		}
	}
</style>
