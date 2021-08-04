<template>
    <div class="song">
        <div class="song-top">
            <h3>最新歌单</h3>
        </div>
        <SongListItem :songs="songs"></SongListItem>
    </div>
</template>





<script>
import SongListItem from '../SongListItem'
export default {
    name: 'NewSongs',
    // 注册组件
    components: {
        SongListItem,
    },
    // 接收传递过来的数据
    props: {
        songs: {
            type: [],
            default: () => [],
            require: true,
        }
    }
}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";
    .song{
        width: 100%;
        .song-top{
            width: 100%;
            height: 84px;
            line-height: 84px;
            @include bg_sub_color();
            border-bottom: 1px solid #cccccc;
            padding: 0 20px;
            //文字
            h3{
                font-weight: bold;
                @include font_size($font_large);
                @include font_color;
            }
        }
    }
</style>
