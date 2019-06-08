<template>
	<div class="singer">
		<list-view :list="singers" v-if="singers.length" v-on:select="selectSinger"></list-view>
			<router-view></router-view>	
	</div>
</template>

<script>
	import ListView from "../../base/listview/listview"
	import {url,callback,ERR_OK,params} from "../../api/getSingerList"
	import Singer from "../../common/js/singer"
	import {mapMutations} from "vuex"
	const HOT_NAME='热门';
	const HOT_SINGER_LEN=10;
	export default{
		data(){
			return {
				singers:[],
				singer:{}
			}
		},
		components:{
			ListView			
		},
		methods:{
			_getSingerList(){
				this.$http.jsonp(url,{
					params,
					"jsonp":callback
				}).then((res)=>{
//					console.log(res.body.data.list)
					if(res.body.code==ERR_OK){
						this.singers=this._normallizeSinger(res.body.data.list);
//						console.log(this.singers)
					}
				})
			},
			//歌手数据序列化
			_normallizeSinger(list){
				let map={
					hot:{
						title:HOT_NAME,
						items:[]
					}
					
				};
				list.forEach((item,index)=>{
					if(index<HOT_SINGER_LEN){
						map.hot.items.push(new Singer(
							{
								id:item.Fsinger_mid,
                                name:item.Fsinger_name
							}
						))
					}
					const key =item.Findex;//歌手首字母
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(new Singer(
							{
								id:item.Fsinger_mid,
                                name:item.Fsinger_name
							}
						))
				});
//				console.log(map)
				//序列化字母
				let hot=[];
				let ret=[];
				for(let key in map){
					let val=map[key];
					if(val.title.match(/[a-zA-Z]/)){
						ret.push(map[key])
					}else if(val.title==HOT_NAME){
						hot.push(val)
					}
				}
//				console.log(ret)
				ret.sort((a,b)=>{
					return a.title.charCodeAt()-b.title.charCodeAt();
				});
				
				return hot.concat(ret);
				
			},
			selectSinger(singer){
				this.setSinger(singer)
				this.$router.push({
					path:`/singer/${singer.id}`
				})
			},
			...mapMutations({
				'setSinger':"SET_SINGER"
			})
		},
		created(){
			this._getSingerList();
		},
	
	}
</script>

<style scoped lang="stylus">
    .singer
        position: fixed
        top: 88px
        bottom: 0
        width: 100%
</style>