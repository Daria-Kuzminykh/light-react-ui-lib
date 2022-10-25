const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const miniCss = require('mini-css-extract-plugin')

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
        extensions: ['.ts', '.tsx'],
        modules: [path.join(__dirname, './src'), 'node_modules'],
        alias: {
            '@src': path.resolve(__dirname, 'src'),
         },
    },
    externals: {
        react: 'react'
    },
    module: {
        rules: [
            {
                test:/.(s*)css$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(ts|tsx)?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            }
        ],
    },
    plugins: [
        new ESLintPlugin({extensions: ['ts', 'tsx']}),
        new miniCss({
			filename: 'style.css',
		}),
    ],
});
