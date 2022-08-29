// 引入获取接口api信息
import {
    getSongDetail,
    getSongURL,
    getSongLyric,
} from '../api/index'

// 定义常量，如果是字符串的话，不容易报错，排查信息
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

// 用于保存触发mutations中保存的方法的方法
export default {
    // 播放界面是否显示
    setFullScreen({commit}, flag) {
        // 触发mutations里面的方法的方法,
        commit(SET_FULL_SCREEN, flag)
    },
    // 迷你播放器是否显示
    setMiniPlayer({commit}, flag) {
        commit(SET_MINI_PLAYER, flag)
    },
    // 播放列表的是否显示
    setListPlayer({commit}, flag) {
        // 触发mutatioons里面的方法 commit固定于法
        commit(SET_LIST_PLAYER, flag)
    },
    // 触发mutaitions里面的方法
    setIsPlaying({commit}, flag) {
        commit(SET_IS_PLAYING, flag)
    },
    // 触发播放模式列表
    setModeType({commit}, flag) {
        commit(SET_MODE_TYPE, flag)
    },
    // 异步获取播放详情页的数据
    async setSongDetail({commit}, ids) {
        // 请求歌曲接口信息
        let result = await getSongDetail({ids: ids.join(',')})
        // 请求歌曲的播放url
        let urls = await getSongURL({ id: ids.join(',') })
        console.log(result)
        console.log(urls)
        // 组合数据方便取出
        let list = []
        result.songs.forEach(function (value, vi) {
            let obj = {}
            for (let j = 0; j < urls.data.length; j++) {
                let item = urls.data[j]
                if (value.id === item.id) {
                    obj.url = item.url
                    break
                }
            }
            obj.id = value.id
            obj.name = value.name
            let singer = ''
            value['ar'].forEach(function (item, index) {
                if (index === 0) {
                    singer = item.name
                } else {
                    singer += '-' + item.name
                }
            })
            obj.singer = singer
            obj.picUrl = value['al'].picUrl
            // 加入数组
            list.push(obj)
        })
        // 触发mutations里面的数据，穿日数据过去修改
        // console.log(list)
        commit(SET_SONG_DETAIL, list)
    },
    // 触发mutations.js里面的当前播放的歌词
    async getSongLyric ({commit}, id) {
        // 请求歌词接口信息
        let result = await getSongLyric({id: id})
        // console.log(result.lrc.lyric)
        // 解析歌词
        let obj = parseLyric(result.lrc.lyric)
        // console.log(obj + 'zxx')
        commit(SET_SONG_LYRIC, obj)
    },
    // 设置当前的索引
    setCurrentIndex ({commit}, index) {
        commit(SET_CURRENT_INDEX, index)
    },
    // 点击列表删除song里面的存储的数据
    setDelSong ({commit}, index) {
        commit(SET_DEL_SONG, index)
    },
    // 设置当前播放的时间
    setCurrentTime ({commit}, time) {
        commit(SET_CURRENT_TIME, time)
    },
    // 设置存入歌曲到收藏的数组中
    setFavoriteSong ({commit}, song) {
        commit(SET_FAVORITE_SONG, song)
    },
    // 存入数组
    setFavoriteList ({commit}, list) {
        commit(SET_FAVORITE_LIST, list)
    },
    // 删除收藏的歌曲
    setDelFavoriteSongFromeList ({commit}, song) {
        commit(SET_DELFAVORITESONG, song)
    },
    // 设置当前播放的歌曲存入本地的历史记录
    setHistorySong ({commit}, song) {
        commit(SET_HISTORY_SONG, song)
    },
    // 获取
    setHistoryList({commit}, list) {
        commit(SET_HISTORY_LIST, list)
    },

}
// 格式化歌词的方法
function parseLyric (lrc) {
    let lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
    let reg3 = /\:\d*/i
    // 4.定义对象保存处理好的歌词
    let lyricObj = {}
    lyrics.forEach(function (lyric) {
        // 1.提取时间
        let timeStr = lyric.match(reg1)
        if (!timeStr) { return }
        timeStr = timeStr[0]
        // 2.提取分钟
        let minStr = timeStr.match(reg2)[0].substr(1)
        // 3.提取秒钟
        let secondStr = timeStr.match(reg3)[0].substr(1)
        // 4.合并时间, 将分钟和秒钟都合并为秒钟
        let time = parseInt(minStr) * 60 + parseInt(secondStr)
        // 5.处理歌词
        let text = lyric.replace(reg1, '').trim()
        // 6.保存数据
        lyricObj[time] = text
    })
    return lyricObj
}
