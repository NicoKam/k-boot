import yargs from 'yargs';
import registerDev from './scripts/dev';
import registerBuild from './scripts/build';
import logger, { LoggerLevel } from './utils/logger';

const a= 1;

if (yargs.argv.verbose) {
  logger.loggerLevel = LoggerLevel.debug;
}

let y = yargs.scriptName('k-boot');

[registerDev, registerBuild].forEach((register) => {
  y = register(y);
});

y = y.help('h').alias('h', 'help')
  .alias('v', 'version');

const { $0: noUse, _, ...otherOptions } = y.argv;
if (y.argv._.length === 0 && Object.keys(otherOptions).length === 0) {
  y.showHelp();
}
