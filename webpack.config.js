const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        app: "./src/app.module.ts",
        undercover: "./src/undercover/undercover.module.ts",
        play: "./src/play/play.module.ts",
        service: "./src/services.ts",
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        port: 9000
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader',
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from:"./core/**/*.html",
                    context: path.resolve(__dirname, 'src')
                },
                {
                    from:"./play/**/*.html",
                    context: path.resolve(__dirname, 'src')
                },
                {
                    from:"./undercover/**/*.html",
                    context: path.resolve(__dirname, 'src')
                }
            ]
        })
    ],
    externals: {
        angular: 'angular'
    }
};
