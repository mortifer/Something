const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const autoprefixer = require("autoprefixer");
const postcssImport = require("postcss-import");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const WebpackNotifierPlugin = require("webpack-notifier");

const nodeEnv = process.env.NODE_ENV || "development";
const inProduction = nodeEnv === "production" || (process.argv || []).some(arg => ["-p", "--optimize-minimize", "--optimize-occurence-order"].indexOf(arg) !== -1);

const baseConfig = {
    target: "web",
    context: path.join(__dirname, "src"),

    entry: {
        vendors: ["babel-polyfill", "react", "axios", "gsap", "jquery","popper.js", "underscore"]
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
                test: /\.jsx?$/,
                include: [
                    path.join(__dirname, "src"),
                    /retail-ui/
                ],
                loaders: ["react-hot", "babel"]
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
                loader: "url-loader?prefix=font/&limit=100&mimetype=application/font-woff"
            },

            {
                test: /\.eot/,
                loader: "url-loader"
            }
        ]
    },

    resolve: {
        extensions: ["", ".js", ".jsx"],
        modulesDirectories: ["node_modules", __dirname, "web_modules"],
        root: [__dirname],
        alias: {
            "ui": "retail-ui/components",
            "GSAPScrollToPlugin": "gsap/src/uncompressed/plugins/ScrollToPlugin"
        }
    },

    postcss: function (webpack) {
        return [
            postcssImport({addDependencyTo: webpack}),
            autoprefixer({browsers: ["last 2 versions"]})
        ];
    },

    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            _: "underscore"
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ["vendors"],
            minChunks: Infinity
        }),
        new ExtractTextPlugin("[name].css", { allChunks: true })
    ],
    noParse: /jquery\/jquery.js/
};

const devConfig = {
    cache: true,
    debug: true,
    devtool: "#inline-source-map",
    module: {
        loaders: [
            {
                test: /\.(css|less)$/,
                //exclude: [
                    //path.join(__dirname, "src")
                //],
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap")
            }//,
            //{
                //test: /\.(css|less)$/,
                //include: [ path.join(__dirname, "src") ],
                //loaders: ["style-loader", "css?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap"]
            //}
        ]
    },
    entry: {
        index: [
            "webpack-hot-middleware/client",
            "./index.js"
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new WebpackNotifierPlugin({ title: "Webpack" })
    ]
};

const productionConfig = {
    cache: false,
    debug: false,
    devtool: null,
    entry: {
        index: ["./index.js"]
    },
    module: {
        loaders: [
            {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css?sourceMap&localIdentName=[name]-[local]-[hash:base64:8]!postcss-loader?sourceMap")
            }
        ]
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
            "process.env": { NODE_ENV: JSON.stringify(nodeEnv) }
        })
    ]
};

module.exports = merge({}, baseConfig, inProduction ? productionConfig : devConfig);
