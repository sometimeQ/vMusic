<template>
    <div class="header">
        <div class="header-left" @click.stop="hiddenNormalPlayer"></div>
        <div class="center">
            <h3>{{currentSong.name}}</h3>
            <p>{{currentSong.singer}}</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>
// 导入全局的
import {mapActions, mapGetters} from 'vuex'
export default {
    name: 'PlayerHeader',
    methods: {
        // 映射方法
        ...mapActions([
            'setFullScreen',
            'setMiniPlayer'
        ]),
        hiddenNormalPlayer () {
            console.log('隐藏')
            // 通过简写方式来调用方法，属性等操作,出发内部方法
            this.setFullScreen(false)
            // 显示迷你播放器界面
            this.setMiniPlayer(true)
        }
    },
    computed: {
      ...mapGetters([
            'currentSong'
      ])
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";

    .header{
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: space-between;
        .header-left, .header-right{
            width: 84px;
            height: 84px;
        }
        .header-left{
            @include bg_img('../../assets/images/down')
        }
        .header-right{
            @include bg_img('../../assets/images/more')
        }
        .center{
            width: 60%;
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            text-align: center;
            color: #cccccc;
            @include font_size($font_medium);
            @include no-wrap;
        }
    }


</style>
