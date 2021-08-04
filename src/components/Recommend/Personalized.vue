<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{titles}}</h3>
        </div>
        <div class="personalized-list">
            <!--点击事件, 监听按钮的点击-->
            <div class="item" v-for="value in personalized" :key="value.id" @click="selectItem(value.id)">
                    <!--图片懒加载  Vue warn]: Failed to resolve directive: lazy-->
                    <img v-lazy="value.picUrl" alt="">
                    <p>{{value.name}}</p>
            </div>
         </div>
    </div>
</template>

<script>
export default {
    name: 'Personalized',
    // 接收从Recommend.vue传递过来的数组数据
    props: {
        // 这里接收组件传递过来的key，保持一致
        personalized: {
            type: [],
            default: () => [],
            require: true,
        },
        // 这个是上面传入的值，这里也必须写明接收 {{titles}}
        titles: {
            type: String, // 字符串类型的
            default: '',
            require: true,
        },
        // 接收最新专辑传递过来的数据
        albums: {
            type: Array,
            default: () => [],
            require: true,
        },
        type: {
            type: String,
            default: '',
            required: true
        }
    },
    // 自定义的方法
    methods: {
        selectItem (id) {
            // console.log(id)
            // console.log(this.type)
            /**
             * 1、父组件可以使用 props 把数据传给子组件。
               2、子组件可以使用 $emit 触发父组件的自定义事件。
               vm.$emit( event, arg ) //触发当前实例上的事件
               vm.$on( event, fn );//监听event事件后运行 fn；
             * **/
            this.$emit('select', id, this.type)
        }
    }
}
</script>

<style scoped lang="scss">
@import "../../assets/css/mixin";
@import "../../assets/css/variable";

    .personalized{
        //margin-top:x
        @include bg_sub_color();
        .personalized-top{
            width: 100%;
            height: 84px;
            line-height: 84px;
            @include bg_sub_color;
            border-bottom: 1px solid #cccccc;
            padding: 0 20px;
            h3{
                line-height: 84px;
                font-weight: bold;
                @include font_size($font_large);
                @include font_color;
            }
        }
        .personalized-list{
            width: 100%;
            display: flex;
            // 两侧边距中间等间对齐
            justify-content: space-around;
            flex-wrap: wrap;
            .item{
                width: 200px;
                padding: 20px 0;
                img{
                    width: 200px;
                    height: 200px;
                    border-radius: 20px;
                }
                p{
                    @include clamp(2);
                    @include font_size($font_medium_s);
                    @include font_color;
                    text-align: center;
                    margin-top: 10px;
                }
            }
        }
    }
</style>
