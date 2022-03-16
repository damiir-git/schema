const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['./src/index.tsx'],
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] }
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: ["ts-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            'react-dom': '@hot-loader/react-dom'
        }
    },
    output: {
        path: path.resolve(__dirname, "/dist"),
        filename: "bundle.min.js"
    },
    devServer: {
        port: 3000,
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
};