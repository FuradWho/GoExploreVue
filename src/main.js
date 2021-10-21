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
import '_@/styles/reset.css';
import '_@/styles/common.css';
// import '_@/styles/style.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ajax from '_@/js/ajaxAl'; // 在ajaxApi中修改打包的环境
// import ajax from '_@/js/ajax';
import { storage } from '_@/js/utils';

import './filter/filter'; // 自定义过滤器
import store from './store/store'; // 自定义过滤器

import footer from '#/common/footer';
import topRes from '#/common/topRes';
import myVideo from 'vue-video';

import VueCodeMirror from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;
Vue.use(VueCodeMirror);
Vue.component('my-video', myVideo);
Vue.component('top-res', topRes);
Vue.component('Footer', footer);
Vue.prototype.$ajax = ajax;
Vue.prototype.$storage = storage;
Vue.use(ElementUI);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
});
