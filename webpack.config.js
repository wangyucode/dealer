const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {DefinePlugin} = require('webpack');

module.exports = (env) => {
    console.log("env", env);
    return {
        mode: env.prod ? 'production' : 'development',
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
                    test: /(?<!index|index-async)\.html$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "[path][name].[ext]",
                                publicPath: "./",
                                context: 'src'
                            },
                        },
                        {
                            loader: "extract-loader",
                            options: {
                                publicPath: "./",
                            }
                        },
                        {
                            loader: "html-loader",
                        },
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
                template: './src/index.html',
                base: env.prod ? '/dealer/' : '/',
            }),
            new DefinePlugin({
                SERVER_URL: env.prod ? JSON.stringify("https://wycode.cn/web/api/public") : JSON.stringify("http://localhost:8080/web/api/public")
            })
        ],
        externals: {
            angular: 'angular'
        }
    };
};
