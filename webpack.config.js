const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports =({development}) => ({
    mode: development ? 'development' : 'production',
    entry: './src/index.ts',
    output: {
        filename: "index.js",
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        clean: true
    },
    resolve: {
        extensions: ['.ts', '.tsx']
    },
    externals: {
        react: 'react'
    },
    module: {
        rules: [
            {
                test: /\.scss/,
                use: ['style-loader', 'scss-loader'],
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [new ESLintPlugin({extensions: ['ts', 'tsx']})],
});
