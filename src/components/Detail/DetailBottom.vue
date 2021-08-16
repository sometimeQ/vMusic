<template>
    <ul class="detail-bottom">
        <li class="bottom-top" @click.stop="selectAllMusic">
            <div class="bottom-icon"></div>
            <div class="bottom-title">播放全部</div>
        </li>
        <li v-for="value in playlist" :key="value.id" class="item" @click="selectMusic(value.id)">
            <h3>{{value.name}}</h3>
            <p>{{value.al.name}} - {{value.ar[0].name}}</p>
        </li>
    </ul>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: 'DetailBottom',
    props: {
        playlist: {
            type: Array,
            default: () => [],
            require: true,
        }
    },
    methods: {
        ...mapActions([
            'setFullScreen',
            'setSongDetail',
        ]),
        selectMusic (id) {
            this.setFullScreen(true)
            // 点击进入播放界面调取的接口方法
            this.setSongDetail([id])
        },
        // 点击播放全部的音乐
        selectAllMusic () {
            // 展示播放界面
            this.setFullScreen(true)
            // 遍历数组
            let ids = this.playlist.map(function (item) {
                return item.id
            })
            // 传入请求数组的id
            this.setSongDetail(ids)
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .detail-bottom{
        width: 100%;
        li{
            width: 100%;
            height: 120px;
            padding: 20px;
            box-sizing: border-box;
            @include bg_sub_color;
            border-bottom: 1px solid #cccccc;
        }
        .bottom-top{
            display: flex;
            align-items: center;
            border-top-left-radius: 50px;
            border-top-right-radius: 50px;
            .bottom-icon{
                width: 60px;
                height: 60px;
                @include bg_img('../../assets/images/small_play');
                margin-right: 20px;
            }
            .bottom-title{
                @include font_color;
                @include font_size($font_large);
            }
        }
        .item{
            h3{
                @include font_size($font_medium);
                @include font_color;
                @include no-wrap;
            }
            p{
                @include font_color;
                @include font_size($font_samll);
                @include no-wrap;
                margin-top: 10px;
                opacity: 0.8;
            }
        }
    }

</style>
