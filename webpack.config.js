const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
},
module: {
    rules: [
    {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
        loader: 'babel-loader',
        options: {
        presets: ['@babel/preset-env']
        }
}
    },
    {
    test: /\.css$/,
    loader: [
        MiniCssExtractPlugin.loader,
        {
        loader: 'css-loader',
        options: {
        importLoaders: 1
            }
        },
        'postcss-loader'
        ],
    },
    {
        test: /\.html$/,
        loader: 'html-loader',
    },
    {
        test: /\.(png|svg|jpg|gif|woff|woff2)$/,
        loader: 'file-loader',
    },
]
},
plugins: [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new MiniCssExtractPlugin()
    ],
    devServer: {
        host: '127.0.0.1',
        port: 8080,
        disableHostCheck: true,
    },
};