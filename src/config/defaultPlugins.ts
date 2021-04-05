import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import Config from 'webpack-chain';
import webpack from 'webpack';
import { IOptions } from './def';

export default function defaultPlugin(config: Config, options: IOptions) {
  const { rootPath } = options;
  config.plugin('clean-plugin').use(CleanWebpackPlugin);
  config.plugin('html-plugin').use(HtmlPlugin, [{ template: './src/index.html' }]);
  config.plugin('copy-plugin').use(CopyWebpackPlugin, [
    {
      patterns: [
        {
          from: './public',
          to: './',
        },
      ],
    },
  ]);
  config.plugin('hot-plugin').use(webpack.HotModuleReplacementPlugin);
  config.plugin('fast-refresh').use(ReactRefreshWebpackPlugin);
}
