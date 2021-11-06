<template>
	<view class="grid">
		<view class="grid_title_row">
			<text class="grid_title_row_title">旧衣鞋帽包回收，换好礼！</text>
			<view class="grid_title_row_extra">
				<image src="@/static/question-circle-fill.svg"></image>
				<text>有哪些好礼</text>
			</view>
		</view>
		<view class="grid_row2">
			<uni-grid :column="5" :showBorder="false" :highlight="false">
				<uni-grid-item v-for="(item, index) in gridList" :key="index">
					<view class="grid_row2_item">
						<u-image :width="size + 'rpx'" :height="size + 'rpx'" :src="item.img"></u-image>
						<view class="grid_row2_item_text" v-text="item.text" />
					</view>
				</uni-grid-item>
			</uni-grid>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			gridList: {
				type: Array,
				default: () => []
			},
			size: {
				type: Number,
				default: 80
			}
		}
	}
</script>

<style lang="scss" scoped>
	.grid {
		
		&_title_row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			
			&_title {
				flex: 1;
				font-family: PingFangSC-Semibold;
				font-size: 36rpx;
				font-weight: bold;
				color: $s_font_color;
				letter-spacing: 0;
				line-height: 54rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			
			&_extra {
				height: 100%;
				display: inline-flex;
				align-items: center;
				
				image {
					width: 32rpx;
					height: 32rpx;
					vertical-align: middle;
				}
				
				text {
					margin-left: 4rpx;
					font-size: 28rpx;
					font-weight: bold;
					color: #43A668;
				}
			}
		}
		
		&_row2 {
			margin-top: 40rpx;
			
			&_item {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;
				
				&_text {
					font-size: 24rpx;
					color: #B0B7B3;
					letter-spacing: 0;
				}
			}
		}
	}
</style>
