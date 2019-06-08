import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import router from './router/index'
import './common/stylus/index.styl'
import store from "./store/index"

Vue.use(VueResource);

Vue.use(VueLazyload,{
	loading:require('./common/images/default.png')
})

new Vue({
	router,
	store,
 	render: h => h(App)
}).$mount('#app')
