import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { existsSync, readdirSync } from 'fs';
import HtmlPlugin from 'html-webpack-plugin';
import { resolve } from 'path';
import webpack from 'webpack';
import type Config from 'webpack-chain';
import type { IOptions } from '../def';

export default function defaultPlugin(config: Config, options: IOptions) {
  const { rootPath, srcPath, mode, publicPath } = options;
  config.plugin('clean-plugin').use(CleanWebpackPlugin);

  let htmlTemplatePath = resolve(rootPath, srcPath, 'index.html');
  const ejsPath = resolve(rootPath, srcPath, 'document.ejs');
  if (!existsSync(htmlTemplatePath)) {
    // ejs
    if (existsSync(ejsPath)) {
      htmlTemplatePath = ejsPath;
    } else {
      htmlTemplatePath = resolve(__dirname, '../../../assets/index.html');
    }
  }
  config.plugin('html-plugin').use(HtmlPlugin, [
    {
      template: htmlTemplatePath,
      templateParameters: {
        publicPath,
      },
    },
  ]);

  const staticFilesPath = resolve(rootPath, './public');
  if (existsSync(staticFilesPath) && readdirSync(staticFilesPath).length) {
    config.plugin('copy-plugin').use(CopyWebpackPlugin, [
      {
        patterns: [
          {
            from: staticFilesPath,
            to: './',
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
