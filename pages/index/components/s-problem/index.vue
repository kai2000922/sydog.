<template>
	<view class="problem">
		<view class="title">
			<image src="@/static/cjwt.png"/>
		</view>
		<uni-collapse accordion>
		    <uni-collapse-item v-for="(item, index) in collapseList":key="index">
				<template v-slot:title>
					<view class="collapse_title">
						<image src="@/static/wticon.png"/>
						<text>{{ item.title }}</text>
					</view>
				</template>
		        <view class="collapse_text">{{ item.text }}</view>
		    </uni-collapse-item>
		</uni-collapse>
		<view class="bottom" tnt-inst-id="n8c_Hb8w" scene="SCE01205269" color="#30BB63">
			<contact-button tnt-inst-id="n8c_Hb8w" scene="SCE01205269" color="#30BB63"/>
			<text>联系客服</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collapseList: [
					{
						title: '哪些旧衣服可以回收？',
						text: '衣服，鞋子，帽子等都可回收，对衣服的新旧程度、大小没有要求，8kg以上起收，春夏装20-40件 秋冬装10-30件。'
					},
					{
						title: '回收后的衣服怎么处理？',
						text: '快递小哥取走您的衣服后，您的衣服会被邮寄到分拣工厂，经过分拣后，依据衣服的新旧程度来进行环保再生，部分出口。'
					},
					{
						title: '需要运费吗？',
						text: '旧衣服回收是不需要运费的，您成功预约后，快递员免费上门取衣服，全程无需您承担任何费用；兑换的商品订单依据商品的不同支付相应的运费。'
					},
					{
						title: '快递员什么时候上门',
						text: '在您预约上门时间当天，快递员会电话联系您，也会给您发送快递员电话的短信，请保持手机畅通哦~'
					},
					{
						title: '不能上门回收的区域有哪些？',
						text: '江西、海南、广西、云南、甘肃、青海、台湾、香港、内蒙、西藏、宁夏、新疆省份没有开通服务，请您谅解~'
					}
				]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.problem {
		margin: 30rpx;
		padding: 30rpx;
		background: #FFFFFF;
		box-shadow: 0 1rpx 24px 0 #E8F0EB;
		border-radius: 40rpx;
		.title {

			&>image {
				margin-top: -6rpx;
				margin-left: -50rpx;
				width: 203rpx;
				height: 54rpx;
				vertical-align: middle;
			}
		}

		.collapse {
			&_title {
				margin: 30rpx 0;
				display: flex;
				align-items: center;

				&>image {
					width: 30rpx;
					height: 30rpx;
					vertical-align: middle;
				}

				&>text {
					margin-left: 10rpx;
					font-family: PingFangSC-Regular;
					font-size: 28rpx;
					color: #06180C;
					letter-spacing: 0;
					line-height: 54rpx;
				}
			}

			&_text {
				padding-bottom: 50rpx;
				font-family: PingFangSC-Regular;
				font-size: 28rpx;
				color: #30BB63;
				letter-spacing: 0;
				line-height: 42rpx;
			}
		}

		.bottom {
			margin-top: 30rpx;
			display: flex;
			align-items: center;
			justify-content: center;

			&>image {
				width: 50rpx;
				height: 50rpx;
				vertical-align: middle;
			}

			&>text {
				margin-left: 10rpx;
				font-family: PingFangSC-Semibold;
				font-size: 28rpx;
				font-weight: bold;
				color: #30BB63;
				letter-spacing: 0;
				line-height: 42rpx;
			}
		}
	}
</style>
