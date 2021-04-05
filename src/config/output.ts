import { resolve } from 'path';
import Config from 'webpack-chain';
import { IOptions } from './def';
export default function output(config: Config, options: IOptions) {
  const { rootPath } = options;
  config.output.path(resolve(rootPath, 'dist')).filename('[name].bundle.js').publicPath('/');
}
