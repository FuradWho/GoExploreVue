<!--
* @Author: zhangln
* @Date: 2020-01-20 11:22:23
* @Description: 33
-->
<template>
<div class="index">
	<div class="titleFont">
		<h1 class="hOne">欢迎来到知链</h1>
		<h1 class="hTwo">快速、正确、便利的 知链 区块链信息查询平台</h1>
		<div class="searchBox">
			<input type="text" class="searchInp" placeholder="查询区块 / 哈希 / 地址">
			<div class="searchIco"></div>
		</div>
	</div>
	<div class="listBox">
		<div class="listLeft" id="chartBar" ref="chart"></div>
		<div class="listRight">
			<div class="littleBox" v-for="(item,index) in dataArr" :key="index" @click="jumpClick(item.routerLink)">
				<h1 v-html="item.title" class="htitle"></h1>
				<h1 v-html="item.txt" class="hText"></h1>
				<div class="row">
					<h1 v-html="item.title2" class="hTitle2"></h1>
					<h1 v-html="item.txt2" class="hTxt2"></h1>
				</div>
			</div>
		</div>
	</div>
	<div class="tabList">
		<div class="tabTitle row">
			<div class="col-1 txtAfter">最新块</div>
			<div class="col-1  leftTxt">最新交易</div>
			<div class="col-1"><span class="greenBk">查看全部</span></div>
		</div>
		<div class="tabBox">
			<div class="tabLeft">
				<div class="listTitle row">
					<div class="col-1">索引</div>
					<div class="col-1">交易数量</div>
					<div class="col-1">通道</div>
					<div class="col-1">Data哈希</div>
					<div class="col-1">时间</div>
				</div>
				<div class="listMain row" v-for="(item,index) in tabList" :key="index">
					<h1 v-html="item.xml" class="col-1 greenTxt"></h1>
					<h1 v-html="item.number" class="col-1 txtA"></h1>
					<h1 v-html="item.deal" class="col-1 txtA"></h1>
					<h1 v-html="item.size" class="col-1 txtA"></h1>
					<h1 v-html="item.time" class="col-1 txtA"></h1>
				</div>
			</div>
			<div class="tabLeft">
				<div class="listTitle row">
					<div class="col-1">交易ID</div>
					<div class="col-1">链码</div>
					<div class="col-1">通道</div>
					<div class="col-1">时间</div>
				</div>
				<div class="listMain row" v-for="(item,index) in tabList" :key="index">
					<h1 v-html="item.id" class="col-1 greenTxt"></h1>
					<h1 v-html="item.money" class="col-1 txtA"></h1>
					<h1 v-html="item.time2" class="col-1 txtA"></h1>
					<h1 v-html="item.size2" class="col-1 txtA"></h1>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script>
import * as echarts from 'echarts';
// var echarts = require('echarts');

export default {
	name: 'login',
	data () {
		return {
			dataArr: [
				{
					title: '区块总高度',
					txt: '429,686',
					routerLink: 'blockChain'
				},
				{
					title: '节点',
					txt: '5'
				},
				{
					title: '链码',
					txt: '9,934',
					title2: '',
					txt2: ''
				},
				{
					title: '交易总量',
					txt: '56,293',
					title2: '',
					txt2: ''
				}
			],
			tabList: [{
				xml: '431,099',
				time: '',
				deal: '0',
				size: '697字节',
				number: '12',
				id: '321',
				size2: '341',
				time2: '2',
				money: '1.07'
			}]
		};
	},
	components: {
	},
	created () {
		this.init();
	// this.findSystem();
	},
	mounted () {
	},
	methods: {
		init () {
			this.$nextTick(() => {
				let myChart = echarts.init(document.getElementById('chartBar'));
				// 绘制图表
				myChart.setOption({
					title: {
						textStyle: {
							color: '#fff'
						}
					},
					color: ['#3aced5', '#dd705b'],
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: '#676c77'
							}
						}
					},
					legend: {
						data: ['Email', 'Direct'],
						textStyle: {
							color: 'white'
						}
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					grid: {
						left: '3%',
						right: '4%',
						bottom: '3%',
						containLabel: true
					},
					xAxis: [
						{
							type: 'category',
							boundaryGap: false,
							data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
							axisLine: {
								lineStyle: {
									color: '#2ad8a0',
									width: 2
								}
							}
						}
					],
					yAxis: [
						{
							type: 'value',
							axisLine: {
								lineStyle: {
									color: 'white',
									width: 2
								}
							}
						}
					],
					series: [
						{
							name: 'Email',
							type: 'line',
							stack: 'Total',
							areaStyle: {},
							lineStyle: {
								color: '#3aced5'
							},
							emphasis: {
								focus: 'series'
							},
							data: [120, 132, 101, 134, 90, 230, 210]
						},
						{
							name: 'Direct',
							type: 'line',
							stack: 'Total',
							areaStyle: {},
							lineStyle: {
								color: '#dd705b'
							},
							emphasis: {
								focus: 'series'
							},
							data: [320, 332, 301, 334, 390, 330, 320]
						}
					],
					itemStyle: {
						normal: {
							color: function (params) {
								let colorList = ['#3aced5', '#dd705b'];
								return colorList[params.dataIndex];
							}
						}
					}
				});
			});
		},
		gotoRouter (routerLink) {
			this.$router.push({name: routerLink});
		}
	}
};
</script>

<style lang="scss" scoped>
input{
outline: green;
}
.row{
	display: flex;
}
.col-1{
	flex: 1;
}
.index{
	padding-top: 60px;
	padding-bottom: 80px;
	background: #232b2e;
	.titleFont{
		width: 1300px;
		height:250px;
		margin: 0 auto;
		.hOne{
			font-size: 38px;
			font-weight: 500;
			color: #fff;
			line-height: 1em;
			margin-bottom: 30px;
		}
		.hTwo{
			font-size: 16px;
			font-weight: 400;
			color: #8698a0;
			line-height: 1em;
			margin-bottom: 50px;
		}
		.searchBox{
			width: 750px;
			height: 66px;
			position: relative;
			.searchInp{
				width: 100%;
				height: 100%;
				border-radius: 8px;
				padding: 0 25px 5px 96px;
				background: #394143;
				border: 1px solid #394143;
				color: #fff;
				font-size: 18px;
			}
			.searchIco{
				width: 80px;
				height: 60px;
				top: 4px;
				left: 5px;
				position: absolute;
				background: url(img/searchIco.png) no-repeat;
				&::after{
					display: block;
					position: absolute;
					content: "";
					width: 3px;
					height: 25px;
					background:#2ad8a0;
					right: 0;
					bottom: 20px;
				}
			}
		}
	}
	.listBox{
		width: 1300px;
		margin: 0 auto;
		display: flex;
		margin-bottom: 50px;
		.listLeft{
			width: 600px;
			height: 321px;
			margin-right: 20px;
			border-radius: 5px;
			padding-top: 5px;
			background: #394143;
		}
		.listRight{
			width: 600px;
			height: 321px;
			.littleBox{
				float: left;
				width: 280px;
				height: 150px;
				border-radius: 5px;
				margin-right: 20px;
				margin-bottom: 20px;
				padding-top: 30px;
				padding-left: 30px;
				background: #394143;
				&:nth-child(1){
					cursor: pointer;
					.htitle{
						background: url(ico/ico1.png) no-repeat;
						background-position-y: center;
					}
				}
				&:nth-child(2){
					cursor: pointer;
					.htitle{
						background: url(ico/ico2.png) no-repeat;
						background-position-y: center;
					}
				}
				&:nth-child(3){
					.htitle{
						background: url(ico/ico3.png) no-repeat;
						background-position-y: center;
					}
				}
				&:nth-child(4){
					cursor: pointer;
					.htitle{
						background: url(ico/ico4.png) no-repeat;
						background-position-y: center;
					}
				}
				.htitle{
					width: 280px;
					height: 19px;
					text-indent: 20px;
					font-size: 18px;
					color: #676c77;
					margin-bottom: 10px;
					background-position-y:center;
				}
				.hText{
					font-size: 40px;
					font-weight: 700;
					font-family: FZShuTi;
					color: #fff;
					margin-bottom: 10px;
				}
				.row{
					display: flex;
				}
				.hTitle2{
					color: #fff;
					font-size: 25px;
					font-family: FZShuTi;
				}
				.hTxt2{
					width: 92px;
					height: 30px;
					color: #676c77;
					text-indent: 14px;
					font-size: 15px;
					line-height: 29px;
					font-family: fontMedium;
				}
			}
		}
	}
	.tabList{
		width: 1300px;
		margin: 0 auto;
		.tabTitle{
			width: 1200px;
			height: 50px;
			color: #fff;
			display: flex;
			margin-bottom: 15px;
			.col-1{
				flex: 1;
				line-height: 30px;
			}
			.txtAfter{
				position: relative;
				&::after{
					display: block;
					position: absolute;
					content: '';
					width: 50px;
					height: 2px;
					bottom: 15px;
					left: 0px;
					font-size: 14px;
					background: #2ad8a0;
				}
			}
			.leftTxt{
				text-indent: 209px;
				position: relative;
				&::after{
					display: block;
					position: absolute;
					content: '';
					width: 50px;
					height: 2px;
					bottom: 15px;
					left: 212px;
					font-size: 14px;
					background: #2ad8a0;
				}
			}
			.greenBk{
				display: inline-block;
				width: 76px;
				text-align: center;
				margin-left: 320px;
				height: 30px;
				border-radius: 15px;
				background: #2ad8a0;
			}
		}
		.tabBox{
			display: flex;
			.tabLeft{
				margin-right: 15px;
				.listTitle{
					width: 590px;
					color: #8698a0;
					margin-bottom: 15px;
					text-align: center;
				}
			}
			.listMain{
				width: 590px;
				height: 50px;
				border-radius: 8px;
				line-height: 50px;
				background: #676c77;
				.col-1{
					text-align: center;
				}
				.greenTxt{
					font-size: 15px;
					color: #2ad8a0;
					font-family: fontMedium;
				}
				.txtA{
					font-size: 15px;
					color: #fff;
					font-family: fontMedium;
				}
			}
		}
	}
}
</style>
