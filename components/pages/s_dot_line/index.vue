<template>
	<view class="dot_line" :style="[customStyle, {height: height + 'rpx'}]">
		<span v-for="i in itemNumber" :key="i" :style="[lineStyle, {width: itemWidth + 'px', marginLeft: itemWidth + 'px', height: itemHeight + 'px'}]" />
	</view>
</template>

<script>
	export default {
		props: {
			itemNumber: {
				type: Number,
				default: 20
			},
			height: {
				type: Number,
				default: 20
			},
			customStyle: {
				type: Object,
				default: () => {}
			},
			lineStyle: {
				type: Object,
				default: () => {
					return {
						background: '#43A668'
					}
				}
			}

		},
		data() {
			return {
				itemWidth: 0,
				itemHeight: 0,
			}
		},
		mounted() {
			var query = this.createSelectorQuery();
			query.select('.dot_line').boundingClientRect().exec((res) => {
				this.itemWidth = res[0].width / (this.itemNumber * 2)
				this.itemHeight = res[0].height * 2
			});
		}
	}
</script>

<style lang="scss" scoped>
	.dot_line {
		display: flex;
		align-items: center;
		overflow: hidden;

		&>span {
			transform: rotate(30deg);
		}
	}
</style>
