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
    SET_FAVORITE_SONG,
    SET_FAVORITE_LIST,
    SET_HISTORY_SONG,
    SET_HISTORY_LIST,
    SET_DELFAVORITESONG,
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
        // console.log('SET_CURRENT_INDEX' + '' + index)
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
    // 把当前歌曲加入到收藏当中
    [SET_FAVORITE_SONG] (state, song) {
        // 排重
        let result = state.favoriteList.find(function (currentValue) {
            // 判断id
            return currentValue.id === song.id
        })
        // 如果没有则添加到数组
        if (result === undefined) {
            state.favoriteList.push(song)
        }
    },
    // 删除本地数组中存在的歌曲信息
    [SET_DELFAVORITESONG] (state, song) {
        // console.log(song.id + '\n' + '看看传入的什么鬼')
        if (state.favoriteList.length <= 0) {
            return
        }
        // 删除一个匹配到的元素，返回一个新数组
        let newLists = state.favoriteList.filter(function check(value) {
            return value.id != song.id
        })
        state.favoriteList = newLists
    },
    // 设置当前的收藏数组歌曲
    [SET_FAVORITE_LIST] (state, list) {
        state.favoriteList = list
    },
    // 把当前播放的歌曲加入到播放历史记录的数组里面
    [SET_HISTORY_SONG] (state, song) {
        // 排重
        let result = state.historyList.find(function (currentSong) {
            return currentSong.id === song.id
        })
        if (result === undefined) {
            if (state.historyList.length > 30) {
                // 大于了30条记录，则从最后一个删除
                state.historyList.splice(0, 1)
            }
            // 加入到播放历史记录数组
            state.historyList.push(song)
        }
    },
    // 取出当前播放的历史记录数组
    [SET_HISTORY_LIST] (state, list) {
        state.historyList = list
    },
}
