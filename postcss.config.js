module.exports = {
    plugins: {
        autoprefixer: {},
        // postcss-pxtorem是PostCSS的插件，用于将像素单元生成rem单位
        'postcss-pxtorem': {
            rootValue: 100, // 根元素字体大小
            // propList: ['width', 'height']
            propList: ['*']
        }
    }
}
