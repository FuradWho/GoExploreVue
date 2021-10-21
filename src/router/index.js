/*
 * @Author: zhangln
 * @Date: 2020-01-20 11:00:41
 * @Description: 44
 */
import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/', // 登录
			redirect: '/index'
		},
		{
			path: '/index', // 首页
			name: 'index',
			component: resolve => require(['#/index/index'], resolve).default
		},
		{
			path: '/blockChain', // 首页
			name: 'blockChain',
			component: resolve => require(['#/blockChain/blockChain'], resolve).default
		},
		{
			path: '/transaction', // 交易
			name: 'transaction',
			component: resolve => require(['#/transaction/transaction'], resolve).default
		},
		{
			path: '/medals', // 交易
			name: 'medals',
			component: resolve => require(['#/medals/medals'], resolve).default
		},
		{
			path: '/contract', // 合约
			name: 'contract',
			component: resolve => require(['#/contract/contract'], resolve).default
		}
	],
	strict: process.env.NODE_ENV !== 'production'
});

router.beforeEach((to, from, next) => {
	next();
});

router.afterEach(() => {
	window.scrollTo(0, 0);
});

export default router;
