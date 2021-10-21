/*
 * @Author: zhangln
 * @Date: 2019-07-24 15:37:38
 * @Description: 222
 */
import axios from 'axios';
import { Loading } from 'element-ui';
import { baseUrl } from '@/config';
import { getUUID, shaNum } from '_@/js/utils';
import { Cookie } from '_@/js/one';
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
	// 配置唯一sessionId setCookie getCookie
	if (Cookie.get('sessionId')) {
		config.headers['sessionId'] = Cookie.get('sessionId');
		Cookie.set('sessionId', config.headers['sessionId']);
		Cookie.set('LoginAddres', `${window.location.origin}/`);
	} else {
		config.headers['sessionId'] = shaNum(getUUID(24));
		Cookie.set('sessionId', config.headers['sessionId']);
		Cookie.set('sessionIdOther', config.headers['sessionId']);
		Cookie.set('LoginAddres', `${window.location.origin}/`);
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
					location.href = '/';
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
						location.href = '/' + baseUrl;
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
