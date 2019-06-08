<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BScroll from "better-scroll"
	export default{
		data(){
			return{
				
			}
		},
		props:{
			click:{
				type:Boolean,
				default:true
			},
			probeType:{
				type:Number,
				default:3
			},
			listenScroll:{
				type:Boolean,
				default:false
			},
			data:{
				type:Array,
				default:null
			}
		},
		methods:{
			_initScroll(){
				if(!this.$refs.wrapper){
					return
				}
				this.scroll=new BScroll(this.$refs.wrapper,{
					click:this.click,
					probeType:this.probeType
				});
				if(this.listenScroll){
					this.scroll.on('scroll',(pos)=>{
//						console.log(pos);
						this.$emit("scroll",pos);
					})
				}
			},
			refresh(){
				this.scroll&&this.scroll.refresh();
			},
			scrollTo(){
				this.scroll&&this.scroll.scrollTo.apply(this.scroll,arguments);
			},
			//滚动到固定元素
			scrollToElement(){
				this.scroll&&this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		mounted(){
			this.$nextTick(()=>{
				this._initScroll();
			})
		},
		watch:{
			data:function(){
				this.$nextTick(()=>{
					this.refresh();
				})
			}
		}
	}
	
</script>