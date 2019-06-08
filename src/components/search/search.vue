<template>
	<div class="search">
		<search-btn @changshow="changshow" @cancel="cancel" @getsearchlist="getsearchlist"></search-btn>
		<div class="showHotKey" ref="showHotKey">
			<h1 class="title">热门搜索</h1>
			<div class="hotkeylist">
				<span class="special_key">{{hotkeyList.special_key}}</span>
				<span class="normal_key">
					<span class="item" v-for="(item,index) in norhotkeylist" @click="select(item)">{{item.k}}</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	import searchBtn from "../../base/search-btn/search-btn"
	import { url, params, ERR_OK, callback } from "../../api/gethotkey"
	import {url2,params2,ERR_OK2,callback2} from "../../api/getsearchlist"
	import axios from "axios"
	export default {
		data() {
			return {
				hotkeyList: [],
				norhotkeylist: []
			}
		},
		computed: {

		},
		components: {
			searchBtn
		},
		methods: {
			getHotKeyList() {
				//获取热门搜索的数据
				this.$http.jsonp(url, {
					params,
					"jsonp": callback
				}).then((res) => {
					if(res.data.code == ERR_OK) {
						//						console.log(res.body.data)
						this.hotkeyList = res.body.data
						//						console.log(this.hotkeyList)
						this.normalhotkeylist(this.hotkeyList.hotkey);
					}
				})
			},
			normalhotkeylist(hotkeyList) {
				this.norhotkeylist = hotkeyList.splice(0, 10);
//				console.log(this.norhotkeylist)
			},
			changshow(){
				this.$refs.showHotKey.style.display="none";
			},
			cancel(){
				this.$refs.showHotKey.style.display="block";
			},
			getsearchlist(wkey){
				//请求搜索的数据列表
				const w=wkey
				this.$http.jsonp(url2,{
					params:{...params2,w},
					"jsonp":callback2
				}).then((res)=>{
					console.log(res)
				})
			},
			select(item){
				console.log(item)
				this.$emit('select',item)
			}
			
		},
		created() {
			this.getHotKeyList();
		}
	}
</script>

<style type="text/css">
	.showHotKey {
		position: fixed;
		top: 160px;
		bottom: 0;
		padding:0px 20px;
	}
	.title{
		height:40px;
		line-height: 40px;
		color:#999;
	}
	.hotkeylist{
		margin-top: 10px;
	}
	.special_key,.normal_key .item{
		display: inline-block;
		height:50px;
		text-align: center;
		line-height: 52px;
		border:1px solid #666; 
		border-radius: 25px;
		color:rgba(255,255,255,0.5);
		margin:0px 20px 20px 0;
		font-size: 20px;
		padding: 0 20px;
	}
	.special_key{
		color:#ffcd32;
		border:1px solid #ffcd32; 
	}
</style>