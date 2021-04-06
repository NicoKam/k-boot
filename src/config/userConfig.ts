import { statSync } from 'fs';
import logger from '../utils/logger';
import type { KBootConfig } from './def';
import { defaultKBootConfig } from './def';

let config: Required<KBootConfig> | undefined;

export default function getUserConfig(configPath: string): Required<KBootConfig> {
  if (config) return config;
  try {
    const stat = statSync(configPath);
    if (stat.isFile()) {
      logger.debug(`UserConfig ${configPath} exists.`);
      const userConfig = require(configPath) as KBootConfig;
      config = {
        ...defaultKBootConfig,
        ...userConfig,
      };
      return config;
    }
  } catch (error) {

  }
  logger.debug(`UserConfig ${configPath} [!not!] exists!`);
  config = {
    ...defaultKBootConfig,
  };
  return config;
}
