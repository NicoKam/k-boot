import React from 'react';
import { history, asyncComponent, RouterWithChildren } from 'react-convention-router/tools';
// import packageInfo from './packageInfo';

const devMode = process.env.NODE_ENV === 'development';

const routeConfig = @routeConfig;

export default () => <RouterWithChildren history={history} routes={routeConfig} />;
