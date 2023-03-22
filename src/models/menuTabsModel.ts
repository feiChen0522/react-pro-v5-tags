import { redirectRoutes } from '@/utils/common';
import type { Reducer, Subscription } from 'umi';
import { history } from 'umi';

export type MenuTab = {
  key: string;
};

export interface MenuTabsModelState {
  menuTabs: MenuTab[];
  activeKey: string;
}

export interface MenuTabsModelType {
  namespace: 'menuTabsModel';
  state: MenuTabsModelState;
  effects: Record<string, unknown>;
  reducers: {
    reset: Reducer<MenuTabsModelState>;
    save: Reducer<MenuTabsModelState>;
    remove: Reducer<MenuTabsModelState>;
    removeOther: Reducer<MenuTabsModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const MenuTabsModel: MenuTabsModelType = {
  namespace: 'menuTabsModel',
  state: {
    menuTabs: [],
    activeKey: '',
  },
  effects: {},
  reducers: {
    reset() {
      return {
        menuTabs: [],
        activeKey: '',
      };
    },
    save(state, action) {
      const data = JSON.parse(JSON.stringify(state));
      // 重定向路由取重定向path作为tab的key
      const myRoute = redirectRoutes.filter((item) => item.path === action.payload);
      if (myRoute.length === 1) {
        action.payload = myRoute[0].redirect;
      }
      if (!state?.menuTabs.filter((tab) => tab.key === action.payload).length) {
        data.menuTabs.push({
          key: action.payload,
        });
      } else {
        // console.log("-------------已存在-------------")
      }
      return {
        ...data,
        activeKey: action.payload,
      };
    },
    remove(state, action) {
      const data = JSON.parse(JSON.stringify(state));
      let newTab: MenuTab[] = [];
      let curActiveKey = '';
      for (let i = 0; i < data.menuTabs.length; i++) {
        if (data.menuTabs[i].key === action.payload) {
          if (i === data.menuTabs.length - 1) {
            // 末位取上一位
            curActiveKey = data.menuTabs[i - 1].key;
          } else {
            // 取下一位
            curActiveKey = data.menuTabs[i + 1].key;
          }
        }
      }
      newTab = data.menuTabs.filter((item: MenuTab) => item.key !== action.payload) || [];
      history.push(curActiveKey);
      return {
        menuTabs: [...newTab],
        activeKey: curActiveKey,
      };
    },
    removeOther(state, action) {
      const data = JSON.parse(JSON.stringify(state));
      const newTab: MenuTab[] =
        data.menuTabs.filter((item: MenuTab) => item.key === action.payload) || [];
      return {
        menuTabs: [...newTab],
        activeKey: action.payload,
      };
    },
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history: myHistory }) {
      return myHistory.listen(({ pathname }: any) => {
        console.log('subscriptions history.listen pathname', pathname);
        if (pathname !== '/') {
          if (pathname !== '/user/login') {
            dispatch({
              type: 'save',
              payload: pathname,
            });
          }
        } else {
          goto();
        }
      });
    },
  },
};

export default MenuTabsModel;
