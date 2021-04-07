import { resolve, join } from 'path';
import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function output(config: Config, options: IOptions) {
  const { rootPath, publicPath } = options;
  config.output
    .path(join(resolve(rootPath, 'dist'), publicPath))
    .filename('[name].bundle.js')
    .publicPath(publicPath);
}
