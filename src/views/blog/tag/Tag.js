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
    })
  }

  getRomdomColor = () => {
    let r = Math.floor(Math.random()*211)
    let g = Math.floor(Math.random()*211)
    let b = Math.floor(Math.random()*211)
    return `rgb(${ r }, ${ g }, ${ b })`
  }

  render() {
    return (
      <div>
          <ul>
          {
            [{tag: '全部'}, ...this.state.dataList].map( (val, index) => <li key={ index }>
              { val.tag }
              <Tag color={ this.getRomdomColor() }
              onClick={ () => { this.handelStyle(index, val.tag)} }
              className={this.state.currentTag===index?'tag clickTag':'tag'}>{ val.tag }</Tag>
            </li> ) 
          }
          </ul>
          <div className='content'>
              {
                this.props.location.pathname === '/tag'?

                <List articalList={ this.state.dataList }></List>
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
