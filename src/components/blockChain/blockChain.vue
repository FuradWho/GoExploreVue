<!--
 * @Author: zhangln
 * @Date: 2020-01-20 11:22:23
 * @Description: 33
 -->
<template>
	<div class="contentBox">
		<div class="htitle">
			<span>区块</span>
			<div class="searchBox">
				<input type="text" class="searchInp" placeholder="查询区块 / 哈希 / 地址">
				<div class="searchIco"></div>
			</div>
		</div>
		<div class="listBox">
			<div class="listTitle row">
				<div class="col-1">索引</div>
				<div class="col-2">blockHash</div>
				<div class="col-2">preHash</div>
        <div class="col-3">交易</div>
        <div class="col-1">时间</div>
			</div>
		</div>
		<div class="listMain row" v-for="(item,index) in listArr" :key="index">
			<div class="col-1 greenTxt" v-html="item.number"></div>
			<div class="col-2 fffTxt" v-html="item.blockHash"></div>
			<div class="col-2 fffTxt" v-html="item.previousHash"></div>
      <div class="col-3 fffTxt" v-html="item.txNum"></div>
      <div class="col-1 fffTxt" v-html="item.createTime"></div>
		</div>
		<div class="footBut">
			<div class="ye">
				<div class="firstPage butSty" :class="{disabled:this.homePage}" @click="firstPage()">首页</div>
				<div class="backPage butSty" :class="{disabled:this.homePage}" @click="backPage()">上</div>
				<div class="numPage butSty" v-for="(item,index) in pages" :key="index">
					<div v-html="item.txt"></div>
				</div>
				<div class="nextPage butSty">下</div>
				<div class="firstPage butSty" :class="{disabled:this.homePage}" @click="endPage()">尾页</div>
				<!-- <el-pagination
					:style="selfstyle"
					layout="prev, pager, next"
					:total="1000">
					</el-pagination> -->
				<!-- <div class="backPage">尾页</div> -->
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios/index';
export default {
	name: 'login',
	data () {
		return {
			// selfstyle: {
			// 	color: 'red',
			// 	background: '#2a3235'
			// },
			homePage: true, // 是否是首页
			endPage: false, // 是否为尾页
			listArr: [],
			pages: [
				{
					txt: '1'
				}
			]
		};
	},
	components: {
	},
	created () {
    this.init();
	},
	methods: {
    init(){
      this.$ajax({
        method: 'get',
        url: 'blocks/QueryAllBlocksInfo',
      }).then(res =>{
        console.log(res)
        this.listArr = res
      })
    },
		nextpage () {
			if (this.postData.pageNo === Math.ceil(this.total / this.postData.pageSize)) {
				this.postData.pageNo = Math.ceil(this.total / this.postData.pageSize);
			} else if (Math.ceil(this.total / this.postData.pageSize) === 0) {
				this.postData.pageNo = 1;
			} else {
				this.postData.pageNo++;
			}
			axios({
				method: this.method,
				url: this.url,
				data: JSON.stringify(this.postData)
			}).then((proList) => {
				this.proList = proList.data.resultList;
			}).catch((error) => {
				console.log(error);
			});
		},
		// 上一页
		backpage () {
			if (this.postData.pageNo === 1) {
				this.postData.pageNo = 1;
			} else {
				this.postData.pageNo--;
			}
			axios({
				method: this.method,
				url: this.url,
				data: JSON.stringify(this.postData)
			}).then((proList) => {
				this.proList = proList.data.resultList;
			}).catch((error) => {
				console.log(error);
			});
		}
		// 首页
		// firstpage () {
		// 	this.postData.pageNo = 1,
		// 	axios({
		// 		method: this.method,
		// 		url: this.url,
		// 		data: JSON.stringify(this.postData)
		// 	}).then((proList) => {
		// 		this.proList = proList.data.resultList;
		// 	}).catch((error) => {
		// 		console.log(error);
		// 	});
		// },
		// // 尾页
		// lastpage () {
		// 	if (Math.ceil(this.total / this.postData.pageSize) === 0) {
		// 		this.postData.pageNo = 1;
		// 	} else {
		// 		this.postData.pageNo = Math.ceil(this.total / this.postData.pageSize),
		// 		axios({
		// 			method: this.method,
		// 			url: this.url,
		// 			data: JSON.stringify(this.postData)
		// 		}).then((proList) => {
		// 			this.proList = proList.data.resultList;
		// 		}).catch((error) => {
		// 			console.log(error);
		// 		});
		// 	}
		// }
	}
};
</script>

<style lang="scss" scoped>
.searchBox{
			width: 750px;
			height: 66px;
			margin-left: 380px;
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
.row{
  display: flex;
}
.col-1{
	width: 266px;
  text-align: center;
}
.col-3{
  width: 100px;
  text-align: center;
}
.col-2{
  width: 80px;
  text-align: center;
  font-size: 15px;
  color: #fff;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  -webkit-box-orient: vertical;
  font-family: fontMedium;
  margin-right: 180px;
}
.contentBox{
	padding-top: 60px;
	padding-bottom: 80px;
	background: #232b2e;
	.htitle{
		width: 1200px;
		height: 90px;
		margin: 0 auto;
		color: #fff;
		font-family: fontBold;
		font-size: 35px;
		position: relative;
		margin-bottom: 30px;
		display: flex;
		&::after{
			display: block;
			position: absolute;
			content: '';
			width: 75px;
			height: 2px;
			bottom: 35px;
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
      .col-2{
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
      font-size: 15px;
      color: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      text-align: center;
      -webkit-box-orient: vertical;
      font-family: fontMedium;
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
			.butSty{
				color: #676c67;
				text-align: center;
				line-height: 40px;
				border-radius: 6px;
				margin-right: 10px;
				background: #2a3235;
			}
			.firstPage{
				width: 52px;
			}
			.backPage{
				width: 52px;
			}
			.numPage{
				width: 60px;
			}
			.nextPage{
				width: 52px;
			}
		}
	}
}
</style>
