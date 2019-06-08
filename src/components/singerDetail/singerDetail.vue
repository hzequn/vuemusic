<template>
	<transition name="slide">
		<music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
	</transition>
</template>

<script>
	import MusicList from '../music-list/music-list'
	import {url,params,ERR_OK,callback} from '../../api/getSingerDetail'
	import {mapGetters} from "vuex"
	import createSong from "../../common/js/song"
	export default{
		data(){
			return {
				songs:[]
			}
		},
		created(){
			this._getDetail();
		},
		computed:{
			bgImage:function(){
				//歌手的头像
				return this.singer.avatar;
			},
			title:function(){
				//歌手的名字
				return this.singer.name;
			},
			...mapGetters(['singer'])
		},
		methods:{
			_getDetail(){
				//let singermid=this.$route.params.id
				if(!this.singer.id){
					this.$router.push('/singer');
					return;
				}
				let singermid=this.singer.id;
				this.$http.jsonp(url,{
					params:{...params,singermid},
					'jsonp':callback
				}).then((res)=>{
					if(res.body.code==ERR_OK){
						console.log(this._normalizeSongs(res.body.data.list))
						this.songs = this._normalizeSongs(res.body.data.list);
					}
				})
			},
			//将复杂的数据处理为需要的几个数据
			_normalizeSongs(list){
			let ret=[];
			list.forEach((item)=>{
				let {musicData}=item;
				if(musicData.songmid&&musicData.albummid){
					ret.push(createSong(musicData))
				}
			})
			return ret;
		}
		},
		components:{
			MusicList
		},
		watch:{
			singer(){
				this.getDetail()
			}
		}
	}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>