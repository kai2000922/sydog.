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
		<view class="bottom">
			<image src="@/static/kf.png"/>
			<text>我要找客服</text>
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
						text: '衣服，鞋子，帽子等都可回收，对衣服的新旧程度、大小没有要求，8kg以上起收，大概30-40件。'
					},
					{
						title: '回收后的衣服怎么处理？',
						text: '衣服，鞋子，帽子等都可回收，对衣服的新旧程度、大小没有要求，8kg以上起收，大概30-40件。'
					},
					{
						title: '需要运费吗？',
						text: '衣服，鞋子，帽子等都可回收，对衣服的新旧程度、大小没有要求，8kg以上起收，大概30-40件。'
					},
					{
						title: '不能上门回收的区域有哪些？',
						text: '衣服，鞋子，帽子等都可回收，对衣服的新旧程度、大小没有要求，8kg以上起收，大概30-40件。'
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
