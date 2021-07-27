<template>
    <div class="recommend">
       <div class="recommend-warpper">
           <!--用iscrollview包裹下-->
           <ScrollView>
               <div>
                   <!--:banners是传递给子组件的参数,  "banners"这里面的是下面的声明的变量数组-->
                   <Banner :banners="banners"></Banner>
               </div>
           </ScrollView>

       </div>
    </div>
</template>

<script>
import { getBanner} from '../api/index'
import ScrollView from '../components/ScrollView'
// 导入banner
import Banner from '../components/Recommend/Banner'
export default {
    name: 'Recommend',
    // 注册下组件
    components: {
        Banner,
        ScrollView,
    },
    data () {
        return {
            // 定义数据保存返回的baner数组,如何把数据传递给Banner组件呢，用观察者绑定
            banners: [],
        }
    },
    created () {
        // 得使用箭头函数,不然取不到this的值
        getBanner().then((data) => {
            this.banners = data.banners

        }).catch(function (error) {
            console.log(error)
        })
        /*
        getBanner().then(function (data) {
            // console.log(data)
          this.banners = data.banners;
        }).catch(function (error) {
            console.log(error)
        })
       */
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
            /*width: 100%;*/
            /*height: 100%;*/
            /*overflow: hidden;*/
        }
    }
</style>
