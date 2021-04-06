import { resolve } from 'path';
import type { Argv } from 'yargs';
import run from '../task/webpackTask';


export default function register(yargs: Argv) {
  return yargs.command<{ root?: string }>(
    'build [root]',
    '打包工程',
    (y) => {},
    (argv) => {
      const { root = '' } = argv;
      const cwd = resolve(root);

      run(cwd, 'production');
    },
  );
}
