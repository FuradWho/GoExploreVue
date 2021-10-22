/*
 * @Author: zhangln
 * @Date: 2020-01-20 11:00:38
 * @Description: 44
 */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import './assets/styles/reset.css';
import './assets/styles/common.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ajax from './assets/js/ajaxAl'; // 在ajaxApi中修改打包的环境
// import ajax from '_@/js/ajax';
import { storage } from './assets/js/utils';
import 'codemirror/lib/codemirror.css';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.prototype.$ajax = ajax;
Vue.prototype.$storage = storage;
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>'
});
