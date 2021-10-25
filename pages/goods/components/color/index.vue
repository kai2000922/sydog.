<template>
	<view class="color">
		<view class="color_title">
			<text>颜色分类</text>
		</view>
		<u-row gutter="0">
			<u-col span="4" v-for="(item, index) in colorList">
				<view class="color_item" :class="selectIndex === index ? 'color_item_choice' : ''" @click="itemSelect(index,item)">
					<u-image :src="item.img" width="100%" height="100%"/>
				</view>
				<view class="color_item_text" :class="selectIndex === index ? 'color_item_text_choice' : ''" v-text="item.label" @click="itemSelect(index,item)"></view>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		props: {
			colorList: Array
		},
		data() {
			return {
				selectIndex: -1
			}
		},
		methods: {
			itemSelect(index, item) {
				console.log(item);
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
	.color {
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
		
		&_item {
			box-sizing: border-box;
			margin-top: 24rpx;
			width: 218rpx;
			height: 218rpx;
			background: #D8D8D8;
			border-radius: 18rpx;
			overflow: hidden;
			
			&_choice {
				border: 1rpx solid #43a668;
			}
			
			&_text {
				box-sizing: border-box;
				margin-top: 8rpx;
				width: 218rpx;
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
	}
</style>
