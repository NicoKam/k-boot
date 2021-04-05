import { resolve } from 'path';
import Config from 'webpack-chain';
import { IOptions } from './def';
export default function devServer(config: Config, options: IOptions) {
  const { rootPath } = options;
  config.devServer
    .contentBase(resolve(rootPath, 'public'))
    .disableHostCheck(true)
    .historyApiFallback(true)
    .compress(true)
    .hot(true)
    .hotOnly(true)
    .port(8080)
    .host('0.0.0.0');
}
