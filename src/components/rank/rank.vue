<template>
	<div class="rank">
		<scroll class="rank-content" :data="ranklist">
			<ul>
				<li v-for="(item,index) in ranklist" class="item">
					<div class="icon">
						<img v-lazy="item.picUrl" width="100" height="100" />
					</div>
					<div class="text">
						<h2 class="name">{{item.topTitle}}</h2>
						<p v-for="(items,index) in item.songList" class="hidden">
							<span class="desc index">{{index+1}}</span>
							<span class="desc">{{items.songname}} - </span>
							<span class="desc">{{items.singername}}</span>
						</p>
					</div>
				</li>
			</ul>
			<div class="loading-container" v-if="!ranklist.length">
				<loading></loading>
			</div>
		</scroll>
	</div>
</template>

<script>
	import {url,params,ERR_OK,callback} from "../../api/getranklist";
	import axios from "axios";
	import Scroll from "../../base/scroll/scroll"
	import Loading from "../../base/loading/loading"
	export default{
		data(){
			return {
				ranklist:[]
			}
		},
		methods:{
			getRank:function(){
				//获取排行榜数据
				this.$http.jsonp(url,{
					params,
					"jsonp":callback
				}).then((res)=>{
					if(res.data.code==ERR_OK){
						console.log(res.body.data.topList)
						this.ranklist=res.body.data.topList
					}
				})
			}
		},
		created:function(){
			this.getRank()
		},
		components:{
			Scroll,
			Loading
		}	
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"

    .rank
        position: fixed
        width: 100%
        top: 88px
        bottom: 0
        .rank-content
            height: 100%
            overflow: hidden
            .item
                display: flex
                box-sizing: border-box
                align-items: center
                padding: 0 20px 20px 20px
                .icon
                    flex: 0 0 100px
                    width: 100px
                    padding-right: 20px
                .text
                    display: flex
                    flex-direction: column
                    justify-content: center
                    flex: 1
                    line-height: 20px
                    overflow: hidden
                    font-size: $font-size-medium
                    .name
                        margin-bottom: 10px
                        color: $color-text
                        font-size:$font-size-medium-x
                    .hidden
                    	overflow: hidden
                    	white-space: nowrap
                    	text-overflow: ellipsis
                    	color: $color-text-d
                    	.index
                    		padding-right:20px
                    	.desc
                        	color: $color-text-d
            .loading-container
                position: absolute
                width: 100%
                top: 50%
                transform: translateY(-50%)
</style>