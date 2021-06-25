import React, { useState, useEffect, useCallback } from "react";
import styles from './UseTabsLayout.less';
import  './index.less';
import { Tabs, Button, Dropdown, Menu } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { history, Route, useHistory, connect, ConnectRC, Loading, MenuTabsModelState, MenuTab, useModel, formatMessage, FormattedMessage } from 'umi'
import routes from '../../config/routes';
import { LocationListener } from "history";
import loadable from '@loadable/component'
import { getTabsComponent } from "../utils/tabsConfig";

export type MenuTabArr = {
  title: string
  key: string
  closable: boolean
  component: string
}

export type IRout = {
  name?: string
  icon?: string
  path?: string
  routes?: any[],
  component?: string
}

const loginPath = '/user/login';
let filterRoutes: IRout[] = [];
// 过滤出所有有效路由，并将子路由放到最外层
function renderRouters (routes: IRout[]) : Array<IRout> { 
  routes.forEach(route => {
    if(route.routes && route.routes.length && route.name){
      return renderRouters(route.routes)
    }
    route.name && filterRoutes.push(route)
  })
  return filterRoutes
}
renderRouters(routes)

interface PageProps {
  menuTabsModel: MenuTabsModelState;
  loading: boolean;
}

const UseTabsLayout: ConnectRC<PageProps> = ( { children, menuTabsModel, dispatch } ) => {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState || {};
  const [activeKey, setActiveKey] = useState<string>(menuTabsModel.activeKey)
  const [menuTabs, setMenuTabs] = useState<Partial<MenuTab[]>>([]) // [ {key: string} ]
  const [menuTabsArr, setMenuTabsArr] = useState([] as MenuTabArr[]) // [ {key: string, title: string, } ]

  useEffect( () => {
    console.log("menuTabsModel.menuTabs", menuTabsModel,filterRoutes, currentUser)
    setMenuTabs([...menuTabsModel.menuTabs])
    let newTab: MenuTabArr[] = [];
    menuTabsModel.menuTabs.length && menuTabsModel.menuTabs.forEach(item => {
      let mid: IRout = filterRoutes.filter(route => route.path === item.key)[0]
      if(mid && mid.path){
        let midName = 'menu'
        let midArr = mid.path.split('/')
        for(let i = 0; i< midArr.length; i++ ){
          midName = midName + midArr[i] + '.'
        }
        midName = midName.substr(0,midName.length - 1)
        // console.log("哈哈哈哈哈", midName)
        
        newTab.push({
          key: mid.path,
          title: midName,
          closable: true,
          component: mid.component || ''
        })
      }
    })
    setMenuTabsArr(newTab)
    setActiveKey(menuTabsModel.activeKey)
  }, [menuTabsModel] )

  const history = useHistory();

  // const addTabs = () => {
  //   if(history.location && history.location.pathname){
  //     console.log(menuTabs)
  //     if(!menuTabs.filter(tab => tab.key === history.location.pathname).length){
  //       let mid: IRout = filterRoutes.filter(route => route.path === history.location.pathname)[0]
  //       if(mid && mid.path){
  //         let newTab: MenuTab = {
  //           key: mid.path,
  //           title: mid.name || '',
  //           closable: true,
  //         }
  //         dispatch({
  //           type: 'menuTabsModel/save',
  //           payload: {menuTabs: [...menuTabs, newTab]},
  //         })
  //         // setMenuTabs([...menuTabs, newTab])
  //         setActiveKey(mid.path)
  //       }
  //     }else{
  //       console.log("------------------------已存在-------------------------", menuTabs)
  //     }
  //   }
  // }

  // useEffect( () => {
  //   renderRouters(routes)
  //   filterRoutes = filterRoutes.filter(route => route.name)
  // }, [])
  
  // useEffect( () => {
  //   history.listen(route => {
  //     if(route.pathname) addTabs()
  //   })
  // }, [] )


  // UN_LISTTEN && UN_LISTTEN()

 
  const changeActiveKey = (key: string) => {
    // console.log("current active key", key)
    setActiveKey(key)
    history.push(key)
  }

  // const remove = (key: string) => {
  //   setMenuTabs([
  //     ...menuTabs.filter(item => item.key !== key)
  //   ])
  // }

  const tabsMenuBack = useCallback( () => {
    if(menuTabsArr.length){
      // console.log("menuTabsArr改变了，重新渲染Tabs", menuTabsArr)
      return menuTabsArr.map(pane => (
        // 
        <Tabs.TabPane tab={<FormattedMessage id={pane.title}/>} key={pane.key} closeIcon={
          <>
            {
              // onClick={() => remove(pane.key)}
              menuTabsArr.length > 1 ? <CloseCircleOutlined /> : null
            }
          </>
        } >
          {
            getTabsComponent(pane.key)?.component
          }
        </Tabs.TabPane>
      ))
    }
  }, [menuTabsArr])

  const onEdit = (targetKey, action) => {
    // console.log(targetKey, action)
    if(action === 'remove'){
      dispatch({
        type: 'menuTabsModel/remove',
        payload: targetKey,
      })
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span>关闭此标签</span>
      </Menu.Item>
      <Menu.Item key="1">
        <span>关闭其他标签</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className={styles.tabs}>
        {
          !currentUser && location.pathname === loginPath ? null : 
          <Tabs
            hideAdd
            activeKey={activeKey}
            type="editable-card"
            onTabClick={changeActiveKey}
            tabBarExtraContent={
              {
                right: <Dropdown overlay={menu} placement="bottomCenter">
                <Button className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  操作
                </Button>
              </Dropdown>
              }
            }
            onEdit={onEdit}
          >
            {tabsMenuBack()}
          </Tabs>
        }
        
        {/* 处理登录页 */}
        {
          !currentUser && location.pathname === loginPath && children
        }
       
      </div>
    </React.Fragment>
  )
}

export default connect(
  ({ menuTabsModel, loading }: { menuTabsModel: MenuTabsModelState; loading: Loading }) => ({
    menuTabsModel,
    loading: loading.models.index,
  }),
)(UseTabsLayout);