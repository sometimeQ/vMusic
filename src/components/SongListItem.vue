<template>
    <ul class="song-list">
        <!--循环数据-->
        <li v-for="value in songs" :key="value.id" class="item" @click="selectMusic(value.id)">
            <!--懒加载-->
            <img v-lazy="value.picUrl" alt="">
            <div>
                <h3>{{value.name}}</h3>
                <p>{{value.singer}}</p>
            </div>
        </li>
    </ul>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'SongListItem',
    props: {
        // 这个songs 要和另外一个界面传递过来的数据相吻合
        songs: {
            // 传递过来的是什么类型的数据
            type: [],
            default: () => [],
            require: true,
        }
    },
    methods: {
        // 映射方法简写, 这里的是actions.js里面的方法，vuex
        ...mapActions([
            // 将this.setFullScreen() 映射成为this.stroe.dispatch('setFullScreen')
            'setFullScreen',
            'setSongDetail',
        ]),
        // 提供给外界调用的方法
        selectMusic(id) {
            // 映射方法,控制播放界面是否显示
            this.setFullScreen(true)
            // 映射进入播放界面的的接口方法
            this.setSongDetail([id])
        }
    }
}
</script>

<style scoped lang="scss">
    // 引入样式
    @import "../assets/css/mixin";
    @import "../assets/css/variable";

    .song-list{
        width: 100%;
        .item{
            width: 100%;
            height: 150px;
            display: flex;
            justify-content: flex-start;
            padding: 0 20px;
            border-bottom: 1px solid #cccccc;
            align-items: center; // 居中显示
            img{
                width: 100px;
                height: 100px;
                border-radius: 20px;
                margin-right: 20px;
            }
            div{
                width: 100%;


                h3{
                    @include font_size($font_large);
                    @include font_color;
                    // 是否换行
                    @include no-wrap;
                }
                p{
                    @include font_color;
                    @include font_size($font_samll);
                    @include no-wrap;
                    opacity: 0.6;
                    margin-top: 20px;
                }
            }
        }
    }

</style>
