import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Tag } from 'antd'
import './Tag.css'
import axios from 'axios'
import List from './List'
import Tags from './Tags'

export default class Tagpage extends Component {
  state = {
    dataList: [],
    currentTag: 0
  }

  componentDidMount () {
    
    axios('http://localhost:12138/articles').then( res => {
      this.setState({ 
        dataList: res.data,
      })
      res.data.forEach((val, index) => {
        if (val.tag === this.props.location.pathname.split('/')[2]) {
          this.setState({ 
            currentTag: index + 1
          })
        }
      })
    })
  }

  getRomdomColor = () => {
    let colorTag = ['#F8B26A', '#E15B64', "#67CC86", "#3498DB","rgb(132, 155, 135)"]
    return colorTag[Math.round(Math.random()*(0-4)+4)]
  }

  render() {
    return (
      <div style={{ background: '#202124'}}>
          <ul>
          {
            [{tag: '全部'}, ...this.state.dataList].map( (val, index) => <li key={ index }>
              { val.tag }
              <Tag color={ this.getRomdomColor() }
              onClick={ () => { this.handelStyle(index, val.tag)} }
              className={this.state.currentTag===index?'myTag clickTag':'myTag'}>{ val.tag }</Tag>
            </li> ) 
          }
          </ul>
          <div className='content'>
              {
                this.props.location.pathname === '/tag'?

                <List articalList={ this.state.dataList } {...this.props}></List>
                :
                <Route path='/tag/:mytag' component={Tags}></Route>
              }       
          </div>
      </div>
    )
  }
  handelStyle = (index, tag) => {
    if (this.state.currentTag !== index) {
      this.setState({
        currentTag: index
      })
      if (tag === '全部'){
        this.props.history.push('/tag')
        return
      }
      this.props.history.push(`/tag/${ tag }`)
    }   
  }
}
