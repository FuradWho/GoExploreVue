/*
 * @Author: zhangln
 * @Date: 2020-01-20 11:00:41
 * @Description: 33
 */
import Vue from 'vue';
import moment from 'moment';

let sha256 = require('js-sha256').sha256;

/**
 * 数字大写sha256加密
 * 显示
 */

Vue.filter('sha256', (value) => {
	return sha256(value);
});

/**
 * 数字大写 格式化 1 => 一
 * 显示
 */

Vue.filter('numToCharacter', (value) => {
	let characterArr = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十'];
	return characterArr[value];
});

/**
 * 格式化时间
 */

Vue.filter('formCode', (value) => {
	let arr = {
		finA: '金融科技-师资公益培训',
		moocScoreA: '知链区块链普及教育课程',
		AccA: '面向商科类师资—区块链应用·基础教学能力提升计划',
		BlockA: '面向新工科师资-区块链技术开发‧基础教学能力提升计划'
	};
	return arr[value] || '知链区块链普及教育课程';
});

/**
 * 格式化时间
 */

Vue.filter('formatTime', (value) => {
	if (!value) {
		return false;
	}
	return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

/**
 * 格式化时间 月-日  时:分:秒
 */

Vue.filter('secondTime', (value) => {
	if (!value) {
		return 0;
	}
	return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

Vue.filter('formatTime2', (value, opera = '-') => {
	if (!value) {
		return false;
	}
	return new Date(value).getTime();
});

Vue.filter('formatTime3', (value, opera = '-') => {
	if (!value) {
		return false;
	}
	return new Date(value);
});

/**
 * 格式化时间 年-月-日  时:分:秒
 */

Vue.filter('secondTime1', (value) => {
	if (!value) {
		return 0;
	}
	return moment(value).format('YYYY-MM-DD HH:mm:ss');
});

/**
 * 格式化时间 时间戳转换 年-月-日
 */

Vue.filter('secondTime3', (value) => {
	if (!value) {
		return 0;
	}
	value = parseFloat(value);
	return moment(value).format('YYYY-MM-DD');
});

/**
 * 手机号加 *
 */

Vue.filter('hiddenPhone', (value) => {
	if (!value) {
		return false;
	}
	return value.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
});

/**
 * 单数变双数
 */

Vue.filter('ToEven', (value) => {
	if (!value) {
		return false;
	}
	return value > 9 ? value : '0' + value;
});
