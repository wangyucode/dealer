const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { DefinePlugin } = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = (env) => {
    console.log("env", env);
    return {
        mode: env.prod ? 'production' : 'development',
        entry: {
            app: "./src/app.module.ts",
            undercover: "./src/undercover/undercover.module.ts",
            play: "./src/play/play.module.ts",
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
                template: './src/index.ejs',
                base: env.prod ? '/dealer/' : '/',
                templateParameters: {
                    'bootstrap_css': 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css',
                    'angular': env.prod ? 'https://cdn.jsdelivr.net/npm/angular@1.8.2/angular.min.js' : 'https://cdn.jsdelivr.net/npm/angular@1.8.2/angular.js',
                    'angular_route': env.prod ? 'https://cdn.jsdelivr.net/npm/angular-route@1.8.2/angular-route.min.js' : 'https://cdn.jsdelivr.net/npm/angular-route@1.8.2/angular-route.js',
                    'jquery_slim': env.prod ? 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.min.js' : 'https://cdn.jsdelivr.net/npm/jquery@3.5.1/dist/jquery.slim.js',
                    'bootstrap_js': env.prod ? 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js' : 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.js'
                },
                minify: {
                    collapseWhitespace: true,
                    removeComments: true,
                    removeRedundantAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true,
                    useShortDoctype: true,
                    minifyCSS: true
                }
            }),
            new DefinePlugin({
                //SERVER_URL: env.prod ? JSON.stringify("https://wycode.cn/web/api/public") : JSON.stringify("http://localhost:8080/web/api/public")
                SERVER_URL: JSON.stringify("https://wycode.cn/web/api/public")
            })
        ],
        optimization: {
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                        mangle: false
                    }
                }),
            ],
        },
        externals: {
            angular: 'angular'
        }
    };
};
