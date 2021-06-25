import { Effect, ImmerReducer, Reducer, Subscription } from 'umi';
import { IRout } from '@/layout/UseTabsLayout';

export type MenuTab = {
  // title: string
  key: string
  // closable: boolean,
}



export interface MenuTabsModelState {
  menuTabs: MenuTab[]
  activeKey: string
}

export interface MenuTabsModelType {
  namespace: 'menuTabsModel';
  state: MenuTabsModelState;
  effects: {
    get: Effect;
    query: Effect;
  };
  reducers: {
    reset: Reducer<MenuTabsModelState>;
    save: Reducer<MenuTabsModelState>;
    remove: Reducer<MenuTabsModelState>;
    // 启用 immer 之后
    // save: ImmerReducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}

const MenuTabsModel: MenuTabsModelType = {
  namespace: 'menuTabsModel',

  state: {
    menuTabs: [],
    activeKey: ''
  },

  effects: {
    // payload：传参固定key值，内含自己调用的参数
    // call：执行异步函数
    // put：发出一个 Action，类似于 dispatch
    // select：用于在effect中通过yield获得state的数据
    *get( { payload, callback }, { call, put, select } ) {
      console.log("进来了")
      try{
        const stock = yield select((state: {menuTabsModel: MenuTabsModelState}) => {})
        yield put({ type: 'save', payload: {}});
        callback(stock);
      } catch(e) {
        console.log(e)
      }
    },
    *query({ payload }, { call, put }) {},
  },
  reducers: {
    reset(state, action){
      return {
        menuTabs: [],
        activeKey: ''
      }
    },
    save(state, action) {
      let data = JSON.parse(JSON.stringify(state))
      console.log("save", data, action,)
      let newTab: MenuTab = {key: '/'};
      if(!state?.menuTabs.filter(tab => tab.key === action.payload).length){
        newTab = {
          key: action.payload
        }
        data.menuTabs.push({
          key: action.payload
        })
      }else{
        console.log("-------------已存在-------------")
      }
      console.log('save ====>', data)
      return {
        ...data, activeKey: action.payload
      };
    },
    remove(state, action){
      let data = JSON.parse(JSON.stringify(state))
      let newTab: MenuTab[] = [];
      let curActiveKey = ''
      for(let i = 0; i < data.menuTabs.length; i++){
        if(data.menuTabs[i].key === action.payload){
          if(i === data.menuTabs.length - 1){ // 末位取上一位
            curActiveKey = data.menuTabs[i-1].key
          }else{ // 取下一位
            curActiveKey = data.menuTabs[i+1].key
          }
        }
      }
      newTab = data.menuTabs.filter((item: MenuTab, index: number) => item.key !== action.payload) || []
      console.log('remove ====>', newTab)
      return {
        menuTabs: [...newTab], activeKey: curActiveKey
      };
    }
    // 启用 immer 之后
    // save(state, action) {
    //   state.name = action.payload;
    // },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        console.log("subscriptions istory.listen pathname", pathname)
        if (pathname !== '/') {
          dispatch({
            type: 'save',
            payload: pathname,
          });
        }
      });
    },
  },
};

export default MenuTabsModel;