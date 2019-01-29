const webpackBaseConfig = require("./webpack.config.base.js")
const webpack = require("webpack")
const path = require("path")
const merge = require("webpack-merge")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = merge(webpackBaseConfig, {
    mode: "development",
    devtool: "eval-source-map",
    entry: {
        "test": "./example/test.js"
    },
    output: {
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            name: "index",
            filename: "index.html",
            template: "./example/index.template.html",
            inject: true,
            title: "Hello World",
            chunks:"test"
        }),
    ],
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: "/public/index.html" },
            ],
        },
        contentBase: path.resolve(__dirname, "../dist"),
        host: "0.0.0.0",
        port: 8080,
        hot: true
    }
})