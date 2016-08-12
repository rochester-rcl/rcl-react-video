var webpack = require('webpack');
var path = require('path');
var ROOT_PATH = path.resolve(__dirname);


module.exports = {
    entry: path.resolve(ROOT_PATH, 'example/index'),
    output: {
        path: path.resolve(ROOT_PATH, 'example/static'),
        filename: 'bundle.js'
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loaders: ['babel'],
            }
        ],
        noParse: [
            /node_modules[\\/]video\.js/
        ],
    },
};
