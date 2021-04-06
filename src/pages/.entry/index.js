/* Warn: Do not change this file!!! */
import React from 'react';
import { history, asyncComponent, RouterWithChildren } from 'react-convention-router/tools';
// import packageInfo from './packageInfo';

const devMode = process.env.NODE_ENV === 'development';

const routeConfig = [
  {
    "path": "/",
    "exact": false,
    "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/_layout.ts")),
    "children": [
      {
        "path": "/",
        "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/index.tsx")),
        "exact": true
      },
      {
        "path": "/dna",
        "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/dna/index.ts")),
        "exact": true,
        "children": []
      },
      {
        "path": "/exception",
        "children": [
          {
            "path": "/exception/404",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/exception/404/index.tsx")),
            "exact": true,
            "children": []
          },
          {
            "path": "/exception/500",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/exception/500/index.tsx")),
            "exact": true,
            "children": []
          }
        ]
      },
      {
        "path": "/home",
        "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/home/index.ts")),
        "exact": true,
        "children": []
      },
      {
        "path": "/mapbox",
        "exact": false,
        "children": [
          {
            "path": "/mapbox",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/mapbox/index.tsx")),
            "exact": true
          },
          {
            "path": "/mapbox/playground",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/mapbox/playground/index.ts")),
            "exact": true,
            "children": []
          }
        ]
      },
      {
        "path": "/sub",
        "exact": false,
        "children": [
          {
            "path": "/sub",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/sub/index.tsx")),
            "exact": true
          },
          {
            "path": "/sub/sub1",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/sub/sub1/index.ts")),
            "exact": true,
            "children": []
          },
          {
            "path": "/sub/sub2",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/sub/sub2/index.ts")),
            "exact": true,
            "children": []
          }
        ]
      },
      {
        "path": "/three",
        "exact": false,
        "children": [
          {
            "path": "/three",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/three/index.tsx")),
            "exact": true
          },
          {
            "path": "/three/:demo",
            "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/three/[demo]/index.ts")),
            "exact": true,
            "children": []
          }
        ]
      },
      {
        "path": "/",
        "exact": false,
        "component": asyncComponent(() => import("../../../../react-dev-template/src/pages/404.tsx")),
        "flag": "404"
      }
    ]
  }
];

export default () => <RouterWithChildren history={history} routes={routeConfig} />;
