<template>
    <div class="header">
        <div class="header-left"></div>
        <div class="center">
            <h3>xxxxx</h3>
            <p>1111</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>

export default {
    name: 'PlayerHeader',
    components: {

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
