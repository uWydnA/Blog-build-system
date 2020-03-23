import React, { Component } from 'react'
import { Layout, Menu, Dropdown, Avatar } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import './topheader.css'
const { Header } = Layout;

class Topheader extends Component {
  state = {
    collapsed: false,
    token: {}
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }
  componentDidMount () {
    let token = localStorage.getItem('token')

    this.setState({
      token: JSON.parse(decodeURIComponent(window.atob(token)))
    })
  }
  //下拉菜单
  menu () {
    return (
        <Menu>
            <Menu.Item>
                <div>
                    {this.state.token.roleName}
                </div>
            </Menu.Item>
            <Menu.Item>
                <div onClick={ this.signOut }>
                    退出
                </div>
            </Menu.Item>
        </Menu>
    )
  }  
  render() {
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}

          <div style={ {float:'right',padding:'0 10px'} }>
              欢迎{this.state.token.username}回来！
              <Dropdown overlay={ this.menu() }>
                  <Avatar size="large" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3705382457,1208323352&fm=26&gp=0.jpg" />
              </Dropdown>
          </div>
      </Header>
    )
  }
  signOut = () => {
    localStorage.setItem('token', '')
    this.props.history.push('/login')
  }
}

const mapStateToProps = state=>{
  return () => {
    this.props.actionCreator(this.state.collapsed)
  }
}

const mapDispatchToProps = {
  actionCreator : (data)=>{
    return {
      type:'MySideMenuCollapsed',
      payload:data
    }
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Topheader))
