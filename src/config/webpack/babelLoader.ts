import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function babelLoader(config: Config, options: IOptions) {
  const { mode } = options;
  function ifDev<T>(t: T, f: T) {
    if (mode === 'development') return t;
    return f;
  }

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
        ...ifDev([['react-refresh/babel']], []),
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
