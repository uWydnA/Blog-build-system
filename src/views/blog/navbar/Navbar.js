import React, { Component } from 'react'
import { Layout, Menu } from 'antd';
import './navbar.css'
import { withRouter } from 'react-router-dom';
import {
  AppstoreOutlined,
  ClockCircleOutlined,
  TagOutlined,
  HomeOutlined,
  CommentOutlined

} from '@ant-design/icons';
const { Header } = Layout;
const { SubMenu } = Menu;
class Navbar extends Component {
  handleClick = item => {
    this.props.history.push(item.key)
  }
  state = {
    cataList: []
  }
  UNSAFE_componentWillMount() {
    React.$axios.get('http://localhost:12138/articles')
      .then(res => {
        this.setState({
          cataList: [...new Set(res.data.map(val => val.category))]
        })
      })
  }
  subHandle = val=>{
    this.props.history.push(`/category/${val}`)
  }
  render() {
    return (
      <div className='blogHeader'>
        <Header style={{ width: '100%', background: '#202124' }}>
          <div className='bloglogo'>
            梁朝伟
          </div>
          <div className='blogmenu'>
            <Menu
              theme="light"
              mode="horizontal"
              className='blogMenu'
              defaultSelectedKeys={['/home']}
              style={{ background: '#202124', fontWeight: '500', fontSize: '.9rem' }}
            >
              <Menu.Item key="/home" onClick={this.handleClick}>
                <HomeOutlined />
                <span>Home</span>
              </Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <AppstoreOutlined />
                    category
            </span>
                }
              >
                {
                  this.state.cataList.map(val => (
                    <Menu.Item key={val} onClick={this.subHandle.bind(this,val)}>{val}</Menu.Item>
                  ))
                }
              </SubMenu>
              <Menu.Item key="/tag" onClick={this.handleClick}>
                <TagOutlined />
                <span>Tag</span>
              </Menu.Item>
              <Menu.Item key="/timeline" onClick={this.handleClick}>
                <ClockCircleOutlined />
                <span>timeline</span>
              </Menu.Item>
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <CommentOutlined />
                    contact
            </span>
                }
              >
                <Menu.Item key='github'>github</Menu.Item>
                <Menu.Item key='博客园'>博客园</Menu.Item>
              </SubMenu>
            </Menu>
          </div>
        </Header>
      </div>
    )
  }
}
export default withRouter(Navbar)
