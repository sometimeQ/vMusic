// 引入播放迷失
import modeType from './modeType'

// 把对象暴露出去,用于保存全局共享的属性
export default {
    // 这里面其实是属性，映射的
    // 这是控制播放界面是否显示的全局变量
    isFullScreen: false,
    // 这是控制底部的迷你播放器是否显示的全局变量
    isShowMiniPlayer: false,
    // 这是控制播放列表是否显示的全局变量
    isShowListPlayer: false,
    // 记录是否正在播放音乐的变量
    isPlaying: false,
    // 播放模式
    modeType: modeType.loop,
    // 歌曲
    songs: [],
    // 当前播放的歌曲
    currentSong: {},
    // 当前播放歌曲的索引,默认是第0首
    currentIndex: 0,
    // 获取当前播放音乐的歌词
    currentLyric: {},
    // 当前播放的时间
    curTime: 0,
    // 收藏的歌曲历史
    favoriteList:[],
    // 播放歌曲的历史
    historyList: [],
}
