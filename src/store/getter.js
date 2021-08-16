

// 专门用于获取全局共享的数据的方法, state里面的属性等
export default {
    // 获取全局变量的状态
    isFullScreen (state) {
        return state.isFullScreen
    },
    // 迷你播放界面
    isShowMiniPlayer (state) {
        return state.isShowMiniPlayer
    },
    // 播放列表界面
    isShowListPlayer (state) {
        return state.isShowListPlayer
    },
    // 获取播放列表是否正在播放的值
    isPlaying (state) {
        return state.isPlaying
    },
    // 获取播放模式
    modeType (state) {
        return state.modeType
    },
    // 获取播放详情界面的数据
    songs (state) {
        return state.songs
    },
    // 获取当前播放歌曲
    currentSong (state) {
        // 设置默认值，第一次的时候没有值
        console.log(state.currentIndex)
        let obj = {
            name: '',
            singer: '',
            picUrl: null
        }
        if (state.songs.length !== 0) {
            obj = state.songs[state.currentIndex]
        }
        console.log(obj)
        return obj
    },
    // 获取当前播放音乐的歌词
    currentLyric (state) {
        return state.currentLyric
    },
    // 获取当前播放音乐的索引
    currentIndex (state) {
        return state.currentIndex
    },
    // 获取当前音乐播放的跳转的时间
    curTime (state) {
        return state.curTime
    },
}
