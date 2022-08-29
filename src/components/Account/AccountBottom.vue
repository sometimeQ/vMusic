<template>
    <!--这个地方的我喜欢听的，我收藏的需要从本地历史记录里面取出来展示即可-->
    <div class="account-bottom">
        <div class="bottom-play" @click.stop="selectAllMusic" v-show="historyList.length > 0 || favoriteList.length > 0">
            <span></span>
            <span>播放全部</span>
        </div>
        <div class="bottom-wrapper">
            <ScrollView ref="scrollView">
                <SongListItem :songs="switchNum === 0 ? favoriteList : historyList"></SongListItem>
            </ScrollView>
        </div>
    </div>
</template>

<script>
import SongListItem from '../SongListItem'
import ScrollView from '../ScrollView'
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
    name: 'AccountBottom',
    components: {
        SongListItem,
        ScrollView,
    },
    props: {
        switchNum: {
            type: Number,
            default: 0,
            require: true,
        }
    },
    computed: {
        ...mapGetters([
            'favoriteList',
            'historyList',
        ])
    },
    methods: {
        ...mapActions([
            'setFullScreen',
            'setSongDetail',
            'setCurrentIndex'
        ]),
        // 局部的映射mapMutations
        ...mapMutations([
            'SET_SONG_DETAIL'
        ]),
        selectAllMusic () {
            // 切换加载
            if (this.switchNum === 0) {
                // 不用请求加入数组了，直接越过请求，提交mutations
                this.SET_SONG_DETAIL(this.favoriteList)
            } else if (this.switchNum === 1) {
                this.SET_SONG_DETAIL(this.historyList)
            }
            // 显示歌曲播放界面,以及重置索引，不然会被记录
            this.setFullScreen(true)
            this.setCurrentIndex(0)
        },
    },
    created () {
        // 获取本地的历史记录

    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .account-bottom{
        /*background: skyblue;*/
        // 固定下位置的显示
        position: fixed;
        top: 100px;
        left: 0;
        right: 0;
        bottom: 0;
        .bottom-play{
            width: 260px;
            height: 60px;
            margin: 20px auto; // 居中
            display: flex;
            justify-content: center;
            align-items: center;
            border: solid 1px #000000;
            @include bg_sub_color;
            border-radius: 30px;
            span{
                &:nth-of-type(1){
                    width: 46px;
                    height: 46px;
                    @include bg_img('../../assets/images/small_play');
                    margin-right: 20px;
                }
                &:nth-of-type(2){
                    @include font_size($font_medium_s);
                    @include font_color;
                }
            }
        }
        /*.bottom-wrapper{*/
        /*    // 固定下显示的位置*/
        /*    position: fixed;*/
        /*    top: 200px;*/
        /*    left: 0;*/
        /*    right: 0;*/
        /*    bottom: 0;*/
        /*    overflow: hidden;*/
        /*}*/
    }

</style>
