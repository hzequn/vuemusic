// *导出的全部方法都命名为types
import * as types from "./mutations-type";
//方法执行的操作
const mutations = {
//	[变量]
    [types.SET_SINGER](state,singer){
        state.singer = singer;
    },
    [types.SET_PLAYING](state,flag){
        state.playing = flag;
    },
    [types.SET_FULL_SCREEN](state, flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAYLIST](state, list) {
        state.playList = list
    },
    [types.SET_SEQUENCE_LIST](state, list) {
        state.sequenceList = list
    },
    [types.SET_CURRENT_INDEX](state, index) {
        state.currentIndex = index
    },
    [types.SET_PLAY_MODE](state, mode) {
        state.mode = mode
    }
}
export default mutations;