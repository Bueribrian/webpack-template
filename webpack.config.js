const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostCssPreset = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const scripts = ['main', 'about', 'admin'];

const pages = [
	{
		name: 'index',
		chunks: [scripts[0]]
	},
	{
		name: 'about',
		chunks: [scripts[0], scripts[1]]
	},
	{
		name: 'admin',
		chunks: [scripts[0], scripts[2]]
	}
];

function generateMultipleJs(scriptsArray) {
	if(scriptsArray !== undefined && scriptsArray.length !== 0){
		let scriptsArrayObj = {};
		scriptsArray.forEach(script => {
			scriptsArrayObj[script] = `./src/js/${script}.js`;
		});
		return scriptsArrayObj;
	}
	return {main:'./src/js/main.js'}
}

function generateMultipleHtml(pages) {
	if (pages !== undefined && pages.length !== 0) {
		let htmlArray = pages.map(page => {
			return new HtmlWebpackPlugin({
				filename: `${page.name}.html`,
				template: `./src/${page.name}.html`,
				chunks: page.chunks
			});
		});
		return htmlArray;
	}
	return [new HtmlWebpackPlugin({ template: './src/index.html' })];
}

let devConfig = {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	// entry: './src/js/main.js',
	entry: {
		...generateMultipleJs(scripts)
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/[name].bundle_[chunkhash].js',
		chunkFilename: '[id].bundle_[chunkhash].js',
		sourceMapFilename: '[file].map'
	},
	plugins: [
		new webpack.ProgressPlugin(),
		new PostCssPreset({ browsers: 'last 2 versions' }),
		// new HtmlWebpackPlugin({ template: './src/index.html' }),
		...generateMultipleHtml(pages),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(ttf|otf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							publicPath: 'fonts/',
							outputPath: 'fonts/',
							esModule: false
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							publicPath: 'images/',
							outputPath: 'images/',
							esModule: false
						}
					}
				]
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /[\\/]node_modules[\\/]/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

let prodConfig = {
	mode: 'production',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist'
	},
	entry:{
		...generateMultipleJs(scripts)
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: './js/[name].bundle_[chunkhash].js',
		chunkFilename: '[id].bundle_[chunkhash].js',
		sourceMapFilename: '[file].map'
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: './css/main_prod.[contenthash].css'
		}),
		new PostCssPreset({ browsers: 'last 2 versions' }),
		new webpack.ProgressPlugin(),
		...generateMultipleHtml(pages),
		new CleanWebpackPlugin()
	],
	module: {
		rules: [
			{
				test: /\.(ttf|otf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'fonts/[name].[ext]',
							esModule: false
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]',
							esModule: false
						}
					}
				]
			},
			{
				test: /\.(scss|css)$/,
				use: [{loader:MiniCssExtractPlugin.loader, options:{
					publicPath: '../'
				}}, 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{
				test: /\.(js|jsx)$/,
				exclude: /[\\/]node_modules[\\/]/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};

module.exports = (env, options) => {
	if (options.mode === 'development') {
		return devConfig;
	} else if (options.mode === 'production') {
		return prodConfig;
	} else {
		return devConfig;
	}
};
