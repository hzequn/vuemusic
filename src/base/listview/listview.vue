<template>
	<scroll class="listview" :listenScroll="listenScroll" :probeType="probeType" v-on:scroll="scroll" ref="listview">
		<ul>
			<li v-for="group in list" class="list-group" ref="listGroup">
				<h2 class="list-group-title">{{group.title}}</h2>
				<ul>
					<li v-for="item in group.items" class="list-group-item"  v-on:click="selectItem(item)">
						<img v-lazy="item.avatar" class="avatar"/>
						<span class="name">{{item.name}}</span>
					</li>
				</ul>
			</li>
		</ul>
		<div class="list-shortcut" v-on:touchstart="onShortcutTouchStart" v-on:touchmove.stop.prevent="onShortcutTouchMove">
			<ul>
				<li v-for="(item,index) in shortcutList" 
					:class="['item',{'current':index==currentIndex}]"
					:data-index="index"
					>{{item}}</li>
			</ul>
		</div>
		<div class="list-fixed">
			<h1 class="fixed-title" ref="fixed">{{fixedTitle}}</h1>
		</div>
	</scroll>
</template>

<script>
	import Scroll from '../scroll/scroll'
	const TITLE_HEIGHT=30
	const ANCHOR_HEIGHT=18
	export default{
		data(){
			return {
				scrollY:0,
				currentIndex:0,
				diff:0
			}
		},
		props:{
			list:{
				type:Array,
				default:function(){
					return []
				}
			}
		},
		computed:{
			shortcutList(list){
				//map遍历数组 然后组成一个新的数组
				return this.list.map((group)=>{
					return group.title.substr(0,1);
				})
			},
			fixedTitle(){
				if(this.scrollY>0){
					return ""
				}
				return this.list[this.currentIndex].title?this.list[this.currentIndex].title:""
			}
		},
		components:{
			Scroll
		},
		methods:{
			scroll(pos){
//				console.log(pos.y)
				this.scrollY=pos.y
			},
			_calculateHeight(){
				this.listHeight=[];
				const list=this.$refs.listGroup;
				let height=0;
				this.listHeight.push(height);
				for(let i=0;i<list.length;i++){
					let item=list[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
//				console.log(this.listHeight)
			},
			onShortcutTouchStart(e){
				let anchorIndex=e.target.getAttribute('data-index');
				this.touch.y1=e.touches[0].pageY;
//				console.log(anchorIndex);
				this.touch.anchorIndex=anchorIndex;
				this._scrollTo(anchorIndex)
			},
			onShortcutTouchMove(e){
				this.touch.y2=e.touches[0].pageY;
				let delta=Math.floor((this.touch.y2-this.touch.y1)/ANCHOR_HEIGHT)
				let anchorIndex=+this.touch.anchorIndex+delta
//				console.log(anchorIndex)
				this._scrollTo(anchorIndex)
			},
			_scrollTo(index){
				if(!index&&index!=0){
					return
				}
				//边界检测
				if(index<0){
					index=0
				}else if(index>this.listHeight.length-2){
					index=his.listHeight.length-2;
				}
				//传入分组索引,跳到对应分组
				this.currentIndex=index;
				this.$refs.listview.scrollToElement(this.$refs.listGroup[index]);
			},
			selectItem(singer){
				this.$emit('select',singer)
			},
		},
		created(){
			this.probeType=3;
			this.listenScroll=true;
			this.touch={}
		},
		mounted(){
			this.$nextTick(()=>{
					this._calculateHeight();
				})
		},
		watch:{
			list(){
				this.$nextTick(()=>{
					this._calculateHeight();
				})
			},
			scrollY(newY){
				//检测当前滑动的距离,根据滑动的距离计算出当前的index
				const listHeight=this.listHeight;//24个数
				//当滚动到上部
				if(newY>0){
					this.currentIndex=0;
					return;
				}
				//在中间滚动
				for(let i=0;i<listHeight.length-1;i++){//23个区间
					let startHeight=listHeight[i];
					let endHeight=listHeight[i+1];
					if(-newY>startHeight&&-newY<endHeight){
						this.currentIndex=i;
						//下一个分组距离顶部的距离
						this.diff=endHeight+newY
						return;
					}
				}
				//当滚动到底部
				this.currentIndex=listHeight.length-2;
			},
			diff(newVal){
				//观测下一个分组距离顶部的距离
				let fixTop=(newVal>0&&newVal<TITLE_HEIGHT)?newVal-TITLE_HEIGHT:0
				if(fixTop==this.fixTop){
					return
				}
				this.fixTop=fixTop;
				this.$refs.fixed.style.transform=`translate3d(0,${fixTop}px,0)`;
				this.$refs.fixed.style.webkitTransform=`translate3d(0,${fixTop}px,0)`;
			}
		}
	}
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/variable"
    .listview
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        background: $color-background
        .list-group
            padding-bottom: 30px
            .list-group-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
            .list-group-item
                display: flex
                align-items: center
                padding: 20px 0 0 30px
                .avatar
                    width: 50px
                    height: 50px
                    border-radius: 50%
                .name
                    margin-left: 20px
                    color: $color-text-l
                    font-size: $font-size-medium
        .list-shortcut
            position: absolute
            z-index: 30
            right: 0
            top: 50%
            transform: translateY(-50%)
            width: 20px
            padding: 20px 0
            border-radius: 10px
            text-align: center
            background: $color-background-d
            font-family: Helvetica
            .item
                padding: 3px
                line-height: 1
                color: $color-text-l
                font-size: $font-size-small
                &.current
                    color: $color-theme
        .list-fixed
            position: absolute
            top: 0
            left: 0
            width: 100%
            .fixed-title
                height: 30px
                line-height: 30px
                padding-left: 20px
                font-size: $font-size-small
                color: $color-text-l
                background: $color-highlight-background
        .loading-container
            position: absolute
            width: 100%
            top: 50%
            transform: translateY(-50%)
</style>