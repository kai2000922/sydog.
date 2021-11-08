<template>
	<view class="step" :style="stepStyle">
		<view class="step_logo">
			<image src="@/static/logo.png"/>
		</view>
		<u-row :gutter="itemGutter">
			<u-col v-for="(item,index) in dataList" :key="index" :span="item.span">
				<view style="display: flex; justify-content: center;">
					<view class="step_schedule">
						<view class="step_schedule_icon" :class="{'step_schedule_icon_choice': item.choice === true}">{{ item.index }}</view>
						<view class="step_schedule_text" :class="{'step_schedule_text_choice': item.choice === true}">
							<text v-text="item.title"></text>
							<text v-text="item.subTitle"></text>
						</view>
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
				type: Object,
				default: () => ({})
			}
		},
	}
</script>

<style lang="scss" scoped>
	
	$s_color_green: #44aa67;
	
	.step {
		
		&_logo {
			margin-bottom: 13rpx;
			
			&>image {
				width: 220rpx;
				height: 56rpx;
			}
		}
		
		&_schedule {
			display: flex;
			align-items: center;
			justify-content: space-between;
			
			&_icon {
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				height: 48rpx;
				width: 48rpx;
				border-radius: 24rpx;
				border: 1rpx dashed #ffffff;
				color: #ffffff;
				font-size: 24rpx;
				font-weight: lighter;
				opacity: 0.7;
				
				&_choice {
					background: #ffffff;
					color: $s_color_green;
					font-weight: bold;
					opacity: 1;
				}
			}
			
			&_text {
				flex: 1;
				display: flex;
				margin-left: 16rpx;
				height: 100%;
				flex-direction: column;
				vertical-align: top;
				opacity: 0.7;
				
				&>text:first-child {
					line-height: normal;
					font-size: 32rpx;
					color: #ffffff;
				}
				
				&>text:last-child {
					line-height: normal;
					font-size: 24rpx;
					color: #ffffff;
				}
				
				&_choice {
					color: #ffffff;
					font-weight: bold;
					opacity: 1;
				}
			}
		}
	}
</style>
