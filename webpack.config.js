const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const postcss = require("postcss");
const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

const inProduction = (process.argv || []).some(arg => ["-p", "--optimize-minimize", "--optimize-occurence-order"].indexOf(arg) !== -1);

const baseConfig = {
    target: "web",
    context: path.join(__dirname, "src"),

    entry: {
        vendors: ["babel-polyfill", "react", "axios"]
    },

    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "/dist/",
        filename: "[name].js"
    },

    module: {
        noParse: ["node_modules"],

        loaders: [
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap")
            },

            {
                test: /\.less$/,
                loader: "less?sourceMap"
            },

            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "url-loader?name=[name].[hash].[ext]&limit=10000"
            },

            {
                test: /\.woff2?$/,
                loader: "url-loader?prefix=font/&limit=5000&mimetype=application/font-woff"
            },

            {
                test: /\.eot/,
                loader: "url-loader"
            }
        ],
    },

    resolve: {
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: [ "node_modules", __dirname ],
        root: [__dirname],
        alias: {
            "ui": "retail-ui/components"
        }
    },

    postcss: function (webpack) {
        return [
            postcssImport({addDependencyTo: webpack}),
            autoprefixer({browsers: ["last 2 versions"]}),
        ];
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors", "manifest"],
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css", { allChunks: true })
    ],
};

const devConfig = {
    cache: true,
    debug: true,
    devtool: "#inline-source-map",
    entry: {
        index: [
            "webpack/hot/only-dev-server",
            "./index.js",
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src"),
                    /retail-ui/
                ],
                loaders: ["react-hot", "babel"],
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new WebpackNotifierPlugin({
            title: "Webpack"
        })
    ],
};

const productionConfig = {
    cache: false,
    debug: false,
    devtool: null,
    entry: {
        index: [
            "./index.js",
        ]
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",
            },
        ],
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(true),
        new webpack.optimize.UglifyJsPlugin({
            output: {
                comments: false
            },
            compress: {
                warnings: false,
                drop_debugger: true,
                dead_code: true,
                unused: true
            }
        }),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify("production")
        })
    ]
};

module.exports = merge({}, baseConfig, inProduction ? productionConfig : devConfig);
