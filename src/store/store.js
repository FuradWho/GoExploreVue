/*
 * @Author: zhangln
 * @Date: 2020-02-25 14:25:31
 * @Description: 44
 */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		isLogin: false,
		isApplyCode: false
	},
	// 理解为所有组件的computed属性
	getters: {
		loginstate (state) {
			let isLogin = state.isLogin;
			return isLogin;
		},
		applyCode (state) {
			let isApplyCode = state.isApplyCode;
			return isApplyCode;
		}
	},
	// mutations对象中保存着更改数据的回调函数
	mutations: {
		getLoginState (state, params) {
			if (params === 'error') { // 点击时候，弹窗打开
				state.isLogin = true;
			} else {
				state.isLogin = false;
			}
		},
		getApplyCode (state, params) {
			if (params === 'error') { // 点击时候，弹窗打开
				state.isApplyCode = true;
			} else {
				state.isApplyCode = false;
			}
		}
	}
});

export default store;
