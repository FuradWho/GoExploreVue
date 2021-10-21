<!--
 * @Author: zhangln
 * @Date: 2020-02-20 14:27:31
 * @Description: 44
 -->
<template>
	<footer class="footer">
		<div class="centerPosition">
			<div class="leftBox">
				<div class="fristR">知链在线 · 课堂</div>
				<div class="lastR">主办单位：北京知链科技有限公司&nbsp; &nbsp;&nbsp; &nbsp;<a href="http://www.educhainx.com" target="_blank"> www.educhainx.com </a>
				</div>
				<div class="lastR">
					市场合作：18601225120（颜老师）  &nbsp; &nbsp;&nbsp;   邮箱：edu@educhainx.com &nbsp; &nbsp;&nbsp;<a href="https://www.wjx.cn/jq/65577914.aspx" target="_blank">意见反馈</a>
				</div>
				<div class="lastR">Copyright © 2018 北京知链科技有限公司 , All Rights Reserved</div>
			</div>
			<div class="rightBox">
				<div class="bgFrist"></div>
				<div class="blank clear">&nbsp;</div>
				<div class="textFrist">微信公众号</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss" scoped>
.footer {
	clear: both;
	width: 100%;
	height: 299px;
	background: #0A0B0F;
	border: 1px solid transparent;
	.centerPosition{
		width: 1200px;
		margin: 0 auto;
		.leftBox{
			width: 792px;
			float: left;
			.fristR{
				opacity: 0.8;
				font-family: TRENDS;
				font-size: 40px;
				color: #FFFFFF;
				margin-top: 56px;
				width: 350px;
				height: 48px;
			}
			.secondR{
				font-family: PingFangSC-Regular;
				font-size: 16px;
				color: #FFFFFF;
				width: 837px;
				margin-top: 31px;
			}
			.lastR{
				width: 700px;
				margin-top: 30px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #FFFFFF;
				a{
					color: white;
					text-decoration: none;
					// text-decoration: double;
					&:hover{
						color: blue;
					}
				}
			}
		}
		.rightBox{
			float: right;
			width: 132px;
			.bgFrist{
				width: 132px;
				height: 132px;
				background: url(./images/picfoot.png) no-repeat center center;
				background-size: contain;
				margin-top: 56px;
				float: right;
			}
			.blank{
				width: 100%;
			}
			.textFrist{
				font-family: PingFangSC-Regular;
				font-size: 16px;
				color: #FFFFFF;
				margin: 0 auto;
				margin-top: 16px;
				text-align: center;
				width: 80px;
			}
		}
	}
}
.clear{
	clear: both;
}
</style>
