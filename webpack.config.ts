import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import * as path from 'path';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';


const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getFileName = (ext: string) => isProd ? `bundle.[contenthash].${ext}` : `bundle.${ext}`;


const getPlugins = function (isDev: boolean) {
  const plugins = [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),

    new CopyPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'assets'),
          to: './assets',
        },
      ],
    }),

    new MiniCssExtractPlugin({
      filename: getFileName("css"),
    }),
  ];

  if (isDev) plugins.push(new ESLintWebpackPlugin({ extensions: ["ts", "js"] }));

  return plugins;
};


function jsLoaders() {
  const loaders: any[] = [
    {
      loader: "babel-loader",
      options: {
        presets: ['@babel/preset-env'],
      },
    },
  ];

  if (isDev) {
    loaders[1] = "@babel/eslint-parser";
  }
  return loaders;
}


const config: Configuration & Record<string, any> = {
  mode: isProd ? "development" : "development",

  entry: ["@babel/polyfill", "./src/main.ts"],

  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {

    },
  },

  output: {
    filename: getFileName("js"),
    path: path.resolve(__dirname, 'dist'),
  },

  devtool: isDev ? 'source-map' : false,

  devServer: {
    port: 3000,
    hot: isDev,
    compress: true,
    open: true,
  },

  plugins: getPlugins(isDev),

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        include: [path.resolve(__dirname, "src")],
        options: isProd ? {
          configFile: 'tsconfig.prod.json',
        } : "",
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        type: 'asset/resource',
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: 'asset/resource',
      },
      {
        test: /\.xml$/,
        type: 'asset/resource',
      },
      {
        test: /\.csv$/,
        type: 'asset/resource',
      },
    ],
  },
};

export default config;
