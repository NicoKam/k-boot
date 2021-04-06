import type webpack from 'webpack';
import type Config from 'webpack-chain';

export interface IOptions {

  /** 根路径 */
  rootPath: string;

  srcPath: string;

  modifyVars?: Record<string, string>;

  mode: Env;
}

export type Env = 'development' | 'production';

export interface KBootConfig {
  srcPath?: string;
  chainWebpack?: (config: Config, other: { webpack: typeof webpack; env: Env }) => void;
  less?: {
    modifyVars?: IOptions['modifyVars'];
  };
}

export const defaultKBootConfig: Required<KBootConfig> = {
  srcPath: 'src',
  chainWebpack: () => {},
  less: {},
};
