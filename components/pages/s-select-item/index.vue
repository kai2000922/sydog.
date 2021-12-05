<template>
	<view class="item flex_colum"
		:style="{background: select ? '#43A668' : '#EAF3ED'}"
		@click="itemClick">
		<!-- 上半部分 显示重量 -->
		<view style="flex: 1;" class="flex_colum flex_ai_center flex_jc_center" :class="select ? 'font_color_choice' : 'font_color_none'">
			<view>
				<text class="item_weight font_bold" v-text="obj.weight"/>
				<text v-if="last" class="item_above font_18 font_bold">以上</text>
			</view>
			<text style="font-family: PingFangSC-Regular; margin-top: 4rpx; transition: .4s;" class="font_18" v-text="obj.text"/>
		</view>
		<view v-if="select" class="item_select_bar flex_row flex_ai_center flex_jc_center">
			<u-icon :custom-style="{zIndex: 1}" size="24rpx" color="#FFFFFF" name="checkmark-circle-fill" label="已选择" labelSize="18rpx" labelColor="#FFFFFF"/>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			obj: {
				type: Object,
				default: () => ({
					label: '8kg 约20件',
					value: 8,
					choice: false
				})
			},
			select: {
				type: Boolean,
				default: false
			},
			last: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				choice: false
			}
		},
		created() {
			this.choice = this.select
		},
		watch: {
			select(val) {
				this.choice = val
			}
		},
		methods: {
			itemClick() {
				this.$emit('select', this.obj)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.font_color_none {
		color: #41A867;
	}

	.font_color_choice {
		color: #FFFFFF;
	}

	.item {
		width: 144rpx;
		height: 144rpx;
		box-sizing: border-box;
		border-radius: 20rpx;
		overflow: hidden;
		transition: .4s;

		&_weight {
			font-family: Helvetica;
			font-size: 32rpx;
			letter-spacing: 0;
			transition: .4s;
		}

		&_above {
			margin-left: 2rpx;
			font-family: PingFang-SC-Heavy!important;
			letter-spacing: 0;
			transition: .4s;
		}

		&_select_bar {
			position: relative;
			height: 38rpx;

			&::after {
				content: '';
				position: absolute;
				display: block;
				width: 100%;
				height: 100%;
				opacity: 0.6;
				background: #06180C;
			}
		}
	}
</style>
