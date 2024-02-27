const path = require('path')

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CopyPlugin = require("copy-webpack-plugin");

const js = {
    main: './src/js/main.js'
}
const scss = {
    app: './src/styles/app.scss'
}

const config = {
    // mode: 'development',
    mode: 'production',

    target: 'web',
    context: path.resolve(__dirname, 'src'),

    entry: {
        ...js,
        ...scss
    },

    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
        clean: true
    },

    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
          },
        host: "localhost",
        compress: true,
        port: 8000,
    },

    watchOptions: {
        aggregateTimeout: 200,
        ignored: /node_modules/,
        poll: 1000,
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'style-loader',

                    "css-loader",
                    {
                        loader: "sass-loader",
                        options: {
                            implementation: require.resolve("node-sass"),
                        },
                    },
                ],
            },
        ]
    },

    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'public', to: './' }
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].css'
        }),
        new RemoveEmptyScriptsPlugin()
    ]
}

module.exports = config;