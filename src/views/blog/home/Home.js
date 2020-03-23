import React, { Component } from 'react'
import { Layout } from 'antd';
import Banner from '../banner/Banner'
const { Content, Footer } = Layout;

export default class Home extends Component {
  render() {
    return (
      <Layout className="layoutHome" style={{ height: '100%' }}>
        <Banner></Banner>
        <Content style={{ padding: '0 50px', background: '#202124' }}>
          <div className="site-layout-content" style={{ background: '#202124' }}>Content</div>
        </Content>
        <Footer style={{ textAlign: 'center', background: '#202124' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>

    )
  }
}
