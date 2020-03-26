import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Tag } from 'antd'
import './tag.css'
import axios from 'axios'
import List from './List'
import Tags from './Tags'
import { connect } from 'react-redux'
import Totop from '../totop/toTOP'

class Tagpage extends Component {
  state = {
    dataList: [],
    TagList: [],
    currentTag: 0,
    goTag: (tag) => { 
      this.state.TagList.forEach((val, index) => {
        if ( val === tag ) {
          this.setState({
            currentTag: index
          })
        }
      })
    }
  }
  //筛选去重
  deReapt = (data) => {
    let arr = []
    data.forEach(val => {
      arr.push(val.tag)
    })
    return Array.from(new Set(arr))
  }
  componentDidMount () {
    axios('http://api.yolandy.com/api/articles').then( res => {  
      this.setState({ 
        dataList: res.data,
        TagList: ['全部', ...this.deReapt(res.data)]
      }, () => {
        this.props.actionCreator(false)
        this.state.TagList.forEach((val, index) => {
          if (val === this.props.location.pathname.split('/')[2]) {
            this.setState({ 
              currentTag: index
            })
          }
        })
      })
    })
  }
  componentWillUnmount () {
    this.props.actionCreator(true)
  }
  getRomdomColor = () => {
    let colorTag = ['rgb(225, 91, 100)', 'rgb(132, 155, 135)', "rgb(242, 109, 109)","rgb(103, 204, 134)",'rgb(52, 152, 219)']
    return colorTag[Math.round(Math.random()*(0-4)+4)]
  }

  render() {
    return (
      <div style={{ background: '#202124', height: '1300px'}}>
          <ul className='tagBox'>
          {
            this.state.TagList.map( (val, index) => <li key={ index } className='tagLi'>
              { val }
              <Tag color={ this.getRomdomColor() }
              onClick={ () => { this.handelStyle(index, val) } }
              className={this.state.currentTag===index?'myTag clickTag':'myTag'}>{ val }</Tag>
            </li> ) 
          }
          </ul>
          <div className='content'>
              {
                this.props.location.pathname === '/tag'?

                <List articalList={ this.state.dataList } {...this.props} goTag={ this.state.goTag }></List>
                :
                <Route path='/tag/:mytag' component={Tags}></Route>
              }       
          </div>
          <Totop/>
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

const mapStateToProps = state=>{
  return {
    isLoading:state.isLoading
  }
}

const mapDispatchToProps = {
  actionCreator : data=>{
    return {
      type:'loading',
      payload:data
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Tagpage)