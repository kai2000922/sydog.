<template>
	<view class="box">
		<view class="goods_box">
			<scroll-view scroll-x="true" class="scroll_x" :scroll-left="left" scroll-with-animation>
				<view :id="index" class="goods" v-for="(item, index) in list" :key="index" @click="toGoods(item.id)">
					<image class="shangpinkuang" src="@/static/index/shangpinkuang.png" />
					<view class="item">
						<image class="mianfeijiaobiao" src="@/static/index/mianfeijiaobiao.png"/>
						<u-image width="100%" height="100%" :src="item.img" />
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="right" @click="toShopping">
			<image src="@/static/index/gengduo.png"/>
		</view>
		<view class="bottom">
			<image class="chuansongdai" src="@/static/index/chuansongdai.png" />
			<image class="dengpai" src="@/static/index/dengpai.png" />
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				array: [
					'https://picsum.photos/217/144?blur=1',
					'https://picsum.photos/seed/picsum/217/144',
					'https://picsum.photos/217/144',
					'https://picsum.photos/217/144?blur=1',
					'https://picsum.photos/seed/picsum/217/144',
					'https://picsum.photos/217/144'
				],
				left: 0,
			}
		},
		methods: {
			// 跳转到商城
			toShopping() {
				uni.switchTab({ url: '/pages/shopping/index' })
			},

			toGoods(index){
				this.$emit('goodsClick', index)
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	/deep/ ::-webkit-scrollbar {
		display: none;//设置隐藏
		width: 0 !important;//设置大小
		height: 0 !important;//设置大小
		-webkit-appearance: none;
		background: transparent;
	}
	
	.box {
		position: relative;
		width: 750rpx;
		height: 225rpx;
		margin: 40rpx 0 0 0;
		display: flex;
		align-items: flex-end;

		.goods_box {
			position: absolute;
			left: 0;
			top: 0;
			width: 750rpx;
			height: 156rpx;

			.scroll_x {
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
			}

			.goods {
				position: relative;
				width: 224rpx;
				height: 156rpx;
				margin-left: 35rpx;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				flex-shrink: 0;

				.shangpinkuang {
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
					height: 100%;
				}

				.item {
					position: relative;
					width: 216rpx;
					height: 144rpx;
					z-index: -100;
					border-radius: 30rpx;
					background: #f3f4f6;
					overflow: hidden;

					.mianfeijiaobiao {
						position: absolute;
						top: 14rpx;
						right: 14rpx;
						width: 64rpx;
						height: 26rpx;
						z-index: 999;
					}
				}
			}
		}

		.right {

			&>image {
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				width: 69rpx;
				height: 146rpx;
			}
		}

		.bottom {
			position: relative;
			bottom: 0;
			width: 750rpx;
			height: 148rpx;
			z-index: -999;

			.chuansongdai {
				width: 100%;
				height: 148rpx;
			}

			.dengpai {
				position: absolute;
				left: 50%;
				bottom: 0;
				transform: translateX(-50%);
				width: 426rpx;
				height: 64rpx;
			}
		}
	}
</style>
