<!--
 * @Author: sunshuainan
 * @Date: 2019-07-29 17:59:30
 * @Description: 1
 -->
<template>
	<div v-if="showRes" class="top-res">
		<my-video v-if="isVideo === 'mp4'" :sources="videoArr.sources" :options="videoArr.options"></my-video>
		<div v-if="isVideo === 'mp3'">
			<a-player :music="songs" ref="player"></a-player>
		</div>
		<iframe v-if="isVideo === 'resIfames'" style="width:100%;height:100%;" :src="iframeUrl"  frameborder="0"></iframe>
	</div>
</template>

<script>
import myVideo from 'vue-video';
import fengmian from './images/fengmian.jpg';
import VueAplayer from 'vue-aplayer';
import logo from './images/curses.png';
export default {
	name: 'stu-res',
	data () {
		return {
			isTool: this.isClose,
			isVideo: false,
			resInfo: '',
			songs: {},
			showRes: false,
			iframeUrl: null,
			videoArr: {
				sources: [{
					src: '',
					type: 'video/mp4'
				}],
				isShow: false,
				options: {
					autoplay: false,
					volume: 0.6,
					poster: fengmian
				}
			}
		};
	},
	props: ['dataSrc'],
	created () {
		// console.log(1);
	},
	watch: {
		dialogVisible () {
			this.isShow = this.dialogVisible;
		},
		dataSrc: {
			handler () {
				console.log(this.dataSrc);
				console.log(this.dataSrc);
				if (this.dataSrc) {
					// let resId = this.dataSrc.resId;
					if (this.dataSrc.resourceType === 'mp4') { // mp4
						this.isVideo = 'mp4';
						this.videoArr.options.poster = this.dataSrc.resourceCover || fengmian;
						this.videoArr.sources[0].src = this.$storage.get('ossUrl') + this.dataSrc.folder + (this.dataSrc.resId || this.dataSrc.resourceId) + '.' + (this.dataSrc.resourceType);
						this.showRes = true;
					} else if (this.dataSrc.resourceType === 'mp3') { // pdf
						this.isVideo = 'mp3';
						let url = this.$storage.get('ossUrl') + this.dataSrc.folder + (this.dataSrc.resId || this.dataSrc.resourceId) + '.' + (this.dataSrc.resourceType);
						console.log(url);
						this.$nextTick(() => {
							this.songs = {
								title: this.dataSrc.resourceName,
								author: '知链',
								url: url,
								pic: logo
							};
							let aplayer = this.$refs.player.control;
							aplayer.play();
						});
						this.showRes = true;
					} else if (this.dataSrc.resourceType === 'pdf') {
						this.showRes = true;
						this.isVideo = 'resIfames';
						let url = this.$storage.get('ossUrl') + this.dataSrc.folder + (this.dataSrc.resId || this.dataSrc.resourceId) + '.' + (this.dataSrc.resourceType);
						console.log(url);
						this.$nextTick(() => {
							this.iframeUrl = url;
						});
					} else if (this.dataSrc.resourceType === '.pdf') {
						this.showRes = true;
						this.isVideo = 'resIfames';
						let url = this.$storage.get('ossUrl') + this.dataSrc.folder + (this.dataSrc.resId || this.dataSrc.resourceId) + '' + (this.dataSrc.resourceType);
						console.log(url);
						this.$nextTick(() => {
							this.iframeUrl = url;
						});
					} else if (this.dataSrc.resourceType === 'url') {
						// 网址外嵌
						this.showRes = true;
						this.isVideo = 'resIfames';
						let url = this.dataSrc.resourceIntroduce;
						console.log(url);
						this.$nextTick(() => {
							this.iframeUrl = url;
						});
					}
				}
			},
			deep: true,
			immediate: true
		}
		// dataSrc () {
		// 	console.log(this.dataSrc);
		// 	let resId = this.dataSrc.resId;
		// 	if (this.dataSrc.resourceName.search('mp4') === -1) { //
		// 		this.isVideo = false;
		// 		this.showRes = true;
		// 	} else { // MP4
		// 		this.isVideo = true;
		// 		this.$nextTick(() => {
		// 			this.videoArr.sources[0].src = this.$storage.get('baseUrl') + '/fileView/resourceView?src=Y&resId=' + resId;
		// 			this.showRes = true;
		// 		});
		// 	}
		// }
	},
	methods: {
		_handleClick () {
			this.$emit('sendMsg', false);
		}
	},
	components: {
		'a-player': VueAplayer,
		myVideo
	}
};
</script>

<style lang="scss" scoped>
.top-res{
	height: 100%;
}
</style>
