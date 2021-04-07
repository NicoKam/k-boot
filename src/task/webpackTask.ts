/* eslint-disable no-console */
import chalk from 'chalk';
import { mkdirSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import portfinder from 'portfinder';
// import opener from 'opener';
import scanRoutes from 'react-convention-router';
import type { Configuration } from 'webpack';
import webpack from 'webpack';
import type Config from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';
import type { Env } from '../config/def';
import { defaultKBootConfig } from '../config/def';
import getUserConfig from '../config/userConfig';
import getWebpackConfig from '../config/webpack';
import logger from '../utils/logger';

const pkg = require('../../package.json');

let userConfig = { ...defaultKBootConfig };

/**
 * 通过配置生成 webpack compiler
 * @param webpackConfig webpack 配置
 * @returns
 */
function createWebpackCompiler(webpackConfig: Configuration) {
  try {
    const compiler = webpack({ ...webpackConfig });
    compiler.hooks.done.tap('compilerDone', (stats) => {
      const json = stats.toJson({});
      json.warnings.forEach((warnStr) => {
        console.log(chalk.yellow(warnStr));
      });
      json.errors.forEach((errStr) => {
        console.log(chalk.red(errStr));
      });
      if (stats.hasErrors()) {
        console.log(chalk.green('Compile with Error.'));
      } else {
        console.log(chalk.green('Compile Done.'));
      }
    });
    return compiler;
  } catch (err) {
    console.log(chalk.red('Failed to initialize compile.'));
    console.log(err.message || err);
    process.exit(1);
  }

  return null;
}

function startDevServer(config: Config) {
  const webpackConfig = config.toConfig();

  const devServerConfig = webpackConfig.devServer ?? {};

  let { port = 8000 } = devServerConfig;

  const compiler = createWebpackCompiler(webpackConfig);

  if (!compiler) {
    logger.error('Error while generate webpack compiler.');
    return;
  }
  // promise
  portfinder
    .getPortPromise({ port })
    .then((newPort) => {
      // Will use devServerConfig.port if available, otherwise fall back to a random port
      const devServer = new WebpackDevServer(compiler, {
        ...devServerConfig,
        port: newPort,
      });
      devServer.listen(newPort, devServerConfig.host || 'localhost', (err) => {
        if (err) {
          logger.error(err);
          return;
        }
        if (port !== newPort) {
          logger.warn(`Port ${port} is occupied, assign new port ${newPort}.`);
          port = newPort;
        }
      });
    })
    .catch((err) => {
      logger.error(`No port available: ${err}`);
    });
}

function build(config: Config) {
  const compiler = createWebpackCompiler(config.toConfig());
  compiler?.run((error, stats) => {
    if (error) {
      logger.error(error);
      logger.error('由于上面的异常，导致打包失败');
      process.exit(1);
    }
    if (stats) {
      const messages = stats.toJson({}, true);
      messages.errors.forEach((message) => {
        logger.error(message);
      });
      messages.warnings.forEach((message) => {
        logger.warn(message);
      });
    }
    logger.success('Build complete.');
  });
}

function startWebpack(cwd = process.cwd()) {
  const mode = process.env.NODE_ENV as Env;
  const config = getWebpackConfig({
    rootPath: cwd,
    srcPath: userConfig.srcPath,
    modifyVars: userConfig.less.modifyVars,
    mode,
  });
  config.mode(mode);
  logger.debug(`starting webpack in ${mode} mode`);

  // user chainWebpack
  userConfig.chainWebpack(config, { webpack, env: 'development' });

  if (mode === 'development') {
    startDevServer(config);
  } else {
    build(config);
  }
}

function watchRoutes(cwd: string, callback?: () => void) {
  const mode = process.env.NODE_ENV as Env;
  const { srcPath } = userConfig;
  let first = true;
  const outputIndexPath = resolve(cwd, srcPath, 'pages', '.entry', 'index.js');

  scanRoutes({
    watch: mode === 'development',
    pageRoot: resolve(cwd, srcPath, 'pages'),
    output: (outputStr, templateStr) => {
      mkdirSync(dirname(outputIndexPath), { recursive: true });
      writeFileSync(outputIndexPath, templateStr.replace('@routeConfig', outputStr));
    },
    templateFile: resolve(__dirname, '../../assets/RouterConfig.template.js'),
    modifyRoutes(routes) {
      if (first) {
        callback?.();
      }
      first = false;
      return routes;
    },
  });
}

export default function run(cwd: string, mode: Env) {
  process.env.NODE_ENV = mode;
  logger.debug(`Starting kboot(${pkg.version}) in ${cwd}`);
  userConfig = getUserConfig(resolve(cwd, 'kboot.config.js'));

  logger.debug('scanning router');
  watchRoutes(cwd, () => {
    logger.debug('scanning router completed.');
    logger.success('starting...');
    startWebpack(cwd);
  });
}
