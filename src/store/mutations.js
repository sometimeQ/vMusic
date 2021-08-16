import {
    SET_FULL_SCREEN,
    SET_MINI_PLAYER,
    SET_LIST_PLAYER,
    SET_IS_PLAYING,
    SET_MODE_TYPE,
    SET_SONG_DETAIL,
    SET_SONG_LYRIC,
    SET_CURRENT_INDEX,
    SET_DEL_SONG,
    SET_CURRENT_TIME,
} from './mutations-type'

// 用于保存修改全局共享的数据的方法  state里面的
export default {
    // SET_FULL_SCREEN这个是方便action里面调用的方法
    // 播放器界面
    [SET_FULL_SCREEN] (state, flag) {
        // 触发修改state里面的变量
        state.isFullScreen = flag
        // 同一时间只能展示一个播放界面
        if (flag) {
            // 都隐藏播放列表与迷你播放器
            state.isShowListPlayer = false
            state.isShowMiniPlayer = false
        }
    },
    // 迷你播放器
    [SET_MINI_PLAYER] (state, flag) {
        // 修改全局变量state里面的变量
        state.isShowMiniPlayer = flag
        // 同一时间只能展示一个播放界面
        if (flag) {
            state.isShowListPlayer = false
            state.isFullScreen = false
        }
    },
    // 播放列表
    [SET_LIST_PLAYER] (state, flag) {
        // 修改群居变量 state里面的值
        state.isShowListPlayer = flag
    },
    // 播放界面是否正在播放
    [SET_IS_PLAYING] (state, flag) {
        // 修改全局变量 state,里面的值
        state.isPlaying = flag
    },
    // 播放模式
    [SET_MODE_TYPE] (state, flag) {
        // 修改播放模式列表
        state.modeType = flag
    },
    // 获取详情接口
    [SET_SONG_DETAIL] (state, list) {
        // 修改state里面的值
        state.songs = list
    },
    // 当前播放的歌词
    [SET_SONG_LYRIC] (state, lyric) {
        // 修改state里面的
        state.currentLyric = lyric
    },
    // 修改state里面的属性
    [SET_CURRENT_INDEX] (state, index) {
        // 如果是第一首则最后一首，如果是最后一首，则赋值第一手
        if (index < 0) {
            index = state.songs.length - 1
        } else if (index > state.songs.length - 1) {
            index = 0
        }
        console.log('SET_CURRENT_INDEX' + '' + index)
        state.currentIndex = index
    },
    // 删除songs里面的数据
    [SET_DEL_SONG] (state, index) {
        // 单个删除和全部删除
        if (index !== undefined) {
            state.songs.splice(index, 1)
        } else {
            state.songs = []
        }
        // 如果播放的时候小于索引删除没问题，如果大于就要减一才能保持播放的位置不错乱，playlist列表里面的
        if (index < state.currentIndex) {
            // console.log('mmm')
            state.currentIndex = state.currentIndex - 1
        } else if (index > state.currentIndex) {
            // console.log('这里是索引')
        } else if (index === state.songs.length) {
            state.currentIndex = 0
        }
        // 删除完毕后，关闭列表与播放界面，以及迷你播放界面
        if (state.songs.length === 0) {
            state.isFullScreen = false
            state.isShowMiniPlayer = false
            state.isShowListPlayer = false
            // 暂停播放的音乐
            state.isPlaying = false
        }
    },
    // 设置当前音乐播放的时间
    [SET_CURRENT_TIME] (state, time) {
        state.curTime = time
    },
}
