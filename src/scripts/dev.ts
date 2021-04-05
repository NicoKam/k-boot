import chalk from 'chalk';
import { isAbsolute, resolve } from 'path';
import portfinder from 'portfinder';
// import opener from 'opener';
import scanRoutes from 'react-convention-router';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Argv } from 'yargs';
import config from '../config/webpack.config';

process.env.NODE_ENV = 'development';

config.mode('development');
const webpackConfig = config.toConfig();

const devServerConfig = webpackConfig.devServer;

const port = devServerConfig.port;

function getWebpackCompiler() {
  try {
    const compiler = webpack({ ...webpackConfig });
    compiler.hooks.done.tap('compilerDone', (stats) => {
      const json = stats.toJson({});
      json.warnings.forEach((warnStr) => {
        console.log(chalk.yellow(warnStr.message));
      });
      json.errors.forEach((errStr) => {
        console.log(chalk.red(errStr.message));
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

function startWebpack() {
  const compiler = getWebpackCompiler();

  // promise
  portfinder
    .getPortPromise({ port })
    .then((newPort) => {
      // Will use devServerConfig.port if available, otherwise fall back to a random port
      const devServer = new WebpackDevServer(compiler, {
        ...devServerConfig,
        port: newPort,
      });
      devServer.listen(newPort, devServerConfig.host, (err) => {
        if (err) {
          console.log(chalk.red(err));
          return;
        }
        if (port !== newPort) {
          console.log(chalk.magenta(`Port ${port} is occupied, assign new port ${newPort}.`));
          port = newPort;
        }
      });
    })
    .catch((err) => {
      console.log(`No port available: ${chalk.red(err)}`);
    });
}

function watchRoutes(callback: Function) {
  let first = true;
  scanRoutes({
    templateFile: resolve(__dirname, 'dev/RouterConfig.template.js'),
    modifyRoutes(routes) {
      if (first) {
        callback && callback();
      }
      first = false;
      return routes;
    },
  });
}

function main() {
  watchRoutes(() => {
    console.log('正在启动...');
    startWebpack();
  });
}

export default function register(yargs: Argv) {
  return yargs.command<{ root?: string }>(
    'dev [root]',
    '启动开发',
    (y) => {},
    (argv) => {
      const { root = '' } = argv;
      const cwd = resolve(root);
      
      main();
      process.on('SIGINT', () => {
        console.log('Exiting...');
        process.exit();
      });
    },
  );
}
