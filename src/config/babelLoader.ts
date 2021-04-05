import Config from 'webpack-chain';
import { IOptions } from './def';
export default function babelLoader(config: Config, options: IOptions) {
  const { rootPath } = options;

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
      presets: [['@babel/preset-env', { modules: false }], '@babel/preset-react', '@babel/preset-typescript'],
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
}
