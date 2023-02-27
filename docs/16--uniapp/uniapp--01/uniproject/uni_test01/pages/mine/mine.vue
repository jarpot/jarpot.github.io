<template>
	<view>
		这里是mine.vue页面
		<search></search>
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
			<button @click="open">打开日历</button>
		</view>

		<!-- 一般用法 -->
		<uni-countdown :day="1" :hour="1" :minute="12" :second="40"></uni-countdown>

		<!-- 不显示天数 -->
		<uni-countdown :show-day="false" :hour="12" :minute="12" :second="12"></uni-countdown>

		<!-- 修改颜色 -->
		<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="1" :hour="2" :minute="30"
			:second="0"></uni-countdown>
		<button @click="ccc">点我</button>
		<button @click="bbb">全局自定义事件</button>
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
		
		<!-- #ifdef H5 ||MP-WEIXIN  -->
			<view>这是h5显示的内容</view>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<view>这是微信小程序显示的内容</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}]
			}
		},
		methods: {
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e);
			},
			aaa() {
				const app = getApp()
				console.log(app.globalData)
			},
			bbb() {
				console.log("触发了自定义事件")
				uni.$emit('zidingyi', '我是自定义事件的参数')
			},
			ccc() {
				// 从相册选择6张图
				/* uni.chooseImage({
					count: 6,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success: function(res) {
						// 预览图片
						uni.previewImage({
							urls: res.tempFilePaths,
							longPressActions: {
								itemList: ['发送给朋友', '保存图片', '收藏'],
								success: function(data) {
									console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
								},
								fail: function(err) {
									console.log(err.errMsg);
								}
							}
						});
					}
					}); */

				uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			}
		}
	}
</script>

<style>

</style>
