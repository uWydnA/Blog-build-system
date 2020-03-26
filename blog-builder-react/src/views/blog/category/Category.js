import React, { Component } from 'react'
import { List, Menu, Tag } from 'antd';
import { UserOutlined, ClockCircleOutlined, TagOutlined } from '@ant-design/icons';
import './category.css'
import {connect} from 'react-redux'
import ToTOP from '../totop/toTOP'
class Category extends Component {

  state = {
    articleList: [],
    articleAll: [],
    newList: {}
  }

  render() {
    const colorTag = ['#F8B26A', '#E15B64', "#67CC86", "#3498DB"]
    return (
      <div id='category'>
        <div className='margin'>
          {/* category -- {this.props.match.params.id} */}
          <div className='top'>
            <Menu
              className="ul"
              theme="dark"
              // style={{ backgroundColor: `#202124` }}
              selectedKeys={this.props.location.pathname}
            >
              {
                Object.keys(this.state.newList).map(key =>

                  (
                    <Menu.Item key={key} onClick={() => this.handleTar(key)}
                      className="li"
                    >
                      <div>
                        <div className="fff">
                          <span>{key}</span>
                          <Tag className='number'
                            color={colorTag[parseInt(Math.random() * 4)]}
                          >
                            {this.state.newList[key]}
                          </Tag>
                        </div>
                      </div>
                    </Menu.Item>
                  )
                )
              }
            </Menu>
          </div>
          <div className="contentAll">
            <List
              itemLayout="horizontal"
              split={false}
              dataSource={this.state.articleList}
              pagination={{
                pageSize: 4,
                hideOnSinglePage: true
              }}
              renderItem={item => {
                return (<List.Item
                  style={{ borderBottom: "none" }}
                >
                  <div className="Fucontent" key={item.id}>
                    <div className='Futitle'>
                      <a onClick={() => this.handleChange(item)}>{item.title}</a>
                    </div>
                    <hr className="hr"></hr>
                    <div className="info">
                      <div>
                        <UserOutlined />
                        <span>{item.author}</span>
                      </div>
                      <div>
                        <ClockCircleOutlined />
                        <span>{item.time}</span>
                      </div>
                      <div>
                        <TagOutlined />
                        <span>{item.tag}</span>
                      </div>

                    </div>
                  </div>
                </List.Item>)
              }
              }
            />
          </div>
          <ToTOP></ToTOP>
        </div>
      </div>
    )
  }


  // 点击title跳转详情页
  handleChange = (item) => {
    this.props.history.push(`/detail/${item.category}/${item._id}`)
  }
  //WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.

  // 再次点击NAV，切换，过滤数据，渲染页面（更新阶段）
  UNSAFE_componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    this.setState({
      articleList: this.state.articleAll.filter(item =>
        item.category === nextProps.match.params.id
      )
    })
  }

  // 得到所有文章，获取title，计算每个title出现的次数，转换成对象，渲染头部tag标签
  fu = (data) => {
    var newData = data.map(data => {
      var arr = []
      arr.push(data.category)
      return arr
    }
    )
    var nameNum = newData.reduce((a, b) => {
      return a.concat(b)
    }).reduce((pre, cur) => {
      if (cur in pre) {
        pre[cur]++
      } else {
        pre[cur] = 1
      }
      return pre
    }, {})
    this.setState({
      newList: nameNum
    })
  }

  // 初始进入阶段
  componentDidMount() {
    React.$axios.get('http://api.yolandy.com/api/articles').then(res => {
      // console.log(res.data)
      this.setState({
        articleAll: res.data,
        articleList: res.data.filter(item =>
          item.category === this.props.match.params.id
        )
      },()=>{
        // 取消loading效果
        this.props.actionCreator()
      })
      this.fu(res.data)
    })
  }

  // 点击标签切换对应内容
  handleTar = (data) => {
    this.setState({
      articleList: this.state.articleAll.filter(item =>
        item.category === data
      )
    })
    this.props.history.push(`/category/${data}`)
  }

}
const mapStateToProps = state=>{
  return {
    isLoading:state.isLoading
  }
}

const mapDispatchToProps = {
  actionCreator : ()=>{
    return {
      type:'loading',
      payload:false
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Category);