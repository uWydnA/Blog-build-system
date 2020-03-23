import React, { Component } from 'react'
import { Layout } from 'antd';
import Navbar from './navbar/Navbar'
import './Blog.css'
import Home from './home/Home'
export default class Blog extends Component {
  
  render() {
    return (
      <div style={{height:'100%'}}>
        <Layout className="layout" style={{height:'100%'}}>
          <Navbar></Navbar>
          {
            this.props.children
          }
        </Layout>
      </div>
    )
  }
}
