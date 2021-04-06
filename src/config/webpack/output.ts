import { resolve } from 'path';
import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function output(config: Config, options: IOptions) {
  const { rootPath } = options;
  config.output.path(resolve(rootPath, 'dist')).filename('[name].bundle.js')
    .publicPath('/');
}
