<template>
	<view class="content">
		<z-paging ref="paging" v-model="dataList" @query="queryList" :fixed="false" :auto="false" empty-view-text="暂时没有订单哦~">
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view v-for="(item, index) in dataList" :key="index">
				<recyle :item="item" @formChange="showUpdate" @update="updateRecycle(item.recycleID, -2)" @delete="deleteRecycle(item)" @sto="toShopping"/>
			</view>
		</z-paging>
		
		<u-popup v-model="alterPopup" height="85%" mode="bottom" close-icon="close-circle" :closeable="true" close-icon-color="#B0B7B3">
			<view class="alter">
				<view class="alter_title">
					<text>修改订单信息</text>
				</view>
				<view class="alter_form">
					<s-form :addressObj.sync="updateInfo.expectAddress" :date.sync="updateInfo.expectTime" :weight.sync="updateInfo.expectWeight" :address="updateInfo.expectAddressLabel" :contacts="updateInfo.contacts" />
				</view>
				<view style="display: flex; align-items: center; justify-content: center; margin-bottom: 48rpx;">
					<s-button background="#43A668" width="690" height="120" color="#FFFFFF" :custom-style="{}" text="确认修改" @click="updateRecycle(updateInfo.recycleID, -1)" />
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import recyle from '../recycle'
	import sButton from '@/components/pages/s-button'
	import sForm from '@/components/pages/s-form'
	
	import api from '@/utils/api.js'
	
	export default {
		components: {
			recyle,
			sButton,
			sForm
		},
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				firstLoaded: false,
				// 修改弹出层
				alterPopup: false,
				// 修改表单
				updateInfo: {
					recycleID: '',
					contacts: '',
					expectTime: '',
					expectWeight: 0,
					expectAddressLabel: '',
					expectAddress: {}
				},
			}
		},
		props: {
			//当前组件的index，也就是当前组件是swiper中的第几个
			tabIndex: {
				type: Number,
				default: function() {
					return 0
				}
			},
			//当前swiper切换到第几个index
			currentIndex: {
				type: Number,
				default: function() {
					return 0
				}
			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						//懒加载，当滑动到当前的item时，才去加载
						if (!this.firstLoaded) {
							setTimeout(() => {
								this.$refs.paging.reload();
							}, 5);
						}
					}
				},
				immediate: true
			}
		},
		methods: {
			
			//获取回收订单
			queryList(pageNo, pageSize) {
				api.login().then(flag => {
					if(!flag) {
						this.$refs.paging.complete(false);
						return
					}
					const params = {
						pageNum: pageNo,
						pageSize: pageSize,
						// orderStatus: '待上门'
						user: this.$store.getters.userid
					}
					this.$tip.loading()
					this.$http.post('/recycle/recycle/list', params).then(res => {
						this.$refs.paging.complete(res.data.rows);
						this.firstLoaded = true;
					}).catch(err => {
						this.$refs.paging.complete(false);
					})
				})
				
			},
			
			// 修改弹窗弹出
			showUpdate(item) {
				this.updateInfo.recycleID = item.recycleID
				this.updateInfo.contacts = item.name + ' ' + item.phone
				this.updateInfo.expectAddressLabel = item.address
				this.updateInfo.expectTime = item.expectTime
				this.updateInfo.expectWeight = item.expectWeight
				this.alterPopup = true
			},
			
			// 删除回收订单
			deleteRecycle(item) {
				this.$tip.loading('删除中')
				if (item.recycleID !== '') {
					this.$http.post('/recycle/recycle/removeOrder', {ids: item.recycleID}).then(res => {
						this.$tip.success('删除成功')
						this.$refs.paging.refresh()
					})
				} else {
					this.$tip.toast('订单不存在')
				}
			},
			
			/*
				orderID 订单ID
				status 修改后的订单状态，
				param 修改订单后附带的参数
				1. 取消原因
				2. 修改时间 字符串 yyyy-mm-dd hh-mm-ss
				3. 修改地址 重新获取后拼接成的字符串，由
				省份 城市 地区 详细地址 姓名 联系电话 6部分组成，中间用英文";"分割。
			*/
			updateRecycle(recycleID, status) {
				this.$tip.loading('修改中')
				this.$http.post('/recycle/recycle/editOrder', {
					orderStatus: status,
					param: this.getAddressString(),
					orderID: recycleID
				}).then(res => {
					this.$tip.success('修改成功！')
					this.$refs.paging.refresh()
				}).finally(() => {
					this.alterPopup = false
				})
			},
			
			getAddressString() {
				//修改后的收货地址
				let addressInfo = this.updateInfo.expectAddress.prov == null ? ' ' : this.updateInfo.expectAddress.prov +
					";" + this.updateInfo.expectAddress.city + ";" + this.updateInfo.expectAddress.area + ";" +
					this.updateInfo.expectAddress.prov + this.updateInfo.expectAddress.city + this.updateInfo.expectAddress
					.area + this.updateInfo.expectAddress.street +
					this.updateInfo.expectAddress.address + ";" + this.updateInfo.expectAddress.fullname + ";" + this
					.updateInfo.expectAddress.mobilePhone
			
				//修改后的时间
				let timeInfo = this.updateInfo.expectTime
			
				//修改后的期望重量
				let weightInfo = this.updateInfo.expectWeight
			
				return timeInfo + "," + weightInfo + "," + addressInfo
			},
			
			// 前往商品页
			toShopping() {
				uni.switchTab({url: '/pages/shopping/index'})
			},
		}
	}
</script>

<style lang="scss" scoped>
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */
	.content {
		height: 100%;
	}
	
	.alter {
		&_title {
			display: flex;
			justify-content: center;
			margin-top: 40rpx;
			font-family: PingFangSC-Semibold;
			font-size: 36rpx;
			font-weight: bold;
			color: #06180C;
			letter-spacing: 0;
			line-height: 54rpx;
		}
	
		&_form {
			padding: 56rpx 92rpx 48rpx 92rpx;
		}
	}
</style>
