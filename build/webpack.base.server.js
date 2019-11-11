const path = require('path')
const nodeExternals = require('webpack-node-externals')
const merge = require('webpack-merge');
const config = require('./webpack.base.config.js');
const clientConfig = {
    target: 'node',
    // webpack4 要区分 你打包的是线上环境还是测试环境 需要配置mode
    mode: 'development',
    entry: path.join(__dirname, '../server/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '../dist')
    },
    externals: [nodeExternals()], // 引入node_modules,但不会打包，会存在原来的地方
    module: {
        rules: [{
            test: /\.css?$/,
            use: [
                'isomorphic-style-loader', // 解决插入css时服务端不存在window问题
                { 
                    loader: 'css-loader',
                    options: {
                        url: true,
                        importLoaders: 1,
                        modules: true
                    }
                }
            ]
        }]
    }
}

module.exports = merge(config, clientConfig)