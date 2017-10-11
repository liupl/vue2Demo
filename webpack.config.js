const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const IS_ENV = require = process.env.NODE_ENV == 'prod';

let currentModule = {};

if (IS_ENV) {
    // 生产环境
    currentModule = {
        output: {
            path: __dirname + "/dist",
            filename: "bundle-[hash].js"
        },
        plugins: [
            new UglifyJSPlugin({
                // output: {
                //     comments: false
                // },
                // warnings: false
            }),
            // 清空文件夹
            new CleanWebpackPlugin(['dist'], {
                root: process.cwd(),
                exclude: []
            }),
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(false)
            })
        ]
    }
} else {
    currentModule = {
        output: {
            path: __dirname + "/build",
            filename: "bundle-[hash].js"
        },
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin(['build'], {
                root: process.cwd(),
                exclude: []
            }),
            new webpack.DefinePlugin({
                __DEV__: JSON.stringify(true)
            })
        ]
    }
}

module.exports = merge(currentModule, {
    entry: ['./src/main.js'], // 入口文件
    // output: {
    //     path: __dirname + "/build",
    //     filename: "bundle-[hash].js"
    // },
    // 调试提示
    // devtool: 'source-map',
    module: {
        rules: [{
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["es2015"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "autoprefixer-loader" }]
            },
            {
                test: /\.less$/,
                use: [{ loader: "style-loader" }, { loader: "css-loader" }, { loader: "autoprefixer-loader" }, { loader: "less-loader" }]
            },
            {
                test: /\.vue$/,
                use: [{ loader: "vue-loader" }]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    hash: 'sha512',
                    publicPath: '/',
                    name: 'assets/images/[hash].[ext]'
                }
            }
        ]
    },
    // 热更新
    devServer: {
        contentBase: __dirname, // 本地服务器所加载的页面所在的目录
        // historyApiFallBack: true,       // 不跳转
        inline: true, // 实时刷新
        port: 4413 // 监听端口
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: __dirname + "/index.html",
            filename: 'index.html'
        })
    ]
})