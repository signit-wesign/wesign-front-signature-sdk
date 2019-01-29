const path = require("path")
const webpack = require("webpack")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = {
    context: path.resolve(__dirname, "../"),
    entry: {
        "wesign-signature-sdk": "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "/public/",
        filename: "[name].js",
        chunkFilename: "[name].chunk.js",
        library: "WesignSignatureSDK",
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader?cacheDirectory=true",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader"
                }, {
                    loader: "postcss-loader"
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                }, {
                    loader: "css-loader" // 编译CSS到CommonJS
                }, {
                    loader: "postcss-loader" // 编译CSS
                }, {
                    loader: "sass-loader" // 编译SCSS到CSS
                }]
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || "development")
            }
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "css/[name].[chunkhash:6].[contenthash:6].css",
            chunkFilename: "css/[id].[chunkhash:6].[contenthash:6].css"
        })
    ]
}