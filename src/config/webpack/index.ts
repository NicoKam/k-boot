import Config from 'webpack-chain';
import type { IOptions } from '../def';
import babelLoader from './babelLoader';
import defaultPlugin from './defaultPlugins';
import devServer from './devServer';
import entry from './entry';
import imageLoader from './imageLoader';
import output from './output';
import styleLoader from './styleLoader';
import webpackResolve from './webpackResolve';

export default function getWebpackConfig(options: IOptions): Config {
  const config = new Config();

  config.node.set('__dirname', true);

  entry(config, options);
  output(config, options);
  devServer(config, options);
  webpackResolve(config, options);
  defaultPlugin(config, options);
  babelLoader(config, options);
  styleLoader(config, options);
  imageLoader(config, options);

  return config;
}
