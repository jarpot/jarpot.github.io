<template>
	<view>
		这是购物车页面
		<button type="default" @click="aaa">点我获取位置</button>
		<button type="default" @click="goList">跳转到list</button>
		<button type="default" @click="upload">上传图片</button>
		<view>
			<uni-calendar ref="calendar" :insert="false" @confirm="confirm" />
			<button @click="open">打开日历</button>
		</view>
		<view>
			<uni-data-picker placeholder="请选择地址" popup-title="请选择城市" :localdata="items"
				field="code as value, name as text" orderby="value asc" :step-searh="true" self-field="code"
				parent-field="parent_code" @change="onchange" @nodeclick="onnodeclick">
			</uni-data-picker>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [{
						text: "一年级",
						value: "1-0",
						children: [{
								text: "1.1班",
								value: "1-1"
							},
							{
								text: "1.2班",
								value: "1-2"
							}
						]
					},
					{
						text: "二年级",
						value: "2-0"
					},
					{
						text: "三年级",
						value: "3-0"
					}
				]
			}

		},
		methods: {
			onchange(e) {
				const value = e.detail.value
				console.log(value);
			},
			onnodeclick(node) {},
			open() {
				this.$refs.calendar.open();
			},
			confirm(e) {
				console.log(e);
			},
			upload() {
				uni.chooseImage({
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
									console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data
										.index + 1) + '张图片');
								},
								fail: function(err) {
									console.log(err.errMsg);
								}
							}
						});
					}
				});

			},
			goList() {
				/* uni.navigateTo({
					url: '/pages/list/list',
					animationType: 'zoom-out',
					animationDuration: 2000
				}); */

				/* uni.getSystemInfo({
					success: function (res) {
						console.log(res.model);
						console.log(res.pixelRatio);
						console.log(res.windowWidth);
						console.log(res.windowHeight);
						console.log(res.language);
						console.log(res.version);
						console.log(res.platform);
					}
				}); */

				/* uni.showModal({
					title: '提示',
					content: '这是一个模态弹窗',
					success: function (res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				}); */

				/* uni.showActionSheet({
					itemList: ['A', 'B', 'C'],
					success: function (res) {
						console.log('选中了第' + (res.tapIndex + 1) + '个按钮');
					},
					fail: function (res) {
						console.log(res.errMsg);
					}
				}); */

				uni.setNavigationBarTitle({
					title: '新的标题'
				});
			},
			aaa() {
				/* uni.getLocation({
					type: 'wgs84',
					success: function(res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				}); */
				uni.getLocation({
					type: 'gcj02', //返回可以用于uni.openLocation的经纬度
					success: function(res) {
						const latitude = res.latitude;
						const longitude = res.longitude;
						uni.openLocation({
							latitude: latitude,
							longitude: longitude,
							success: function() {
								console.log('success');
							}
						});
					}
				});
			}
		}
	}
</script>

<style>

</style>
