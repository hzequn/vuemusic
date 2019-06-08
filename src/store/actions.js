import * as types from "./mutations-type"
import playMode from "../common/js/config"
import {shuffle} from "../common/js/utils"
export const selectPlay=function({commit},{list,index}){
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
	commit(types.SET_PLAYLIST,list);
	commit(types.SET_SEQUENCE_LIST,list);
	commit(types.SET_CURRENT_INDEX,index);
}

export const randomPlay=function({commit},{list}){
	commit(types.SET_PLAY_MODE,playMode.random);
	commit(types.SET_SEQUENCE_LIST,list);
	let randomList=shuffle(list);
	commit(types.SET_PLAYLIST,randomList);
	commit(types.SET_CURRENT_INDEX,0);
	commit(types.SET_PLAYING,true);
	commit(types.SET_FULL_SCREEN,true);
}
