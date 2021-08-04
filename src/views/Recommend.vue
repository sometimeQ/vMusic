<template>
    <div class="recommend">
        <div class="recommend-warpper">
           <!--用iscrollview包裹下-->
           <ScrollView>
               <div>
                   <!--:banners是传递给子组件的参数,  "banners"这里面的是下面的声明的变量数组-->
                   <Banner :banners="banners"></Banner>
                   <!--父组件传递给子组件的方法 @select，然后子组件通过接收下 this.$emit('select')-->
                   <Personalized :personalized="personalized" :titles="'推荐歌单'" @select="fatherSelectItem" :type="'personalized'"></Personalized>
                   <!--最新专辑-->
                   <Personalized :personalized="albums" :titles="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>
                   <!--最新音乐-->
                   <NewSongs :songs="songs"></NewSongs>
               </div>
           </ScrollView>
       </div>
        <!--暴露二级路由,出口-->
        <transition>
            <router-view></router-view>
        </transition>

    </div>
</template>

<script>
import { getBanner, getNewAlbum, getNewSong, getPersonalized } from '../api/index'
import ScrollView from '../components/ScrollView'
// 导入banner
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
import NewSongs from '../components/Recommend/NewSongs'
export default {
    name: 'Recommend',
    // 注册下组件
    components: {
        Banner,
        Personalized,
        NewSongs,
        ScrollView,
    },
    data () {
        return {
            // 定义数据保存返回的baner数组,如何把数据传递给Banner组件呢，用观察者绑定
            banners: [],
            // 定义数据保存推荐歌单的网络请求的数据
            personalized: [],
            // 定义用来保存最新专辑的网络请求数据变量
            albums: [],
            // 同上
            songs: [],
        }
    },
    created () {
        // 得使用箭头函数,不然取不到this的值
        getBanner().then((data) => {
            this.banners = data.banners

        }).catch(function (error) {
            console.log(error)
        }),
        /*
        getBanner().then(function (data) {
            // console.log(data)
          this.banners = data.banners;
        }).catch(function (error) {
            console.log(error)
        })
       */
        getPersonalized().then((data) => {
            // console.log(data)
            this.personalized = data.result
        }).catch(function (error) {
            console.log(error)
        })
        // 最新专辑网络请求接口
        getNewAlbum().then((data) => {
            console.log(data)
            this.albums = data.albums
        }).catch(function (error) {
            console.log(error)
        })
        // 最新音乐网络请求接口
        getNewSong().then((data) => {
            console.log(data)
            // 整合数据
            let list = []
            data.result.forEach((value) => {
                let obj = {}
                obj.id = value.id
                obj.name = value.name
                obj.picUrl = value.song.album.picUrl
                let singer = ''
                for (let i = 0; i < value.song['artists'].length; i++) {
                    if (i === 0) {
                        singer = value.song['artists'][i].name
                    } else {
                        singer += '-' + value.song['artists'][i].name
                    }
                }
                obj.singer = singer
                list.push(obj)
            })
            this.songs = list
        }).catch(function (error) {
            console.log(error)
        })
    },
    methods: {
        // 先从父组件传递到子组件，子组件接收到传递参数过来
        fatherSelectItem (id, type) {
            // 跳转路由哦,通过js来设置路由地址
            // console.log('接收到子组件传递过来的 + 跳转路由哦' + id)
            this.$router.push({
                // 传递子组件那边传递过来的参数
                path: `/recommend/detail/${id}/${type}`
            })
        }
    }
}
</script>

<style scoped lang="scss">
    .recommend {
        // 固定,设置容器的宽度高度，就是可视区域的
        position: fixed;
        top: 184px;
        left: 0;
        right: 0;
        bottom: 0;
        .recommend-warpper {
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
    // 过度动画
    .v-enter{
        transform: translateX(100%);
    }
    .v-enter-to{
        transform: translateX(0%);
    }
    .v-enter-active{
        transition: transform 1s;
    }
    .v-leave{
        transform: translateX(0%);
    }
    .v-leave-to{
        transform: translateX(100%);
    }
    .v-leave-active{
        transition: transform 1s;
    }
</style>
