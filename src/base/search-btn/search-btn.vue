<template>
	<div class="search-btn" @select="aa">
		<div class="search-content">
			<span class="icon">
				<img src="./search.png"/>
			</span>
			<input type="text" placeholder="搜索歌曲、歌单、专辑" class="input" @focus="changshow" @keyup.enter="getsearchlist" ref="getsearchlist">
			<span class="cancel" ref="cancel" @click="cancel">{{quxiao}}</span>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				quxiao:"取消"
			}
		},
		methods:{
			changshow(){
				this.$refs.cancel.style.display="block";
				this.$emit('changshow',"123")
			},
			cancel(){
				this.$refs.cancel.style.display="none";
				this.$emit('cancel')
			},
			getsearchlist(){
				const wkey=this.$refs.getsearchlist.value				
				this.$emit('getsearchlist',wkey)
			},
			aa(item){
				console.log("sa")
//				this.$refs.getsearchlist.value=item.k
//				console.log(this.$refs.getsearchlist.value)
			}
		}
	}
</script>

<style>
	*{
		padding: 0;
		margin: 0;
	}
	.search-content{
		display: flex;
		height:32px;
		border:1px solid #ccc;
		padding:5px 20px;
		
	}
	.input{
		text-indent: 10px;
		flex:1;
		height:32px;
		line-height: 32px;
		border:0;
		background:#212121;
		outline: none;
		color:rgba(255,255,255,0.5);
	}
	.cancel{
		padding: 5px;
		line-height: 22px;
		color: rgba(255,255,255,0.5);
		display: none;
	}
</style>