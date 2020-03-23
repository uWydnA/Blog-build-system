import React, { Component } from 'react'
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom';
import './topheader.css'
const { Header } = Layout;
class Topheader extends Component {
  state = {
    collapsed: false,
  }
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    },()=>{
      this.props.actionCreator(this.state.collapsed)
    });
  }
  render() {
    return (
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: 'trigger',
          onClick: this.toggle,
        })}
      </Header>
    )
  }
}

const mapStateToProps = state=>{
  return {

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