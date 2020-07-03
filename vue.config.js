module.exports = {
    chainWebpack: config => {
        config.output.filename('js/[name].[contenthash:8].js?appid=123').chunkFilename('js/[name].[contenthash:8].js?appid=123');
    }
}