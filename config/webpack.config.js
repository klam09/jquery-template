const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const paths = require('./paths');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const InterpolateHtmlPlugin = require('interpolate-html-plugin');

process.env.APP_ENV = process.env.APP_ENV || 'prod';

if (!fs.existsSync(`${paths.env}/${process.env.APP_ENV}.config.json`)) {
    throw new Error(
        `Cannot find ${paths.env}/${process.env.APP_ENV}.config.json`
    );
}

module.exports = (env, argv) => {
    const isDevServer = /webpack-dev-server/.test(argv['$0']);
    const isEnvProduction = env.NODE_ENV === 'production';
    const shouldDropConsole = env.DROP_CONSOLE || false;

    const alias = {};
    Object.keys(paths).map((key) => {
        alias[`@${key}`] = paths[key];
    });

    const entries = Object.assign(
        {
            shared: [path.resolve(paths.styles, 'main.scss')],
            index: [
                path.resolve(paths.src, 'index.js'),
                path.resolve(paths.src, 'index.scss')
            ]
        },
        isEnvProduction
            ? {}
            : {
                devtool: [
                    path.resolve(paths.devtools, 'devtool.js'),
                    path.resolve(paths.devtools, 'devtool.scss'),
                ]
            }
    );

    const pages = fs.readdirSync(paths.pages, 'utf8')
        .filter(page => page.charAt(0) !== '.')
        .map(page => ({
            name: page,
            filepath: `./pages/${page}`
        }));
    pages.push({
        name: 'index',
        filepath: './'
    });

    const htmlPlugins = pages.map(({ name, filepath }) => {
        const chunks = ['shared', name];

        if (!isEnvProduction) chunks.push('devtool');

        entries[name] = [
            `${filepath}/${name}.scss`,
            `${filepath}/${name}.js`
        ];

        return new HtmlPlugin({
            template: path.resolve(paths.src, `${filepath}/${name}.pug`),
            filename: `${name}.html`,
            xhtml: true,
            chunks: chunks
        });
    });

    return {
        context: paths.src,
        devServer: {
            contentBase: paths.build,
            disableHostCheck: true,
            headers: {
                'Access-Control-Allow-Origin': '*'
            },
            host: '0.0.0.0',
            hot: true,
            port: 8080,
            publicPath: '/',
            watchContentBase: true,
        },
        entry: entries,
        module: {
            rules: [{
                test: /\.js$/,
                exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
                use: {
                    loader: 'babel-loader',
                }
            }, {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            sourceMap: !isEnvProduction
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: () => [
                                require('postcss-flexbugs-fixes'),
                                require('postcss-preset-env')({
                                    autoprefixer: {
                                        flexbox: 'no-2009',
                                        cascade: false
                                    },
                                    stage: 3,
                                }),
                            ],
                            sourceMap: !isEnvProduction
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isEnvProduction
                        }
                    }
                ]
            }, {
                test: /\.pug$/,
                use: [
                    'html-loader',
                    {
                        loader: 'pug-html-loader',
                        options: {
                            basedir: paths.src,
                            data: {}
                        }
                    }
                ]
            }, {
                test: /\.json$/,
                type: 'javascript/auto',
                use: {
                    loader: 'json-loader'
                }
            }, {
                test: /\.(otf|ttf|woff2)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'fonts/',
                        publicPath: '/fonts/',
                        name: '[name].[ext]'
                    }
                }
            }, {
                test: /\.(gif|jpe?g|png|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'images/',
                        publicPath: '/images/',
                        name: '[name].[ext]'
                    }
                }
            }, {
                test: /\.(wav|mp3|ogg|m4a)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        outputPath: 'sounds/',
                        publicPath: '/sounds/',
                        name: '[name].[ext]'
                    }
                }
            }, {
                test: /\.html$/,
                use: 'html-loader'
            }]
        },
        node: {
            fs: 'empty'
        },
        optimization: {
            runtimeChunk: {
                name: 'shared'
            },
            minimize: isEnvProduction,
            minimizer: [
                new TerserPlugin({
                    terserOptions: {
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            warnings: false,
                            comparisons: false,
                            inline: 2,
                            drop_console: shouldDropConsole // or pure_funcs: ['console.log', 'console.info']
                        },
                        mangle: {
                            safari10: true,
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                    parallel: true,
                    cache: true,
                    sourceMap: !isEnvProduction,
                }),
                new OptimizeCssAssetsPlugin({
                    cssProcessorOptions: {
                        parser: safePostCssParser,
                        reduceTransforms: false,
                        reduceIdents: false
                    }
                })
            ]
        },
        output: {
            path: paths.build,
            filename: `./js/[name]${isEnvProduction ? '.min' : ''}.js`,
        },
        performance: {
            hints: isEnvProduction ? false : 'warning'
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: `./css/[name]${isEnvProduction ? '.min' : ''}.css`,
            }),
            new webpack.DefinePlugin({
                isEnvProduction: JSON.stringify(isEnvProduction)
            }),
            // new CleanWebpackPlugin(),
            new CopyPlugin([
                {
                    from: paths.static,
                    to: paths.build,
                    toType: 'dir'
                },
            ]),
            !isEnvProduction && new webpack.HotModuleReplacementPlugin(),
            !isEnvProduction && new webpack.SourceMapDevToolPlugin(),
            // isEnvDevelopment && new CaseSensitivePathsPlugin(),
            // new InterpolateHtmlPlugin(envConfigObj.envConfig.APPCONFIG),
            ...htmlPlugins,
        ].filter(Boolean),
        resolve: {
            extensions: ['.js', '.json', '.scss'],
            alias: alias
        }
    };
};
