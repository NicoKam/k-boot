/* Warn: Do not change this file!!! */
import React from 'react';
import { history, asyncComponent, RouterWithChildren } from 'react-convention-router/tools';
// import packageInfo from './packageInfo';

const devMode = process.env.NODE_ENV === 'development';

const routeConfig = [
  {
    path: '/',
    component: asyncComponent(() => import('../../index.js')),
    exact: true,
    children: [],
  },
];

export default () => <RouterWithChildren history={history} routes={routeConfig} />;
