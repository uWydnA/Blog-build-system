import React, { Component } from 'react'
import { List, Menu, Tag } from 'antd';
import { UserOutlined, FieldTimeOutlined, TagFilled } from '@ant-design/icons';
import './category.css'
class Category extends Component {

  state = {
    articleList: [],
    articleAll: [],
    newList: {},
    color: "#f50"
  }

  render() {
    return (
      <div id='category'>
        <div className='margin'>
          {/* category -- {this.props.match.params.id} */}
          <div className='top'>
            <Menu
              className="ul"
              theme="dark"
              style={{ backgroundColor: `rgba(24, 24, 24)` }}
              selectedKeys={this.props.location.pathname}
            >
              {
                Object.keys(this.state.newList).map(key =>

                  (
                    <Menu.Item key={key} onClick={() => this.handleTar(key)}
                      className="li"
                    >
                      <a>
                        <div className="fff">
                          <span>{key}</span>
                          <Tag className='number'
                            color={this.state.color}
                          >
                            {this.state.newList[key]}
                          </Tag>
                        </div>
                      </a>
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
                pageSize: 1,
                hideOnSinglePage: true
              }}
              renderItem={item => {
                return (<List.Item
                  style={{ borderBottom: "none" }}
                >
                  <div className="content" key={item.id}>
                    <div className='title'>
                      <a onClick={() => this.handleChange(item.title)}>{item.title}</a>
                    </div>
                    <hr className="hr"></hr>
                    <div className="info">
                      <div>
                        <UserOutlined />
                        <span>{item.author}</span>
                      </div>
                      <div>
                        <FieldTimeOutlined />
                        <span>{item.time}</span>
                      </div>
                      <div>
                        <TagFilled />
                        <span>{item.tag}</span>
                      </div>

                    </div>
                  </div>
                </List.Item>)
              }
              }
            />
          </div>
        </div>
      </div>
    )
  }


  // 点击title跳转详情页
  handleChange = (title) => {
    console.log(title)
    console.log(this.props.match.params.id)
    // this.props.history.push(`/views/${this.props.match.params.id}/${title}`)
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
    React.$axios.get('http://localhost:12138/articles').then(res => {
      this.setState({
        articleAll: res.data,
        articleList: res.data.filter(item =>
          item.category === this.props.match.params.id
        )
      })
      this.fu(res.data)
    })
  }

  // 随机颜色
  color = () => {
    var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16)
    if (rand.length === 6) {
      return `#${rand}`;
    } else {
      return this.color();
    }
    
  }

  // 点击标签切换对应内容
  handleTar = (data) => {
    this.setState({
      articleList: this.state.articleAll.filter(item =>
        item.category === data
      ),
      color:this.color()
    })
    this.props.history.push(`/category/${data}`)
  }

}

export default Category