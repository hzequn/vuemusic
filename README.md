# 说明

>  非常简单的一个vue + vuex的项目，整个流程一目了然，麻雀虽小，五脏俱全，适合作为入门练习。

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目

>  如有问题请直接在 Issues 中提，或者您发现问题并有非常好的解决方案，欢迎 PR 👍


## 项目运行（nodejs 6.0+）
``` bash
# 克隆到本地
git clone https://github.com/hzequn/vuemusic.git

# 进入文件夹
cd vuemusic

# 安装依赖
npm install(推荐) 或 yarn

# 开启本地服务器localhost:8088
npm run dev

# 发布环境
npm run build
```



# 效果演示



## 路由配置
```js
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
	{path: '/search',compobnent: Search},
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


```



## 配置actions
```js
import * as types from "./mutations-type"
import playMode from "../common/js/config"
import {shuffle} from "../common/js/utils"
export const selectPlay=function({commit},{list,index}){
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYLIST,list);
	commit(types.SET_SEQUENCE_LIST,list);
	commit(types.SET_CURRENT_INDEX,index);
}

export const randomPlay=function({commit},{list}){
	commit(types.SET_PLAY_MODE,playMode.random);
	commit(types.SET_SEQUENCE_LIST,list);
	let randomList=shuffle(list);
	commit(types.SET_PLAYLIST,randomList);
	commit(types.SET_CURRENT_INDEX,0);
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
}


```


## mutations
```js
// *导出的全部方法都命名为types
import * as types from "./mutations-type";
//方法执行的操作
const mutations = {
//	[变量]
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    },
    [types.SET_PLAYING](state,flag){
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    }
}
export default mutations;
```

## getters
```js
//获取数据
export const singer=state=>state.singer;
//(state)当里面只有一个参数的时候可以省略括号,当返回只有一条简单的代码的时候可以省略{}
export const playing=state=>state.playing;
export const fullScreen=state=>state.fullScreen;
export const playList=state=>state.playList;
export const sequenceList=state=>state.sequenceList;
export const currentIndex=state=>state.currentIndex;
export const mode=state=>state.mode;
//当前播放的歌曲
export const currentSong=state=>state.playList[state.currentIndex];

