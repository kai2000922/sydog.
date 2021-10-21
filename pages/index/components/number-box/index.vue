<template>
	<view class="numbox">
		<view @click="_calcValue('minus')" class="numbox__minus" :class="{ 'numbox-disabled': inputValue <= min || disabled }">
			<text class="numbox-text">-</text>
		</view>
		<input class="numbox_value" @blur="_onBlur" type="number" v-model="inputValue"/>
		<view @click="_calcValue('plus')" class="numbox_plus">
			<text class="numbox-text">+</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'NumberBox',
		props: {
			value: {
				type: [Number, String],
				default: 1
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				inputValue: 0
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			}
		},
		created() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue(type) {
				if (this.disabled) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
					if (value < (this.min * scale)) {
						return;
					}
					if (value > (this.max * scale)) {
						value = this.max * scale
					}
				}
			
				if (type === "plus") {
					value += step;
					if (value > (this.max * scale)) {
						return;
					}
					if (value < (this.min * scale)) {
						value = this.min * scale
					}
				}
			
				this.inputValue = (value / scale).toFixed(String(scale).length - 1);
				this.$emit("change", +this.inputValue);
				// TODO vue2 兼容
				this.$emit("input", +this.inputValue);
				// TODO vue3 兼容
				this.$emit("update:modelValue", +this.inputValue);
			},
			_getDecimalScale() {
			
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, String(this.step).split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				// console.log(event.detail.value);
				this.$emit('blur', event)
				let value = event.detail.value;
				if (!value || isNaN(value)) {
					this.inputValue = this.min;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				const scale = this._getDecimalScale();
				this.inputValue = value.toFixed(String(scale).length - 1);
				this.$emit("change", +this.inputValue);
				this.$emit("input", +this.inputValue);
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.numbox {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		width: 240rpx;
		height: 72rpx;
		padding: 12rpx;
		background: #F6F7F9;
		border-radius: 36rpx;
		
		>.numbox_value {
			width: 100rpx;
			text-align: center;
			background: none;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			color: #06180C;
			letter-spacing: 0;
		}
		
		>.numbox__minus {
			width: 48rpx;
			height: 48rpx;
			border-radius: 24rpx;
			background: #43A668;
			text-align: center;
			color: #ffffff;
		}
		
		>.numbox-disabled {
			background: #DFDFDF;
			color: #BDBDBD;
		}
		
		>.numbox_plus {
			width: 48rpx;
			height: 48rpx;
			border-radius: 24rpx;
			background: #43A668;
			text-align: center;
			color: #ffffff;
		}
		
		>.numbox-text {
			font-size: 36rpx;
			line-height: 48rpx;
		}
		
		>.numbox-company {
			padding-left: 16rpx;
		}
	}
</style>
