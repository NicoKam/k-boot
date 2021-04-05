const { resolve, join } = require('path');
const Config = require('webpack-chain');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const modifyVars = require('./modifyVars');

const config = new Config();

const DEV_MODE = true;

const rootPath = resolve(__dirname, '..');

config
  // 入口
  .entry('main')
  // .add('react-hot-loader/patch')
  .add(resolve(rootPath, 'src/index'));
// 输出
config.output.path(resolve(rootPath, 'dist')).filename('[name].bundle.js').publicPath('/');

config.node.set('__dirname', true);

// devServer
config.devServer
  .contentBase(resolve(rootPath, 'public'))
  .disableHostCheck(true)
  .historyApiFallback(true)
  .compress(true)
  .hot(true)
  .hotOnly(true)
  .port(8080)
  .host('0.0.0.0');

config.externals({
  'mapbox-gl': 'mapboxgl',
});

// resolve
// config.resolve.set('fallback', {
//   stream: require.resolve('stream-browserify'),
//   path: require.resolve('path-browserify'),
// });
config.resolve.alias.set('@', join(rootPath, 'src'));
config.resolve.modules.add(join(rootPath, 'node_modules')).add(join(rootPath, 'src'));
config.resolve.extensions.add('.js').add('.jsx').add('.ts').add('.tsx').add('.json');

// plugins
config.plugin('clean-plugin').use(CleanWebpackPlugin);
config.plugin('html-plugin').use(HtmlPlugin, [{ template: './src/index.html' }]);
config.plugin('copy-plugin').use(CopyWebpackPlugin, [
  {
    patterns: [
      {
        from: './public',
        to: './',
      },
    ],
  },
]);
config.plugin('hot-plugin').use(webpack.HotModuleReplacementPlugin);
config.plugin('fast-refresh').use(ReactRefreshWebpackPlugin);

// js/ts loader
config.module
  .rule('js')
  .test(/\.([jt]sx?)$/)

  // .include.add(resolve(rootPath, 'src'))
  // .end()

  .exclude.add(/node_modules/)
  .end()

  .oneOf('raw')
  .resourceQuery(/src/)
  .use('raw-loader')
  .loader('raw-loader')
  .end()
  .end()

  .oneOf('babel-loader')
  .use('babel-loader')
  .loader('babel-loader')
  .options({
    presets: [
      ['@babel/preset-env', { modules: false }],
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['react-refresh/babel'],
      // ['react-hot-loader/babel'],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'es',
          style: true, // `style: true` 会加载 less 文件
        },
      ],
    ],
  });

// css loader
config.module
  .rule('css')
  .test(/\.css$/)
  .use('style-loader')
  .loader('style-loader')
  .end()

  .use('css-loader')
  .loader('css-loader')
  .options({
    sourceMap: DEV_MODE,
  });

// less loader
config.module
  .rule('less')
  .test(/\.less$/)

  .oneOf('raw')
  .resourceQuery(/src/)
  .use('raw-loader')
  .loader('raw-loader')
  .end()
  .end()

  // with css-modules
  .oneOf('css-modules')
  .test(/\.module\.less$/)
  .use('style-loader')
  .loader('style-loader')
  .end()

  .use('css-loader')
  .loader('css-loader')
  .options({
    sourceMap: DEV_MODE,
    modules: {
      localIdentName: '[name]-[local]-[hash:base64:5]',
    },
  })
  .end()

  .use('less-loader')
  .loader('less-loader')
  .options({
    lessOptions: {
      javascriptEnabled: true,
      sourceMap: DEV_MODE,
      modifyVars,
    },
  })
  .end()
  .end()

  // without css-modules
  .oneOf('less')
  .use('style-loader')
  .loader('style-loader')
  .end()

  .use('css-loader')
  .loader('css-loader')
  .options({ sourceMap: DEV_MODE })
  .end()

  .use('less-loader')
  .loader('less-loader')
  .options({
    lessOptions: {
      javascriptEnabled: true,
      sourceMap: DEV_MODE,
      modifyVars,
    },
  });

// image loader
config.module
  .rule('image')
  .test(/\.(jpe?g|png|gif|svg)$/i)
  .exclude.add(/node_modules/)
  .end()
  .use('url-loader')
  .loader('url-loader')
  .options({
    limit: 8192,
  });

module.exports = config;
