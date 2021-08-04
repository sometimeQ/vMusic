<template>
    <div class="detail">
        <DetailHeader :title="playlist.name"></DetailHeader>
        <DetailTop :path="playlist.coverImgUrl" ref="top"></DetailTop>
        <div class="bottom">
            <ScrollView ref="scrollview">
                <DetailBottom :playlist="playlist.tracks"></DetailBottom>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import { getAlbum, getPlayList } from '../api'
import DetailHeader from '../components/Detail/DetailHeader'
// 图片
import DetailTop from '../components/Detail/DetailTop'
// 底部歌单数据
import DetailBottom from '../components/Detail/DetailBottom'
import ScrollView from '../components/ScrollView'
export default {
    name: 'Detail',
    // 注册组件
    components: {
        DetailHeader,
        DetailTop,
        DetailBottom,
        ScrollView
    },
    // 声明数组接收数据
    data () {
        return {
            playlist: {},
        }
    },
    // 渲染之前调用
    created () {
        // 取出路由传递过来的数据,固定的写法 this.$route.params.xx代表参数
        // console.log(this.$route.params.type)
        // console.log(this.$route.params.id)
        // console.log('xxxxmm')

        let oType = this.$route.params.type
        if (oType === 'personalized') {
            // 调用数据
            getPlayList({id: this.$route.params.id}).then((data) => {
                // console.log(data)
                this.playlist = data.playlist
            }).catch(function (error) {
                console.log(error)
            })
        } else if (oType === 'albums') {
            // 调用网络接口展示数据
            getAlbum({id: this.$route.params.id}).then((data) => {
                // console.log(data)
                // 整合数据
                this.playlist = {
                    name: data.album.name,
                    coverImgUrl: data.album.picUrl,
                    tracks: data.songs
                }
            })
        }
    },
    // 界面完全渲染完毕调用
    mounted () {
        // 获取原生的元素进行操作, 拿到组件的根元素 $el,得到了高度
        // console.log(this.$refs.top.$el.offsetHeight)
        let defaultHeight = this.$refs.top.$el.offsetHeight
        // 滚动的距离调用scrollview
        this.$refs.scrollview.scrolling((offsetY) => {
            if (offsetY < 0) {
                // 向上滚动
                // console.log('向上滚动')
                // let scale = defaultHeight / offsetY
                let scale = Math.abs(offsetY) / defaultHeight
                // 设置给背景慢慢变黑色，提供一个外界的方法
                this.$refs.top.changeMask(scale)
                /*
                    注意点: 高斯模糊效果是非常消耗性能的, 不推荐在移动端中使用
                    如果非要在移动端中使用, 那么建议只设置一次
                **/
                // this.$refs.top.$el.style.filter = `blur(${scale}px)`
            } else {
                // 向下滚动,就是放大
                // console.log('向下滚动')
                let scale = 1 + offsetY / defaultHeight
                console.log(scale)
                this.$refs.top.$el.style.transform = `scale(${scale})`
            }
        })
    }
}
</script>

<style scoped lang="scss">
    @import "../assets/css/mixin";
    @import "../assets/css/variable";

    .detail{
        // 固定定位
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        @include bg_sub_color();
    }
    .bottom{
        // 固定定位
        position: fixed;
        top: 500px;
        bottom: 0;
        left: 0;
        right: 0;
    }
</style>
