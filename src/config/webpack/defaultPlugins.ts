import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { existsSync, readdirSync } from 'fs';
import HtmlPlugin from 'html-webpack-plugin';
import { join, resolve } from 'path';
import webpack from 'webpack';
import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function defaultPlugin(config: Config, options: IOptions) {
  const { rootPath, srcPath, mode, publicPath } = options;
  config.plugin('clean-plugin').use(CleanWebpackPlugin);
  let indexHtmlPath = resolve(rootPath, srcPath, 'index.html');
  if (!existsSync(indexHtmlPath)) {
    indexHtmlPath = resolve(__dirname, '../../../assets/index.html');
  }
  config.plugin('html-plugin').use(HtmlPlugin, [{ template: indexHtmlPath }]);
  const staticFilesPath = resolve(rootPath, './public');
  if (existsSync(staticFilesPath) && readdirSync(staticFilesPath).length) {
    config.plugin('copy-plugin').use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            from: staticFilesPath,
            to: join('./', publicPath),
          },
        ],
      },
    ]);
  }
  if (mode === 'development') {
    config.plugin('hot-plugin').use(webpack.HotModuleReplacementPlugin);
    config.plugin('fast-refresh').use(ReactRefreshWebpackPlugin);
  }
}
