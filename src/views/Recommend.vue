<template>
    <div class="recommend">
       <div class="recommend-warpper">
           <!--用iscrollview包裹下-->
           <ScrollView>
               <div>
                   <!--:banners是传递给子组件的参数,  "banners"这里面的是下面的声明的变量数组-->
                   <Banner :banners="banners"></Banner>
                   <personalized :personalized="personalized" :titles="'推荐歌单'"></personalized>
                   <!--复用上面的组件,共用接收的数据 personalized-->
                   <personalized :personalized="albums" :titles="'最新专辑'"></personalized>
               </div>
           </ScrollView>
       </div>
    </div>
</template>

<script>
import { getBanner, getNewAlbum, getPersonalized } from '../api/index'
import ScrollView from '../components/ScrollView'
// 导入banner
import Banner from '../components/Recommend/Banner'
import Personalized from '../components/Recommend/Personalized'
export default {
    name: 'Recommend',
    // 注册下组件
    components: {
        Banner,
        Personalized,
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
            // console.log(data)
            this.albums = data.albums
        }).catch(function (error) {
            console.log(error)
        })
    }
}
</script>

<style scoped lang="scss">
    .recommend {
        // 固定
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
</style>
