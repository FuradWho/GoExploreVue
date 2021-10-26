<!--
 * @Author: zhangln
 * @Date: 2020-01-20 11:22:23
 * @Description: 33
 -->
<template>
	<div class="contentBox">
    <div class="htitle">
      <span>交易</span>
    </div>
		<div class="listBox">
			<div class="listTitle row">
				<div class="col-1">Chaincode Name</div>
				<div class="col-1">Label</div>
				<div class="col-1">PackageID</div>
				<div class="col-1">Version</div>
			</div>
		</div>
		<div class="listMain row" v-for="(item,index) in listArr" :key="index">
			<div class="col-1 greenTxt" v-for="(item2,index2) in item.references.mychannel" v-html="item2.name"></div>
			<div class="col-1 fffTxt" v-html="item.label"></div>
			<div class="col-1 fffTxt" :title="item.packageID" v-html="item.packageID"></div>
			<div class="col-1 fffTxt" v-for="(item2,index2) in item.references.mychannel" v-html="item2.version"></div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data () {
		return {
			listArr:[]
		};
	},
	components: {
	},
	created () {
    this.init()
	},
	methods: {
    init(){
      this.$ajax({
        methods: "get",
        url:'cc/QueryInstalledCC',
      }).then(res =>{
        console.log(res)
        this.listArr = res;
      })
    }
	}
};
</script>

<style lang="scss" scoped>
.row{
	display: flex;
}
.col-1{
	flex: 1;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  -webkit-box-orient: vertical;
}
.contentBox{
	padding-top: 60px;
	padding-bottom: 180px;
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
