<template>
	<view>
		<view :animation="animationData" style="background:red;height:100rpx;width:100rpx"></view>
		这是我的Mine页面:{{msg}}
		<match-media :min-width="375" :max-width="800">
			<view>当页面最小宽度 375px， 页面宽度最大 800px 时显示</view>
		</match-media>
		<view class="item">
			<icon type="waiting" size="26" />
			<text>图标</text>
		</view>

		<!-- 条件编译 -->
		<!-- #ifdef H5 -->
		这是展示在h5页面的数据
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		这是展示在微信页面的数据
		<!-- #endif -->

		<view class="page-section page-section-gap" style="text-align: center;">
			<audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name"
				:author="current.author" :action="audioAction" controls></audio>
		</view>
		<view>
			<camera device-position="back" flash="off" @error="error" style="width: 100%; height: 300px;"></camera>
			<button type="primary" @click="takePhoto">拍照</button>
			<view>预览</view>
			<image mode="widthFix" :src="src"></image>
		</view>
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
				</map>
			</view>
		</view>
		<view>
			<text>hello</text>
			<button @tap="test">click me</button>
			<video :src="src"></video>
		</view>
		<button type="default"  @click="paizhao">点我拍照</button>
		<button type="default" @click="aaaa">测试设置tabbar</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg: '',
				current: {
					poster: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
				},
				audioAction: {
					method: 'pause'
				},
				src: "",
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
				}],
				animationData: {}

			}
		},
		onLoad() {
			const app = getApp()
			this.msg = app.globalData.msg
			console.log(app.globalData.msg)
		},
		onShow: function(){
		    var animation = uni.createAnimation({
		      duration: 1000,
		        timingFunction: 'ease',
		    })
		
		    this.animation = animation
		
		    animation.scale(2,2).rotate(45).step()
		
		    this.animationData = animation.export()
		
		    setTimeout(function() {
		      animation.translate(30).step()
		      this.animationData = animation.export()
		    }.bind(this), 1000)
		  },
		methods: {
			takePhoto() {
				const ctx = uni.createCameraContext();
				ctx.takePhoto({
					quality: 'high',
					success: (res) => {
						this.src = res.tempImagePath
					}
				});
			},
			error(e) {
				console.log(e.detail);
			},
			test: function() {
				var self = this;
				uni.chooseVideo({
					sourceType: ['camera', 'album'],
					success: function(res) {
						self.src = res.tempFilePath;
					}
				});
			},
			paizhao(){
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['camera '], //从相册选择
					success: function (res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			aaaa(){
				uni.setTabBarItem({
				  index: 0,
				  text: '你好哈哈哈',
				  iconPath: '',
				  selectedIconPath: ''
				})
			},
			rotateAndScale: function () {
			      // 旋转同时放大
			      this.animation.rotate(45).scale(2, 2).step()
			      this.animationData = this.animation.export()
			    },
			    rotateThenScale: function () {
			      // 先旋转后放大
			      this.animation.rotate(45).step()
			      this.animation.scale(2, 2).step()
			      this.animationData = this.animation.export()
			    },
			    rotateAndScaleThenTranslate: function () {
			      // 先旋转同时放大，然后平移
			      this.animation.rotate(45).scale(2, 2).step()
			      this.animation.translate(100, 100).step({ duration: 1000 })
			      this.animationData = this.animation.export()
			    }
		}
	}
</script>

<style>

</style>
