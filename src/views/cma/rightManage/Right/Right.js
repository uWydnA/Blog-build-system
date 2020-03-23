import React, { Component } from 'react'
import './right.css'
import { Table, Tag } from 'antd';
export default class Right extends Component {

  componentDidMount() {
    React.$axios.get("http://localhost:12138/rights").then(res => {
      // console.log(res.data);
      this.setState({
        data: res.data
      })
    })
  }

  state = {
    columns: [
      {
        title: '#',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '权限名称',
        dataIndex: 'title',
        key: 'title'
      },
      {
        title: '权限等级',
        dataIndex: 'grade',
        key: 'grade',
        render: item => {
          var arr = ["green", "blue", "volcano"]
          return (
            <Tag color={arr[item - 1]}>{item}</Tag>
          )
        }
      }
    ],
    data: []

  }

  render() {
    return (
      <div>
        <Table columns={this.state.columns} dataSource={this.state.data}
          pagination={{ pageSize: 5 }} />
      </div>
    )
  }
}
