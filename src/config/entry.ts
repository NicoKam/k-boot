import { resolve } from 'path';
import Config from 'webpack-chain';
import { IOptions } from './def';
export default function entry(config: Config, options: IOptions) {
  const { rootPath } = options;
  config
    // 入口
    .entry('main')
    // .add('react-hot-loader/patch')
    .add(resolve(rootPath, 'src/index'));
}
