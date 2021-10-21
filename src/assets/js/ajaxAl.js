/*
 * @Author: zhangln
 * @Date: 2019-07-24 15:37:38
 * @Description: 33
 */
import axios from 'axios';
import { Loading } from 'element-ui';
import { baseUrl } from '@/config';
import store from '@/store/store'; // 自定义过滤器
import { getUUID, shaNum, setCookie, getCookie, storage } from '_@/js/utils';
// import { getUUID, shaNum, setCookie, getCookie } from '_@/js/utils';
axios.defaults.timeout = 300000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8,';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';

const baseURL = `${window.location.origin}/${baseUrl}`;
axios.defaults.baseURL = baseURL;

let loading = null;
let count = 0;

const countDown = () => {
	count = count > 0 ? --count : count;
	if (count < 1) {
		if (loading) {
			loading.close();
			loading = null;
		}
	}
};

// 格式化参数
const formatParam = (params) => {
	// let p = {};
	// for (let key in params) {
	// 	p[`${key}`] = params[key];
	// 	// p[`listMap[0].inMap.${key}`] = params[key];
	// }
	return params;
};

// post请求序列化参数
axios.interceptors.request.use(config => {
	let isLoading = (config.data && config.data.isLoading) || false;
	if (!loading && !isLoading) {
		loading = Loading.service({
			lock: false,
			text: '拼命加载中...',
			background: 'rgba(0, 0, 0, .7)'
		});
	}
	count++;
	// 序列化post请求参数 post请求参数一律被转form格式数据
	if (config.method.toLocaleLowerCase() === 'post') {
		let fd = new FormData();
		let data = formatParam(config.data);
		for (var key in data) {
			fd.append(key, data[key]);
		}
		config.data = fd;
	}

	// get请求添加时间戳，防止IE下缓存
	if (config.method.toLocaleLowerCase() === 'get') {
		config.params = formatParam(config.params);
		config.params._t = new Date().getTime();
	}
	if (getCookie('sessionId')) {
		config.headers['sessionId'] = getCookie('sessionId');
	} else {
		config.headers['sessionId'] = shaNum(getUUID(10));
		setCookie('sessionId', config.headers['sessionId']);
		console.log('设置cookie：' + shaNum(getUUID(24)));
	}
	return config;
}, error => {
	return Promise.reject(error);
});

// 返回数据处理
axios.interceptors.response.use(response => {
	// 等到所有接口都请求完成再去关闭loading
	countDown();
	return response.data;
});

const ajax = (options) => {
	options.method = options.method || 'get';
	if (options.method.toLocaleLowerCase() === 'get') {
		// get请求
		return new Promise((resolve, reject) => {
			axios.get(options.url, {
				params: options.params || {}
			}).then(response => {
				if (response.state && (response.state === '405' || response.state === '406')) {
					// storage.clear(); // 清除缓存
					// console.log(333);
					store.commit('getLoginState', 'error');
					// store.commit('getLoginState', 'error');
					// let LoginAddres = storage.get('LoginAddres'); // 退出地址
					// location.href = '/' + baseUrl;
					// window.location.href = LoginAddres + 'link/';
				} else {
					resolve(response);
				}
			}).catch(error => {
				// 等到所有接口都请求完成再去关闭loading
				countDown();
				reject(error);
			});
		});
	} else {
		// post请求
		return new Promise((resolve, reject) => {
			axios
				.post(options.url, options.params || {})
				.then(response => {
					if (response.state && (response.state === '405' || response.state === '406')) {
						// storage.clear(); // 清除缓存
						console.log(333);
						storage.set('isSignSchool', false);
						store.commit('getLoginState', 'error');
						// location.href = '/' + baseUrl;
						// let LoginAddres = storage.get('LoginAddres'); // 退出地址
						// window.location.href = LoginAddres + 'link/';
					} else {
						resolve(response);
					}
				})
				.catch(error => {
				// 等到所有接口都请求完成再去关闭loading
					countDown();
					reject(error);
				});
		});
	}
};

export default ajax;
