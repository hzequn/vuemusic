// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
import Vue from 'vue';
import VueRouter from 'vue-router';
// 1. 定义 (路由) 组件
import Rank from '../components/rank/rank'
import Recommend from '../components/recommend/recommend'
import Search from '../components/search/search'
import Singer from '../components/singer/singer'
import SingerDetail from '../components/singerDetail/singerDetail'
Vue.use(VueRouter);
// 2. 定义路由:每个路由应该映射一个组件。
const routes = [
	{path: '/',redirect:'/recommend'},
	{path: '/rank',component: Rank},
	{path: '/recommend',component: Recommend},
	{path: '/search',component: Search},
	{path: '/singer',
		component: Singer,
		children:[
			{
				path: ':id',
				component:SingerDetail	
			}
	]}
];
// 4. 创建和挂载根实例。
//在main.js已经写好了
//这里直接导出就可以了
export default new VueRouter({
	routes
})
