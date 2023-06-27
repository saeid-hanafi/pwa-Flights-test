// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;

const performanceConfig = {
	hints:"warning",
	maxEntrypointSize:500000,
	maxAssetSize:1000000
};


const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    output: {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].bundle.js",
        path: path.resolve(__dirname, "dist")
      },
    plugins: [
        new webpack.ids.HashedModuleIdsPlugin({
            context: __dirname,
            hashFunction: 'sha256',
            hashDigest: 'hex',
            hashDigestLength: 20,
        }),
        new HtmlWebpackPlugin({
            template: 'index.html',
            minify: { collapseWhitespace: true, removeComments: true },
            inject: true
        }),
        new WorkboxWebpackPlugin.InjectManifest({
          swSrc:"./src-sw.js",
          swDest:"sw.js"
        }),
        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        performance = performanceConfig;
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
    } else {
        config.mode = 'development';
        performance = {};
    }
    return config;
};
