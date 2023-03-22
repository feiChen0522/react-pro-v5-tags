export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
    ],
  },
  {
    path: '/index',
    name: 'index',
    icon: 'smile',
    component: './index',
  },
  {
    path: '/table',
    name: 'table',
    icon: 'smile',
    routes: [
      {
        name: 'table1',
        path: '/table/table1',
        component: './Table/Table1',
      },
      {
        name: 'table2',
        path: '/table/table2',
        component: './Table/Table2',
      },
    ],
  },
  // {
  //   path: '/index',
  //   name: 'index',
  //   icon: 'index',
  //   component: '../layout/useTabsLayout',
  //   routes: [
  //     {
  //       path: '/index',
  //       component: './Index',
  //     },
  //   ]
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   path: '/form',
  //   icon: 'form',
  //   name: 'form',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/form/basic-form',
  //     },
  //     {
  //       name: 'basic-form',
  //       icon: 'smile',
  //       path: '/form/basic-form',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'step-form',
  //       icon: 'smile',
  //       path: '/form/step-form',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'advanced-form',
  //       icon: 'smile',
  //       path: '/form/advanced-form',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   path: '/list',
  //   icon: 'table',
  //   name: 'list',
  //   routes: [
  //     {
  //       path: '/list/search',
  //       name: 'search-list',
  //       component: './Welcome',
  //       routes: [
  //         {
  //           path: '/list/search',
  //           redirect: '/list/search/articles',
  //         },
  //         {
  //           name: 'articles',
  //           icon: 'smile',
  //           path: '/list/search/articles',
  //           component: './Welcome',
  //         },
  //         {
  //           name: 'projects',
  //           icon: 'smile',
  //           path: '/list/search/projects',
  //           component: './Welcome',
  //         },
  //         {
  //           name: 'applications',
  //           icon: 'smile',
  //           path: '/list/search/applications',
  //           component: './Welcome',
  //         },
  //       ],
  //     },
  //     {
  //       name: 'table-list',
  //       icon: 'smile',
  //       path: '/list/table-list',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'basic-list',
  //       icon: 'smile',
  //       path: '/list/basic-list',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'card-list',
  //       icon: 'smile',
  //       path: '/list/card-list',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   path: '/profile',
  //   name: 'profile',
  //   icon: 'profile',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/profile/basic',
  //     },
  //     {
  //       name: 'basic',
  //       icon: 'smile',
  //       path: '/profile/basic',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'advanced',
  //       icon: 'smile',
  //       path: '/profile/advanced',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'result',
  //   icon: 'CheckCircleOutlined',
  //   path: '/result',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/result/success',
  //     },
  //     {
  //       name: 'success',
  //       icon: 'smile',
  //       path: '/result/success',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'fail',
  //       icon: 'smile',
  //       path: '/result/fail',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'exception',
  //   icon: 'warning',
  //   path: '/exception',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/exception/403',
  //     },
  //     {
  //       name: '403',
  //       icon: 'smile',
  //       path: '/exception/403',
  //       component: './Welcome',
  //     },
  //     {
  //       name: '404',
  //       icon: 'smile',
  //       path: '/exception/404',
  //       component: './Welcome',
  //     },
  //     {
  //       name: '500',
  //       icon: 'smile',
  //       path: '/exception/500',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'account',
  //   icon: 'user',
  //   path: '/account',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/account/center',
  //     },
  //     {
  //       name: 'center',
  //       icon: 'smile',
  //       path: '/account/center',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'settings',
  //       icon: 'smile',
  //       path: '/account/settings',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  // {
  //   name: 'editor',
  //   icon: 'highlight',
  //   path: '/editor',
  //   routes: [
  //     {
  //       path: '/',
  //       redirect: '/editor/flow',
  //     },
  //     {
  //       name: 'flow',
  //       icon: 'smile',
  //       path: '/editor/flow',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'mind',
  //       icon: 'smile',
  //       path: '/editor/mind',
  //       component: './Welcome',
  //     },
  //     {
  //       name: 'koni',
  //       icon: 'smile',
  //       path: '/editor/koni',
  //       component: './Welcome',
  //     },
  //   ],
  // },
  {
    path: '/',
    redirect: '/index',
  },
  {
    component: './404',
  },
];
