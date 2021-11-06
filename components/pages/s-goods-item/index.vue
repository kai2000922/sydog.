<template >
	<view :style="[customStyle]" class="s_gd_item" @click="goodsClick">
		<view class="s_gd_item_img">
			<image :src="'http://49.235.238.110' + goods.descImages"/>
		</view>
		<view>
			<text class="s_gd_item_name">{{goods.goodsName}}</text>
			<view v-if="type === '1'" class="s_gd_item_con">
				<text class="s_gd_item_con_price">价值¥{{goods.hxPrice}}</text>
				<text class="s_gd_item_con_man">99999+人已换</text>
			</view>
			
			<view v-if="type === '2' || type === '3' || type === '4'" class="s_gd_item_no">
				<view class="s_gd_item_no_info">
					<text class="s_gd_item_no_info_price">价值¥{{goods.hxPrice}}</text>
					<text class="s_gd_item_no_info_man">99999+人已换</text>
				</view>
				<s-button width="128" 
						height="56" 
						:custom-style="{}" 
						:background="type === '2' || type === '4' ? '#BFBFBF' :  '#43A668'"
						color="#FFFFFF"
						:text="type === '2' ? '未称重' : type === '3' ? '付邮领' : '不可领'"
						fontSize="28"
						:bold="false"/>
			</view>
		</view>
	</view>
</template>

<script>
	import sButton from '../s-button'
	export default {
		components: {
			sButton
		},
		props: {
			// 自定义样式
			customStyle: {
				type: Object,
				default: () => ({})
			},
			goods: {
				type: Object,
				default: () => ({})
			},
			// 类型：{1: 默认, 2: 未称重, 3: 已解锁, 4: 未解锁}
			type: {
				type: String,
				default: '1'
			}
		},
		methods:{
			goodsClick(){
				this.$emit('click', this.goods)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s_gd_item {
		width: 300rpx;
		display: flex;
		box-sizing: border-box;
		flex-direction: column;
		font-family: PingFangSC-Regular;
		
		&_img {
			width: 300rpx;
			height: 200rpx;
			margin-bottom: 10rpx;
			background: #D8D8D8;
			border-radius: 30rpx;
			overflow: hidden;
			
			image {
				width: 100%;
				height: 100%;
			}
		}
		
		&_name {
			font-size: 28rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 42rpx;
		}
		
		&_con {
			margin-top: 4rpx;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			font-size: 24rpx;
			line-height: 36rpx;
			letter-spacing: 0;
			
			&_price {
				color: #06180C;
			}
			
			&_man {
				color: #B0B7B3;
			}
		}
		
		&_no {
			margin-top: 4rpx;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			
			&_info {
				flex: 1;
				display: flex;
				flex-direction: column;
				font-size: 24rpx;
				line-height: 36rpx;
				letter-spacing: 0;
				
				&_price {
					color: #06180C;
				}
				
				&_man {
					margin-top: 8rpx;
					color: #B0B7B3;
				}
			}
		}
	}
</style>
