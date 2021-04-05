import { join } from 'node:path';
import Config from 'webpack-chain';
import { IOptions } from './def';
export default function webpackResolve(config: Config, options: IOptions) {
  const { rootPath } = options;
  config.resolve.alias.set('@', join(rootPath, 'src'));
  config.resolve.modules.add(join(rootPath, 'node_modules')).add(join(rootPath, 'src'));
  config.resolve.extensions.add('.js').add('.jsx').add('.ts').add('.tsx').add('.json');
}
