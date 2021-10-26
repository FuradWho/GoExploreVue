<!--
 * @Author: zhangln
 * @Date: 2020-01-20 11:22:23
 * @Description: 33
 -->
<template>
  <div class="contentBox">
    <div class="htitle">
      <span>交易</span>
      <div class="searchBox">
        <input type="text" class="searchInp" v-model="inpTxt" placeholder="查询区块 / 哈希 / 地址">
        <div class="searchIco" @click="search()" ></div>
      </div>
    </div>
    <template v-if="blockVisible">
      <div class="listBox">
        <div class="listTitle row">
          <div class="col-1">blockNum</div>
          <div class="col-2">txId</div>
          <div class="col-2">chaincodeId</div>
          <div class="col-3">channelId</div>
          <div class="col-1">timestamp</div>
        </div>
        <div class="listMain row" v-for="(item,index) in tabList2" :key="index">
          <div class="col-1 greenTxt" v-html="item.blockNum"></div>
          <div class="col-2 fffTxt" :title="item.txId" v-html="item.txId"></div>
          <div class="col-2 fffTxt" v-html="item.chaincodeId"></div>
          <div class="col-3 fffTxt" v-html="item.channelId"></div>
          <div class="col-1 fffTxt" v-html="item.timestamp"></div>
        </div>
      </div>
    </template>
    <template v-if="blockInfoVisible">
      <div class="listBox">
        <div class="listTitle row">
          <div class="col-1">blockNum</div>
          <div class="col-2">txId</div>
          <div class="col-2">chaincodeId</div>
          <div class="col-3">channelId</div>
          <div class="col-1">timestamp</div>
        </div>
        <div class="listMain row" v-for="(item,index) in listArr" :key="index">
          <div class="col-1 greenTxt">{{item.blockNum}}</div>
          <div class="col-2 fffTxt" :title="item.txId">{{item.txId}}</div>
          <div class="col-2 fffTxt">{{item.chaincodeId}}</div>
          <div class="col-3 fffTxt">{{item.channelId}}</div>
          <div class="col-1 fffTxt" >{{item.timestamp}}</div>
        </div>
      </div>
    </template>
    <div class="footBut">
      <div class="ye">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios/index';
import blockChain from "../blockChain/blockChain";
export default {
  name: 'login',
  data () {
    return {
      blockMap: {},
      blockHash:{},
      blockVisible: false,
      blockInfoVisible: false,
      homePage: true, // 是否是首页
      endPage: false, // 是否为尾页
      listArr: [],
      inpTxt:'',
      tabList2:[],
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
    search(){
      let inpVal= this.inpTxt;
      if (inpVal ===""){
        alert('不得为空')
      }else {
        this.$ajax({
          method:'get',
          url:'txs/QueryTxByTxId',
          params:{
            txId:inpVal
          }
        }).then(res =>{
          this.blockVisible = false;
          this.blockInfoVisible = true;
          this.listArr = Object.values(res).reduce((a,b) => a.concat(b));
        })
      }
    },
    init(){
      this.$ajax({
        method: 'get',
        url: 'blocks/QueryAllBlocksInfo',
      }).then(res =>{
        console.log(res)
        this.listArr = res;
        this.blockVisible = true;
        this.blockInfoVisible = false;
        for (let i=0; i <res.length;i++){
          let arr2 = res[i].transactionList;
          for (let i=0; i <arr2.length; i ++){
            let arr3 = arr2[i].transactionActionList;
            for (let i=0; i <arr3.length; i ++){
              this.tabList2.push(arr3[i]);
            }
          }
        }
      })
    },
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
