<template>
	<header class="headers">
		<div class="containter">
			<div class="logo"></div>
			<div class="fr" v-if="!isLogin">
				<!-- <el-button type="primary" @click="_handleLogin()" size="mini" >登录</el-button> -->
			</div>
			<div class="fr exit" v-if="isLogin">
				<p class="fr name">
				{{$storage.get('UserName') || '&nbsp;'}}
				</p>
				<p class="fr head">
					<img class="round" :src="$storage.get('UserImage')" alt="">
				</p>
				<div class="info">
					<div class="info-img clearfix">
						<img class="round fl" :src="$storage.get('UserImage')" alt="">
						<p class="namesd">
							{{$storage.get('UserName') || '&nbsp;'}}
						</p>
						<p class="nsdfsd">
							&nbsp;
							<!-- 学力值：4 -->
						</p>
					</div>
					<ul class="tas-list">
						<li v-for="(item, index) in tabsArr" :key="index" @click="_handleRouter(item)">
							<i class="iconfont" :class="item.icon"></i>
							{{item.name}}
						</li>
					</ul>
					<div class="sdfs" @click="returnLogin">
						安全退出
					</div>
				</div>
			</div>
			<ul class="fl tabs">
				<!-- 首页 -->
				<li @click="gotoRouter(item.routerLink,index)"
				:class="{'active':activeIndex === index}"
				v-for="(item,index) in headerArr" :key="index"
				v-html="item.txt"></li>
			</ul>
		</div>
	</header>
</template>

<script>
import { storage } from '_@/js/utils';
import { Cookie } from '_@/js/one';
export default {
	name: 'role',
	inject: ['reload'],
	data () {
		return {
			activeIndex: 0,
			textarea1: '',
			persontName: '',
			school: '',
			sex: '1',
			schoolArr: [],
			isLogin: false,
			// showLogin: this.$store.state.isLogin,
			centerDialogVisible: false,
			headerArr: [
				{
					routerLink: 'index',
					txt: '首页',
					active: false
				},
				{
					routerLink: 'blockChain',
					txt: '区块',
					active: false
				},
				{
					routerLink: 'transaction',
					txt: '交易',
					active: false
				},
				{
					routerLink: 'contract',
					txt: '链码',
					active: false
				},
				{
					routerLink: 'medals',
					txt: '通道',
					active: false
				}
			],
			tabsArr: [{
				routerName: 'user-note',
				icon: 'icon-xuexiao',
				name: '我的笔记'
			},
			{
				routerName: 'user-record',
				icon: 'icon-pingfenchengji',
				name: '学习问答'
			},
			{
				routerName: 'user-info',
				icon: 'icon-chanpinpinzhi',
				name: '个人中心'
			}],
			systemArr: [],
			UserDataTime: ''
		};
	},
	created () {
		this.init();
		// this.findSystem();
		// this.getList();
	},
	computed: {
		showLogin () {
			return this.$store.state.isLogin;
		}
	},
	components: {
	},
	methods: {
		_companylogo1 (link) {
			// console.log(link);
			// this.$router.push({'name': routerLink, query: {type: type || ''}});
			window.open(link);
		},
		_handleSystem (item, type) {
			this.$storage.set('systemId', item.id);
			this.$router.push({name: 'mooc-index', query: {'systemId': item.id, type: type}});
		},
		findSystem () {
			this.$ajax({
				method: 'post',
				url: '/CourseSystem/findCourseSystem',
				params: {
					courseId: 6
				}
			}).then(res => {
				if (res.success) {
					this.systemArr = res.data;
				}
			});
		},
		_handleLogin () {
			// Cookie.erase('sessionId');
			storage.clear();
			this.$store.commit('getLoginState', 'error');
			// this.showLogin = true;
		},
		init () {
			let userId = this.$storage.get('userId');
			if (userId) {
				this.isLogin = true;
			} else {
				this.isLogin = false;
			}
		},
		_handleRouter (item) {
			if (item.routerName === 'user') {
				this.centerDialogVisible = true;
				// this.selectPass();
				// this.getSchool();
			} else {
				this.$router.push({name: item.routerName});
			}
		},
		getSchool () {
			this.$ajax({
				method: 'post',
				url: 'userinfo/findSchoolByParam'
			}).then(res => {
				if (res.success) {
					this.schoolArr = res.data;
				};
			}).catch(err => {
				throw new Error(err);
			});
		},
		/**
		 * @name: zhangln
		 * @msg: 获取当前个人信息
		 */
		selectPass () {
			this.$ajax({
				method: 'post',
				url: 'userinfo/findMessage'
			}).then(res => {
				if (res.success) {
					if (res.data.syUserInfo) {
						this.persontName = res.data.syUserInfo.realName;
						this.sex = res.data.syUserInfo.sex + '' || '1';
						this.UserDataTime = '';
						this.school = res.data.syUserInfo.userSchoolName;
					}
				};
			}).catch(err => {
				throw new Error(err);
			});
		},
		_savePenson () {
			this.$ajax({
				method: 'post',
				url: '/userinfo/updateUserInfo',
				params: {
					realName: this.persontName,
					sex: this.sex,
					userSchoolName: this.school,
					birthdays: this.UserDataTime
				}
			}).then(res => {
				if (res.success) {
					this.$message.success('修改成功');
					let UserName = this.persontName;
					this.centerDialogVisible = false;
					this.$storage.set('UserName', UserName);
					this.reload();
				} else {
					this.$message.error('修改失败');
				}
			}).catch(err => {
				throw new Error(err);
			});
		},
		returnLogin () {
			this.$ajax({
				method: 'post',
				url: '/user/outLogin'
			}).then(res => {
				if (res.success) {
				} else {
				}
			}).catch(err => {
				throw new Error(err);
			});
			this.$message.success('退出成功');
			Cookie.erase('sessionId');
			storage.clear();
			this.$router.push({name: 'index'});
			this.reload();
		},
		returnClass () {
			this.$router.push({name: 'student-class'});
		},
		gotoRouter (routerName, index) {
			this.activeIndex = index;
			this.$router.push({name: routerName});
		}
	}
};
</script>

<style lang="scss" scoped>
.sldf{
	margin-top: 15px;
}
.mask-content{
	width: 440px;
	height: 480px;
	background: #fff;
	i{
		position: absolute;
		top: 15px;
		right: 30px;
		z-index: 300;
		font-size: 22px;
		font-weight: 700;
		cursor: pointer;
	}
}
.tabs{
	margin-right: 20px;
	margin-left: 50px;
	color: white;
	&.active{
		li{
			color: #03AF6F;
			position: relative;
			&::after{
				position: absolute;
				display: block;
				content: '';
				width: 30px;
				height: 2px;
				background: #03AF6F;
				bottom: 0;
			}
		}
	}
	li{
		float: left;
		margin: 0 20px;
		cursor: pointer;
		font-size: 16px;
		color: white;
		position: relative;
		.text{
			font-size: 12px;
			color: red;
			position: absolute;
			top: 10px;;
			right: -27px;;
			line-height: 1;
		}
		&:hover{
			color: #03AF6F;
		}
		&.active{
			color: #03AF6F;
			position: relative;
			&::after{
				position: absolute;
				display: block;
				content: '';
				width: 30px;
				height: 2px;
				background: #03AF6F;
				bottom: 0;
		}
	}
	}
}
.headers {
	width: 100%;
	height: 64px;
	line-height: 64px;
	z-index: 3;
	background: #272f32;
	.container{
		position: relative;
	}
	.logo{
		// margin-top: 15px;
		width: 204px;
		height: 38px;
		background: url(./images/logo.png) no-repeat center center;
		background-size: contain;
		margin-top: 13px;
		float: left;
	}
	.exit{
		position: relative;
		&:hover{
			.info{
				display: block;
			}
		}
	}
	.info{
		position: absolute;
		right: 0;
		top: 54px;
		width: 360px;
		height: 305px;
		background: #fff;
		display: none;
		z-index: 2;
		padding-top: 10px;
		box-shadow: 0 8px 16px 0 rgba(7,17,27,0.2);
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
		padding: 24px;
		&:hover{
			display: block;
		}
		.info-img{
			img{
				width: 76px;
				height: 76px;
			}
			.namesd{
				text-indent: 20px;
				line-height: 50px;
				font-size: 16px;
				color: #07111b;
			}
			.nsdfsd{
				color: #93999f;
				text-indent: 20px;
				font-size: 14px;
				font-weight: 600;
			}
		}
		.sdfs{
			border-top: 1px solid #edf1f2;
			line-height: 50px;
			font-size: 12px;
			color: #93999F;
			margin-top: 10px;
			&:hover{
				color: #a2cdf7;
				cursor: pointer;
			}
		}
		.tas-list{
			text-align: left;
			margin-top: 10px;
			li{
				display: inline-block;
				// float: left;
				height: 44px;;
				line-height: 44px;
				background: #F8FAFC;
				border-radius: 2px;
				color: #373737;
				font-size: 16px;
				width: 150px;
				margin-top: 1px;
				cursor: pointer;
				margin-right: 1px;
				text-align: center;
				border-radius: 4px;
				&:hover{
					background: #a2cdf7;
				}
			}
		}
		// li{
		// 	padding: 0 15px;
		// 	height: 54px;;
		// 	line-height: 54px;
		// 	cursor: pointer;
		// 	text-indent: 5px;
		// 	border-bottom: 1px solid #eee;
		// 	height: 54px;
		// 	line-height: 54px;
		// 	cursor: pointer;
		// 	span{
		// 		display: inline-block;
		// 		width: 40px;
		// 	}
		// }
	}
	.title{
		font-size: 16px;
		color: #888888;
		height: 64px;
		line-height: 64px;
		font-size: 24px;
		color: #248FFF;
		text-align: center;
		margin-left: 20px;
	}
	.name{
		font-size: 14px;
		height: 64px;
		line-height: 64px;
		margin: 0 15px;
		color: #888888;
		cursor: pointer;
	}
	.head img{
		width: 36px;
		margin-top: 14px;
		height: 36px;
		cursor: pointer;
	}
}
</style>
