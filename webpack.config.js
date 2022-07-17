const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { DefinePlugin } = require('webpack');

module.exports = env => {
	if (env.type === undefined)
	{
		throw new Error("No environment type: " + env.toString());
	}

	let outputFolder = './build/' + env.type + '/';

	return {
		mode: 'development',
		devtool: 'inline-source-map',
		entry: './source/app.ts',
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/,
				},
			],
		},
		resolve: {
		extensions:
			['.tsx', '.ts', '.js'],
		},
		output: {
			filename: 'game.js',
			path: path.resolve(__dirname, outputFolder),
		},
		plugins: [
			new CopyPlugin({
				patterns: [
					{ 
						from: path.resolve(__dirname, './html/'),
						to: path.resolve(__dirname, outputFolder)
					},
					{
						from: path.resolve(__dirname, './build/assets/'),
						to: path.resolve(__dirname, outputFolder + 'assets')
					},
				],
			}),
			new DefinePlugin({
				DEV: "false",
				PROD: "false",
				[env.type.toUpperCase()]: "true",
				DEBUG_MODE: env.debugmode ? env.debugmode : "false"
			}),
		],
		devServer: {
			static: {
				directory: path.join(__dirname, outputFolder),
			},
			port: 8080,
			compress: true,
			hot: false,
			liveReload: true,
			client: {
				overlay: false,
				logging: 'none',
				progress: true,
			}
		}
	}
};