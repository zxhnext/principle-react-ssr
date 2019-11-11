module.exports = {
    // 配置一些规则
    module: {
        rules: [{
            // 检测文件类型
            test: /\.js?$/,
            loader: 'babel-loader',
            // 如果是在node_modules里面 我们不需要编译
            exclude: '/node_modules/'
        }]
    }
}
  