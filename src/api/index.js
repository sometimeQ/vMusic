// 引入需要的组件
import Network from './network'

// 封装请求的接口  使用箭头函数定义函数
export const getBanner = () => Network.get('banner?type=2')
// 推荐歌单请求接口
export const getPersonalized = () => Network.get('personalized?limit=6')
// 最新专辑网络请求接口
export const getNewAlbum = () => Network.get('album/newest')
// 最新音乐网络请求接口
export const getNewSong = () => Network.get('personalized/newsong')
// 推荐歌单网络请求接口
export const getPlayList = (data) => Network.get('playlist/detail', data)
// 音乐详情网络请求接口
export const getSongDetail = (data) => Network.get('song/detail', data)
// 最新专辑详情页面网络请求接口
export const getAlbum = (data) => Network.get('album', data)
// 获取音乐歌词列表的接口
export const getSongLyric = (data) => Network.get('lyric', data)
// 获取歌曲的播放地址url
export const getSongURL = (data) => Network.get('song/url', data)
