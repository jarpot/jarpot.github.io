<template>
	<view>
		这里是left-window页面
		<view @click="bbb">
			点我
		</view>
		{{msg}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:'你好'
			}
		},
		methods: {
			bbb(){
				console.log('监听到了自定义事件')
				
			}
		},
		mounted(){
			uni.$on('zidingyi',(e)=>{
				console.log(e)
				this.msg = e
			})
		},
		onShow() {
			
		}
	}
</script>

<style>

</style>
