<template>
	<s-panel :custom-style="{overflow: 'hidden'}">
		<view class="pickup" @click="addressSelect">
			<view class="main">
				<image class="main_che" src="@/static/che.png"/>
				<view class="main_content">
					<text v-if="showModel === 1" class="placeholder">+添加收货地址</text>
					<view v-if="showModel === 2">
						<view class="contact">
							<text class="man">{{ info.user }}</text>
							<text class="phone">{{ info.phone }}</text>
						</view>
						<text class="address">{{ info.prov + info.city + info.area + info.address }}</text>
					</view>
					
				</view>
			</view>
			<image class="right" src="@/static/arrow-right.png"/>
		</view>
		<s-dot-line :height="20"
					:itemNumber="25"
					:customStyle="{position: 'absolute', bottom: 0, left: 0, right: 0}"
					:line-style="{opacity: 0.7, background: '#43A668'}"/>
	</s-panel>
</template>

<script>
	import SPanel from '@/components/pages/s-panel'
	import SDotLine from '@/components/pages/s-dot-line'
	
	export default {
		components: {
			SPanel,
			SDotLine
		},
		data() {
			return {
				// 显示模式
				showModel: 1,
				
				info: {
					// 联系人
					user: '',
					// 联系电话
					phone: '',
					// 省
					prov: '',
					// 市
					city: '',
					// 区
					area: '',
					// 详细地址
					address: ''
				}
			}
		},
		methods: {
			addressSelect() {
				uni.chooseAddress({
					success: (res) => {
						try{
							if (res.resultStatus == 9000){
								this.info.user = res.userName
								this.info.phone = res.telNumber
								this.info.prov = res.result.prov
								this.info.city = res.result.city
								this.info.area = res.result.area
								this.info.address = res.result.address
								this.showModel = 2
							}
						}catch(e){
							console.log(e)
						}
					},
					fail: (res) => {
						console.log(rs);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pickup {
		position: relative;
		padding: 22rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		.main {
			flex: 1;
			display: flex;
			align-items: center;
			overflow: hidden;
			
			&_che {
				margin-left: 22rpx;
				margin-right: 32rpx;
				width: 64rpx;
				height: 64rpx;
			}
			
			&_content {
				flex: 1;
				display: flex;
				flex-direction: column;
				overflow: hidden;
				
				.placeholder {
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #06180C;
					letter-spacing: 0;
				}
				
				.contact {
					flex: 1;
					display: flex;
					align-items: center;
					
					.man {
						font-family: PingFangSC-Regular;
						font-size: 28rpx;
						color: #06180C;
						letter-spacing: 0;
					}
					
					.phone {
						padding-left: 8rpx;
						font-family: PingFangSC-Regular;
						font-size: 24rpx;
						color: #06180C;
						letter-spacing: 0;
					}
				}
				
				.address {
					margin-top: 7rpx;
					flex: 1;
					font-family: PingFangSC-Regular;
					font-size: 24rpx;
					color: #06180C;
					letter-spacing: 0;

				}
			}
		}
		
		&>image {
			vertical-align: middle;
		}
		
		.right {
			width: 40rpx;
			height: 40rpx;
		}
		
	}
</style>
