import React, { Component } from 'react'
import { PageHeader } from 'antd'
import axios from 'axios'
export default class Preview extends Component {
  componentWillMount() {
    axios.get(`http://localhost:12138/articles/${this.props.match.params.id}`).then(res => {
      let { title, category, content } = res.data
      this.setState({
        title,
        category,
        content: content
      })
    })
  }
  state = {
    title: '',
    category: [],
    content: ''
  }
  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          onBack={() => {
            this.props.history.goBack()
          }}
          title={this.state.title}
          subTitle={this.state.category} //分类
        />
        <div dangerouslySetInnerHTML={{
          __html: this.state.content
        }}></div>
      </div>

    )
  }
}
