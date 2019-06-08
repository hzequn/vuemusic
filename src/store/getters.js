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


//1--export const singer=function(state){
//	return state.singer;
//});
//2--export const singer=function(state)=>{
//	return state.singer;
//});
//3--export const singer=state=>{
//	return state.singer;
//});
//4--export const singer=state=>state.singer;