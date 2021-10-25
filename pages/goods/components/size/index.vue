<template>
	<view class="szie">
		<view class="size_title">
			<text>尺码</text>
		</view>
		<u-row gutter="0">
			<u-col span="3" v-for="(item, index) in sizeList">
				<view class="size_select_item" :class="selectIndex === index ? 'size_select_item_choice' : ''" @click="itemSelect(index, item)">{{ item.label }}</view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		props: {
			sizeList: Array
		},
		data() {
			return {
				selectIndex: -1
			}
		},
		methods: {
			itemSelect(index, item) {
				if(index === this.selectIndex) {
					this.selectIndex = -1
					this.$emit('cancel')
					return
				}
				this.selectIndex = index
				this.$emit('click', item.value)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.size {
		display: flex;
		flex-direction: column;

		&_title {
			font-family: PingFangSC-Semibold;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
		}

		&_select_item {
			margin-top: 24rpx;
			width: 160rpx;
			height: 64rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			background: #F0F0F0;
			border-radius: 18rpx;
			font-family: PingFangSC-Semibold;
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			
			&_choice {
				box-sizing: border-box;
				border: 1rpx solid #43a668;
				color: #43a668;
				background: rgba($color: #43a668, $alpha: 0.1);
			}
		}
	}
</style>
