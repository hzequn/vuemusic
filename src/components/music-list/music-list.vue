<template>
	<div class="music-list">
		<div class="back" v-on:click="back"><i class="icon-back"></i></div>
		<h1 class="title" v-html="title"></h1>
		<div class="bg-image" :style="bgStyle" ref="bgImage">
			<div class="play-wrapper" ref="playBtn">
				<div class="play">
					<i class="icon-play"></i>
					<span class="text" @click="random">随机播放全部</span>
				</div>
			</div>
		</div>
		<div class="bg-layer" ref="layer"></div>
		<scroll class="list" 
			:data="songs" 
			ref="list" 
			:listen-scroll="listenScroll" 
			:probeType="probeType"
			v-on:scroll="scroll"
			>
			<div class="song-list-wrapper">
				<song-list :songs="songs" v-on:select="selectItem"></song-list>
			</div>
		</scroll>
	</div>
</template>

<script>
	import Scroll from "../../base/scroll/scroll"
	import SongList from "../../base/song-list/song-list"
	import {mapActions} from "vuex"
	const RESERVED_HEIGHT=40;
	export default{
		data(){
			return {
				scrollY:0
			}
		},
		props:{
			songs:{
				//歌曲列表
				type:Array,
				default:function(){
					return []
				}
			},
			title:{
				type:String,
				default:""
			},
			bgImage:{
				type:String,
				default:""
			}
		},
		created(){
			this.listenScroll=true;
			this.probeType=3;
		},
		computed:{
			bgStyle:function(){
				return `background-image:url(${this.bgImage})`
			}
		},
		methods:{
			back:function() {
				//返回上一个页面
				this.$router.back();
			},
			selectItem:function (song,index){
				//监听到子组件传入的select事件的处理函数
//				this.setPlaying(true);
//				this.setFullScreen(true);
//				this.setPlayList(this.songs);
//				this.setSequenceList(this.songs);
//				this.setCurrentIndex(index);
				this.selectPlay({
					list:this.songs,
					index
				})
			},
			scroll:function(pos){
				//监听滚动组件传入的滚动事件 传入滚动位置的参数
//				console.log(pos.y)
				this.scrollY=pos.y;
			},
//			...mapMutations({
//				"setPlaying":"SET_PLAYING",
//				"setFullScreen":"SET_FULL_SCREEN",
//				"setPlayList":"SET_PLAYLIST",
//				"setSequenceList":"SET_SEQUENCE_LIST",
//				"setCurrentIndex":"SET_CURRENT_INDEX"
//			})
			random:function(){
				this.randomPlay({
					list:this.songs
				})
			},
			...mapActions(['selectPlay','randomPlay'])
		},
		mounted(){
			this.imageHeight=this.$refs.bgImage.clientHeight;
			//歌曲列表能上华的距离
			this.minTranslateY=-this.imageHeight+RESERVED_HEIGHT
			this.$refs.list.$el.style.top=`${this.imageHeight}px`
		},
		components:{
			Scroll,
			SongList
		},
		watch:{
			scrollY:function(newY){
				let zindex=0;
				let scale=1;//背景图初始的缩放比例
				const percent=(newY/this.imageHeight);
				let translateY=Math.max(newY,this.minTranslateY);
				console.log(translateY)
				this.$refs.layer.style.transform=`translate3d(0,${translateY}px,0)`
				this.$refs.layer.style.webkitTransform=`translate3d(0,${translateY}px,0)`
				if(newY>0){
					zindex=10;
					scale=percent+1
				}
				if(newY<this.minTranslateY){
					zindex=10;
					this.$refs.bgImage.style.paddingTop="0";
					this.$refs.bgImage.style.height=RESERVED_HEIGHT+"px";
					this.$refs.playBtn.style.display="none"
				}else{
					this.$refs.bgImage.style.paddingTop="70%";
					this.$refs.bgImage.style.height="0"
					this.$refs.playBtn.style.display=""
				}
				this.$refs.bgImage.style.zIndex=zindex;
				this.$refs.bgImage.style.transform=`scale(${scale})`;
				this.$refs.bgImage.style.webkitTransform=`scale(${scale})`;
			}
		}
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"
    @import "../../common/stylus/mixin"

    .music-list
        position: fixed
        z-index: 100
        top: 0
        left: 0
        bottom: 0
        right: 0
        background: $color-background
        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50
            .icon-back
                display: block
                padding: 10px
                font-size: $font-size-large-x
                color: $color-theme
        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text
        .bg-image
            position: relative
            width: 100%
            height: 0
            padding-top: 70%
            transform-origin: top
            background-size: cover
            .play-wrapper
                position: absolute
                bottom: 20px
                z-index: 50
                width: 100%
                .play
                    box-sizing: border-box
                    width: 135px
                    padding: 7px 0
                    margin: 0 auto
                    text-align: center
                    border: 1px solid $color-theme
                    color: $color-theme
                    border-radius: 100px
                    font-size: 0
                    .icon-play
                        display: inline-block
                        vertical-align: middle
                        margin-right: 6px
                        font-size: $font-size-medium-x
                    .text
                        display: inline-block
                        vertical-align: middle
                        font-size: $font-size-small
            .filter
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
                background: rgba(7, 17, 27, 0.4)
        .bg-layer
            position: relative
            height: 100%
            background: $color-background
        .list
            position: fixed
            top: 0
            bottom: 0
            width: 100%
            background: $color-background
            .song-list-wrapper
                padding: 20px 30px
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>