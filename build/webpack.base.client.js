const path = require('path')
const merge = require('webpack-merge');
const config = require('./webpack.base.config.js');

const clientConfig = {
    // webpack4 要区分 你打包的是线上环境还是测试环境 需要配置mode
    mode: 'development',
    entry: path.join(__dirname, '../client/index.js'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../public')
    },
    // 配置一些规则
    module: {
        rules: [{
			test: /\.css?$/,
			use: [
                'style-loader', 
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