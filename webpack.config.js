    const {resolve} = require('path');
    const {getIfUtils, removeEmpty} = require('webpack-config-utils');
    const webpack = require('webpack');
    const CleanWebpackPlugin = require('clean-webpack-plugin');
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    // const ExtractTextPlugin = require('extract-text-webpack-plugin');

    module.exports = (env={config: 'dev'}) => {
        const {ifProd, ifOpen} = getIfUtils(env, ['prod', 'open']);

        const OUT_DIR = resolve('./build');
        const config = {
            entry: removeEmpty({
                app: ['babel-polyfill', './app/main.js'],
            }),
            output: {
                path: OUT_DIR,
                filename: '[name]-bundle.js',
                sourceMapFilename: '[file].map',
            },
            devtool: 'source-map',
            resolve: {
                alias: {},
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        use: 'babel-loader',
                        exclude: /node_modules/,
                    },
                    {
                        test: /\.html$/,
                        loader: 'html-loader',
                    },
                    {
                        test: /\.png$/,
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png',
                        },
                    },
                    {
                        test: /\.svg$/,
                        loader: 'file-loader',
                    },
                    {
                        test: /\.css$/,
                        use: ['style-loader', 'css-loader'],
                    },
                    {
                        test: /\.scss$/,
                        use: [
                            'style-loader',
                            'css-loader',
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true,
                                    includePaths: [ resolve(__dirname, 'node_modules') ],
                                },
                            },
                        ],
                    },
                ],
            },
            plugins: removeEmpty([
                new webpack.ProvidePlugin({
                    $: 'jquery',
                    jQuery: 'jquery',
                    'window.jQuery': 'jquery',
                }),
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': JSON.stringify(ifProd('production', 'development')),
                }),
                new CleanWebpackPlugin([OUT_DIR]),
                new HtmlWebpackPlugin({
                    filename: 'index.html',
                    template: './app/index.ejs',
                }),
                new webpack.optimize.CommonsChunkPlugin({
                    name: 'node-static',
                    filename: 'node-static.js',
                    minChunks(module, count) {
                        const context = module.context;
                        return context && context.indexOf('node_modules') >= 0;
                    },
                }),
                new BundleAnalyzerPlugin({
                    analyzerMode: 'static',
                    openAnalyzer: ifOpen(),
                }),
            ]),
            // stats control what's displayed to the console when webpack runs - https://webpack.js.org/configuration/stats/
            // stats: 'minimal',
        };

        return config;
    };
