import type webpack from 'webpack';
import type Config from 'webpack-chain';

export interface IOptions {

  /** 根路径 */
  rootPath: string;

  srcPath: string;

  publicPath: string;

  modifyVars?: Record<string, string>;

  mode: Env;
}

export type Env = 'development' | 'production';

export interface KBootConfig {
  base?: string;
  srcPath?: string;
  publicPath?: string;
  chainWebpack?: (config: Config, other: { webpack: typeof webpack; env: Env }) => void;
  less?: {
    modifyVars?: IOptions['modifyVars'];
  };
}

export const defaultKBootConfig: Required<KBootConfig> = {
  base: '/',
  publicPath: '/',
  srcPath: 'src',
  chainWebpack: () => {},
  less: {},
};
