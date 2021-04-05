import Config from 'webpack-chain';
import babelLoader from './babelLoader';
import { IOptions } from './def';
import defaultPlugin from './defaultPlugins';
import entry from './entry';
import output from './output';
import styleLoader from './styleLoader';
import webpackResolve from './webpackResolve';

export default function getConfig(options: IOptions): Config {
  const config = new Config();

  config.node.set('__dirname', true);
  
  entry(config, options);
  output(config, options);
  webpackResolve(config, options);
  defaultPlugin(config, options);
  babelLoader(config, options);
  styleLoader(config, options);

  return config;
}
