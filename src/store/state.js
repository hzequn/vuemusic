//config配置文件记录播放的方式
import playMode from "../common/js/config"
//驱动应用的数据源
export default{
	singer:{},
	playing:false,
	fullScreen:false,
	playList:[],
	sequenceList:[],
	currentIndex:-1,
	mode:playMode.sequence
}
