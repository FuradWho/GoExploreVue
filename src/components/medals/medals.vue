<!--
 * @Author: zhangln
 * @Date: 2020-01-20 11:22:23
 * @Description: 33
 -->
<template>
	<div class="contentBox">
		<div class="htitle">
			<span>通道</span>
		</div>
		<div class="listBox">
			<div class="listTitle row">
				<div class="col-1">索引</div>
				<div class="col-1">时间</div>
				<div class="col-1">大小</div>
				<div class="col-1">交易</div>
				<div class="col-1">系统费</div>
				<div class="col-1">网络费</div>
			</div>
		</div>
		<div class="listMain row" v-for="(item,index) in listArr" :key="index">
			<div class="col-1 greenTxt" v-html="item.id"></div>
			<div class="col-1 fffTxt" v-html="item.time"></div>
			<div class="col-1 fffTxt" v-html="item.size"></div>
			<div class="col-1 fffTxt" v-html="item.deal"></div>
			<div class="col-1 fffTxt" v-html="item.money1"></div>
			<div class="col-1 fffTxt" v-html="item.money2"></div>
		</div>
		<div class="footBut">
			<div class="ye">
				<!-- <div class="firstPage" :class="{disabled:this.homePage}" @click="firstPage()">首页</div>
				<div class="backPage" :class="{disabled:this.homePage}" @click="backPage()">上</div>
				<div v-for="(item,index) in pages" :key="index">
					<div v-if="item"></div>
				</div> -->
				<!-- <div class="firstPage">首页</div> -->
				<el-pagination
					background="red"
					layout="prev, pager, next"
					:total="1">
				</el-pagination>
				<!-- <div class="backPage">尾页</div> -->
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data () {
		return {
			listArr: [
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				},
				{
					id: '1',
					time: '1',
					size: '1',
					deal: '1',
					money1: '1',
					money2: '1'
				}
			]
		};
	},
	components: {
	},
	created () {
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
.row{
	display: flex;
}
.col-1{
	flex: 1;
}
.contentBox{
	padding-top: 60px;
	padding-bottom: 80px;
	background: #232b2e;
	.htitle{
		width: 1200px;
		height: 40px;
		margin: 0 auto;
		color: #fff;
		font-family: fontBold;
		font-size: 22px;
		position: relative;
		margin-bottom: 30px;
		&::after{
			display: block;
			position: absolute;
			content: '';
			width: 50px;
			height: 2px;
			bottom: 0;
			background: #2ad8a0;
		}
	}
	.listBox{
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 20px;
		.listTitle{
			width: 1200px;
			color: #8698a0;
			.col-1{
				text-align: center;
			}
		}
	}
	.listMain{
		width: 1200px;
		height: 50px;
		border-radius: 8px;
		line-height: 50px;
		background: #2a3235;
		margin: 0 auto;
		margin-top: 15px;
		.col-1{
			text-align: center;
		}
		.greenTxt{
			color: #2ad8a0;
		}
		.fffTxt{
			color: #fff;
		}
	}
	.footBut{
		margin-top: 30px;
		.ye{
			width: 404px;
			height: 80px;
			border-radius: 40px;
			display: flex;
			align-items: center;
			justify-content: center;
			margin: 0 auto;
			.firstPage{
				width: 52px;
				height: 40px;
				color: #676c67;
				text-align: center;
				line-height: 40px;
				border-radius: 6px;
				margin-right: 10px;
				background: #2a3235;
			}
			.backPage{
				width: 52px;
				height: 40px;
				border-radius: 6px;
				text-align: center;
				line-height: 40px;
				color: #676c67;
				background: #2a3235;
			}
		}
	}
}
</style>
