import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function imageLoader(config: Config, options: IOptions) {
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
}
