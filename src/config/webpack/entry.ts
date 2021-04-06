import { resolve } from 'path';
import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function entry(config: Config, options: IOptions) {
  const { rootPath, srcPath } = options;
  config
    // 入口
    .entry('main')
    // .add('react-hot-loader/patch')
    .add(resolve(rootPath, srcPath, 'index'));
}
