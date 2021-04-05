import Config from 'webpack-chain';
import { IOptions } from './def';
export default function styleLoader(config: Config, options: IOptions) {
  const { rootPath, modifyVars = {} } = options;
  const DEV_MODE = process.env.NODE_ENV === 'development';

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
}
