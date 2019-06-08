import Vuex from "vuex"
import Vue from "vue"

import state from "./state"
import mutations from "./mutations"
import * as getters from "./getters"
import * as actions from "./actions"
Vue.use(Vuex);

const debug=process.env.NODE_ENV!='production';
//李云龙(vue.js) 赵政委(vuex)  办公室(store)  有一个文件(state),记录当前军队物资
export default new Vuex.Store({
	state,
	mutations,
	getters,
	actions,
	strict:debug
//	plugins:debug?[createLogger()]:[]
})
