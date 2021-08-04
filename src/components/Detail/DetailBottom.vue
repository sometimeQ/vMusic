<template>
    <ul class="detail-bottom">
        <li class="bottom-top">
            <div class="bottom-icon"></div>
            <div class="bottom-title">播放全部</div>
        </li>
        <li v-for="value in playlist" :key="value.id" class="item">
            <h3>{{value.name}}</h3>
            <p>{{value.al.name}} - {{value.ar[0].name}}</p>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'DetailBottom',
    props: {
        playlist: {
            type: Array,
            default: () => [],
            require: true,
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
