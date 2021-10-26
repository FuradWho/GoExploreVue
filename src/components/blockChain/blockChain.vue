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
				<input type="text" class="searchInp" v-model="inpVal" placeholder="查询区块 / 哈希 / 地址">
				<div class="searchIco" @click="search()"></div>
			</div>
		</div>
    <!--  qkliebian  -->
    <template v-if="blockVisible">
      <div class="listBox">
        <div class="listTitle row">
          <div class="col-1" style="color: #fff">索引</div>
          <div class="col-4">blockHash</div>
          <div class="col-4">preHash</div>
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
      <div class="center" style="margin-top: 20px">
        <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :page-count="pageNum"
            @current-change="changeCurrentPage"
            :total="total">
        </el-pagination>
      </div>
    </template>
    <!--   info -->
    <template v-if="blockInfoHash">
      <div class="listTitle row" style="width: 1300px;margin: 0 auto">
        <div class="col-1" style="color: #fff;margin-left: 43px">索引</div>
        <div class="col-4">blockHash</div>
        <div class="col-4">preHash</div>
        <div class="col-3">交易</div>
        <div class="col-1">时间</div>
      </div>
      <div class="listMain row">
        <div class="col-1 greenTxt">{{blockHash.number}}</div>
        <div class="col-2 fffTxt">{{blockHash.blockHash}}</div>
        <div class="col-2 fffTxt">{{blockHash.previousHash}}</div>
        <div class="col-3 fffTxt">{{blockHash.txNum}}</div>
        <div class="col-1 fffTxt">{{blockHash.createTime}}</div>
      </div>
    </template>
    <template v-if="blockInfoVisible">
      <div class="listTitle row" style="width: 1300px;margin: 0 auto">
        <div class="col-1" style="color: #fff;margin-left: 43px">索引</div>
        <div class="col-4">blockHash</div>
        <div class="col-4">preHash</div>
        <div class="col-3">交易</div>
        <div class="col-1">时间</div>
      </div>
      <div class="listMain row">
        <div class="col-1 greenTxt">{{blockMap.number}}</div>
        <div class="col-2 fffTxt">{{blockMap.blockHash}}</div>
        <div class="col-2 fffTxt">{{blockMap.previousHash}}</div>
        <div class="col-3 fffTxt">{{blockMap.txNum}}</div>
        <div class="col-1 fffTxt">{{blockMap.createTime}}</div>
      </div>
    </template>
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
      listArrView: [],
      inpVal:'',
      blockMap: {},
      blockHash:{},
      blockVisible: false,
      blockInfoVisible: false,
      blockInfoHash:false,
      total: 0,
      pageSize: 10, // daxiao
      pageNum: 1, // yema
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
    changeCurrentPage (val) {
      this.pageNum = val;
      this.listArr = this.listArrView.slice((this.pageNum - 1) * this.pageSize,this.pageNum * this.pageSize);
    },
    init(){
      this.$ajax({
        method: 'get',
        url: 'blocks/QueryAllBlocksInfo',
      }).then(res =>{
        this.blockVisible = true;
        this.blockInfoVisible = false;
        this.blockInfoHash = false;
        this.listArrView = res.sort((b, a) => {b.number - a.number})
        this.total = res.length;
        this.pageNum = 1;
        this.changeCurrentPage(this.pageNum);
      });
    },
    search(){
      let inpVal = this.inpVal;
      if (!isNaN(inpVal)){
       this.$ajax({
         method:'get',
         url:'blocks/QueryBlockByBlockNum',
         params: {
           blockNum: inpVal
         }
       }).then( res =>{
         this.blockVisible = false;
         this.blockInfoHash = false
         this.blockInfoVisible = true;
         this.blockMap= res
         console.log(res)
       })
     }else{
        console.log(11)
        console.log(inpVal)
      this.$ajax({
        method:'get',
        url:'blocks/QueryBlockInfoByHash',
        params: {
          blockHash: inpVal
        }
      }).then( res =>{
        this.blockVisible = false;
        this.blockInfoVisible = false;
        this.blockInfoHash = true;
        this.blockHash= res
        console.log(res)
      })
     }
    },
	}
};
</script>

<style lang="scss" scoped>
body{
  background:  #232b2e;
}
.col-4{
  width: 100px;
  margin-right: 135px;
  margin-left: 42px;
}
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
  width: 193px;
  text-align: center;
}
.col-3{
  width: 100px;
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
        color: #fff;
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
      width: 193px;
      margin-right: 45px;
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
