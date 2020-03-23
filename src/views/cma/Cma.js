import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import User from './user/User'
import RightManage from './rightManage/Rightmanage'
import Role from './rightManage/Roles/Role'
import Right from './rightManage/Right/Right'
import List from './articleManage/list/List'
import Preview from './articleManage/preview/Preview'
import Update from './articleManage/update/Update'
import Home from './Home/home'
import Sidebar from './sidebar/Sidebar'
import Topheader from './topheader/Topheader'
import AddArticle from './articleManage/addArticle/AddArticle'
import './Cma.css'
import { Layout } from 'antd';
const { Content } = Layout;
export default class Cma extends Component {
  render() {
    return (
      <div className='cma' style={{ height: '100%' }}>
        <Layout style={{ height: '100%' }}>
          <Sidebar></Sidebar>
          <Layout className="site-layout">
            <Topheader />
            <Content
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 24,
                minHeight: 280,
              }}
            >
              <Switch>
                <Route path='/cma/home' component={Home}></Route>
                <Route path='/cma/user' component={User}></Route>
                <Route path='/cma/right-manage' render={(props) => (
                  <RightManage {...props}>
                    <Switch>
                      <Route path='/cma/right-manage/roles' component={Role}></Route>
                      <Route path='/cma/right-manage/right' component={Right}></Route>
                      <Redirect path="/cma/right-manage" to='/cma/right-manage/roles' exact></Redirect>
                    </Switch>
                  </RightManage>
                )}></Route>
                <Route path='/cma/article-manage/list' component={List}></Route>
                <Route path='/cma/article-manage/update/:id' component={Update}></Route>
                <Route path='/cma/article-manage/preview/:id' component={Preview}></Route>
                <Route path='/cma/article-manage/addArticle' component={AddArticle}></Route>
                <Redirect  to='/cma/home' exact></Redirect>
              </Switch>
            </Content>
          </Layout>
        </Layout>

      </div>
    )
  }
}
