<template>
    <Header>
        <div slot="left" class="header-left" @click="back"></div>
        <p slot="center" class="header-title">{{title}}</p>
        <div slot="right" class="header-right"></div>
    </Header>
</template>

<script>
import Header from '../Header'
export default {
    name: 'DetailHeader',
    components: {
        Header
    },
    props: {
        title: {
            type: String,
            default: '',
            require: true
        }
    },
    methods: {
        back () {
            window.history.back()
        }
    },

}
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    @import "../../assets/css/variable";

    .header{
        .header-left{
            @include bg_img('../../assets/images/back');
            width: 84px;
            height: 84px;
        }
        .header-right {
            @include bg_img('../../assets/images/more');
            width: 84px;
            height: 84px;
        }
        .header-title{
            margin-top: 8px;
            width: 60%;
            line-height: 84px;
            text-align: center;
            color: #cccccc;
            font-weight: bold;
            @include font_size($font_medium);
            @include no-wrap;
        }

    }
</style>
