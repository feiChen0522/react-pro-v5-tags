import Loadable from "react-loadable";
import React from "react";

const Loading = () => (<span>Loading...</span>);
const Index = Loadable({loader: () => import('../pages/index'), loading: Loading, delay: 150});
const Welcome = Loadable({loader: () => import('../pages/Welcome'), loading: Loading, delay: 150});
const Table1 = Loadable({loader: () => import('../pages/Table/Table1'), loading: Loading, delay: 150});
const Table2 = Loadable({loader: () => import('../pages/Table/Table2'), loading: Loading, delay: 150});
const NotFound = Loadable({loader: () => import('../pages/404'), loading: Loading, delay: 150});

export interface TabModel {
  title: string,
  tabKey?: string,
  component: any,
}

export const getTabsComponent = (key: string) => {
  let newKey = key
  if (key.includes('?')) {
    newKey = key.split('?')[0];
  }
  const tab: TabModel = {
    title: '没有找到',
    component: <NotFound/>,
  }
  switch (newKey) {
    case '/index':
      tab.component = <Index />
      break;
    case '/welcome':
      tab.component = <Welcome />
      break;
    case '/table/table1':
      tab.component = <Table1 />
      break;
    case '/table/table2':
      tab.component = <Table2 />
      break;
    case '/not-found':
      tab.title = '404'
      tab.component = <NotFound/>
      break;
    default :
      break;
  }
  return tab;
}
