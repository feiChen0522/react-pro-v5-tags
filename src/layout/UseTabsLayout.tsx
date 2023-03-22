import React, { useState, useEffect, useCallback } from 'react';
import styles from './UseTabsLayout.less';
import './index.less';
import { Tabs, Button, Dropdown, Menu } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import type { ConnectRC, Loading, MenuTabsModelState, MenuTab } from 'umi';
import { useHistory, connect, useModel, FormattedMessage } from 'umi';
import routes from '../../config/routes';
import { getTabsComponent } from '../utils/tabsConfig';

export type MenuTabArr = {
  title: string;
  key: string;
  closable: boolean;
  component: string;
};

export type IRout = {
  name?: string;
  icon?: string;
  path?: string;
  routes?: IRout[];
  component?: string;
  redirect?: string;
};

const loginPath = '/user/login';
const filterRoutes: IRout[] = [];
// 过滤出所有有效路由，并将子路由放到最外层
function renderRouters(routeArr: IRout[]): IRout[] {
  routeArr.forEach((route) => {
    if (route.routes && route.routes.length && route.name) {
      return renderRouters(route.routes);
    }
    // 正常路由
    if (route.name) {
      filterRoutes.push(route);
    }
    // 重定向路由
    if (route.redirect) {
      filterRoutes.push(route);
    }
    return filterRoutes;
  });
  return filterRoutes;
}
renderRouters(routes);

interface PageProps {
  menuTabsModel: MenuTabsModelState;
  loading: boolean;
}

const UseTabsLayout: ConnectRC<PageProps> = ({ children, menuTabsModel, dispatch }) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [activeKey, setActiveKey] = useState<string>(menuTabsModel.activeKey);
  const [menuTabs, setMenuTabs] = useState<Partial<MenuTab[]>>([]); // [ {key: string} ]
  const [menuTabsArr, setMenuTabsArr] = useState([] as MenuTabArr[]); // [ {key: string, title: string, } ]

  useEffect(() => {
    setMenuTabs([...menuTabsModel.menuTabs]);
    const newTab: MenuTabArr[] = [];
    if (menuTabsModel.menuTabs.length) {
      menuTabsModel.menuTabs.forEach((item) => {
        const mid: IRout = filterRoutes.filter((route) => route.path === item.key)[0];
        if (mid && mid.path) {
          let midName = 'menu';
          const midArr = mid.path.split('/');
          for (let i = 0; i < midArr.length; i++) {
            midName = midName + midArr[i] + '.';
          }
          midName = midName.substr(0, midName.length - 1);
          newTab.push({
            key: mid.path,
            title: midName,
            closable: true,
            component: mid.component || '',
          });
        }
      });
    }
    setMenuTabsArr(newTab);
    setActiveKey(menuTabsModel.activeKey);
  }, [menuTabsModel]);

  const history = useHistory();

  const changeActiveKey = (key: string) => {
    setActiveKey(key);
    history.push(key);
  };

  const remove = (key: string) => {
    setMenuTabs([...menuTabs.filter((item) => item.key !== key)]);
  };

  const tabsMenuBack = useCallback(() => {
    if (menuTabsArr.length) {
      return menuTabsArr.map((pane) => (
        <Tabs.TabPane
          tab={<FormattedMessage id={pane.title} />}
          key={pane.key}
          closeIcon={<>{menuTabsArr.length > 1 ? <CloseCircleOutlined /> : null}</>}
        >
          {getTabsComponent(pane.key)?.component}
        </Tabs.TabPane>
      ));
    }
  }, [menuTabsArr]);

  const onEdit = (targetKey: any, action: any) => {
    if (action === 'remove') {
      dispatch({
        type: 'menuTabsModel/remove',
        payload: targetKey,
      });
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span
          onClick={() => {
            dispatch({
              type: 'menuTabsModel/remove',
              payload: activeKey,
            });
          }}
        >
          关闭此标签
        </span>
      </Menu.Item>
      <Menu.Item key="1">
        <span
          onClick={() => {
            dispatch({
              type: 'menuTabsModel/removeOther',
              payload: activeKey,
            });
          }}
        >
          关闭其他标签
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className={styles.tabs}>
        {!currentUser && location.pathname === loginPath ? null : (
          <Tabs
            hideAdd
            activeKey={activeKey}
            type="editable-card"
            onTabClick={changeActiveKey}
            tabBarExtraContent={{
              right: (
                <Dropdown overlay={menu} placement="bottomCenter">
                  <Button className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                    操作
                  </Button>
                </Dropdown>
              ),
            }}
            onEdit={onEdit}
          >
            {tabsMenuBack()}
          </Tabs>
        )}

        {/* 处理登录页 */}
        {!currentUser && location.pathname === loginPath && children}
      </div>
    </React.Fragment>
  );
};

export default connect(
  ({ menuTabsModel, loading }: { menuTabsModel: MenuTabsModelState; loading: Loading }) => ({
    menuTabsModel,
    loading: loading.models.index,
  }),
)(UseTabsLayout);
