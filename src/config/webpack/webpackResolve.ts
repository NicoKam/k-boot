import { join } from 'path';
import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function webpackResolve(config: Config, options: IOptions) {
  const { rootPath, srcPath } = options;
  config.resolve.alias.set('@', join(rootPath, srcPath));
  config.resolve.modules.add(join(rootPath, 'node_modules')).add(join(rootPath, srcPath));
  config.resolve.extensions.add('.js').add('.jsx')
    .add('.ts')
    .add('.tsx')
    .add('.json');
}
