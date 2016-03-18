'use strict';
var path = require("path"),
    webpack = require('webpack');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    minChunks: 2
});

module.exports = {
    context: __dirname + "/app/static/js/",
    resolve: {
        extensions: ['', '.js']
    },
    resolveLoader: {
        modulesDirectories: [
            __dirname + '/node_modules'
        ]
    },
    entry: {

            landing: ['./landing.js']
    },
    output: {
        path: path.join(__dirname, "app", "dist", "js"),
        filename: "[name].js",
        chunkFilename: "[id].chunk.js"
    },
    module: {
        loaders: [{
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'react', 'stage-0']
                }
            }

        ]
    },
    plugins: [commonsPlugin]
}
