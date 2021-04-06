import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import type Config from 'webpack-chain';
import webpack from 'webpack';
import { resolve } from 'path';
import type { IOptions } from '../def';

export default function defaultPlugin(config: Config, options: IOptions) {
  const { rootPath, srcPath, mode } = options;
  config.plugin('clean-plugin').use(CleanWebpackPlugin);
  config.plugin('html-plugin').use(HtmlPlugin, [{ template: resolve(rootPath, srcPath, 'index.html') }]);
  config.plugin('copy-plugin').use(CopyWebpackPlugin, [
    {
      patterns: [
        {
          from: resolve(rootPath, './public'),
          to: './',
        },
      ],
    },
  ]);
  if (mode === 'development') {
    config.plugin('hot-plugin').use(webpack.HotModuleReplacementPlugin);
    config.plugin('fast-refresh').use(ReactRefreshWebpackPlugin);
  }
}
