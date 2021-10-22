<!--
 * @Author: your name
 * @Date: 2021-10-18 15:18:12
 * @LastEditTime: 2021-10-18 15:37:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \liangzhi_examination_1Xd:\2021WebCode\zhilian_blockChainV1\src\App.vue
-->
<template>
	<div id="app">
		<mooc-header></mooc-header>
		<transition name="slide-fade">
			<router-view v-if="isRouterLive"></router-view>
		</transition>
	</div>
</template>

<script>
import moocHeader from './components/common/Header';
export default {
	name: 'App',
	data () {
		return {
			isRouterLive: true,
			transitionName: 'slide-left',
			pathList: []
		};
	},
	provide () {
		return {
			reload: this.reload
		};
	},
	watch: {

	},
	components: {
		moocHeader
	},
	methods: {
		reload () {
			this.isRouterLive = false;
			this.$nextTick(() => {
				this.isRouterLive = true;
			});
		}
	}
};
</script>
<style lang="">
.slide-fade-enter-active {
	position: absolute;
	width:100%;
	overflow: hidden;
	transition: all 1s cubic-bezier(.55, 0, .1, 1);
}
.slide-fade-leave-active {
	position: absolute;
	width:100%;
	overflow: hidden;
	transition: all 1.5s cubic-bezier(.55, 0, .1, 1);
}
.slide-fade-enter{
	opacity: 0;
	/* transform: translateX(1200px); */
	transform: translateX(10px)
}
.slide-fade-leave-active {
	opacity: 0;
	/* transform: translateX(-1200px); */
	transform: translateX(-10px)
}
</style>
