// 引入需要的组件
import network from './network'

// 封装请求的接口  使用箭头函数定义函数
export const getBanner = () => network.get('banner?type=2')
// 推荐歌单请求接口
export const getPersonalized = () => network.get('personalized?limit=6')
// 最新专辑网络请求接口
export const getNewAlbum = () => network.get('album/newest')
