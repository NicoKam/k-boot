import { resolve } from 'path';
import type { Argv } from 'yargs';
import run from '../task/webpackTask';
import logger from '../utils/logger';


export default function register(yargs: Argv) {
  return yargs.command<{ root?: string }>(
    'dev [root]',
    '启动开发',
    (y) => {},
    (argv) => {
      const { root = '' } = argv;
      const cwd = resolve(root);

      run(cwd, 'development');
      process.on('SIGINT', () => {
        logger.warn('Exiting...');
        process.exit();
      });
    },
  );
}
