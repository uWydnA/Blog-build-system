import React, { Component } from 'react'
import './detail.css'
import {connect} from 'react-redux'
import { TagOutlined, ClockCircleOutlined, UserOutlined} from '@ant-design/icons';
class Detail extends Component {
  state = {
    datalist:[]
  }
  componentDidMount() {
    React.$axios.get(`http://api.yolandy.com/api/articles`).then(res=>{
      var data = res.data.filter(item=>item._id === this.props.match.params.id)
      console.log(data)
      this.setState({
        datalist:data[0]
      },()=>{
        this.props.actionCreator(false)
      })
    })
  }
  componentWillUnmount () {
    this.props.actionCreator(true)
  }
  render() {
    return (
      <div style={{width:"100%",height:'100%',background:' #202124',color:"#FFF"}}>
        {/* detail -- {this.props.match.params.id}--{this.props.match.params.category} */}
        <div className="wrapper">
            <div className="title">
              <h1>{this.state.datalist.title}</h1>
            </div>
            <div className="details">
                <span>
                  <UserOutlined />
                  {this.state.datalist.author}
                </span>
                <span>
                  <ClockCircleOutlined />
                  {this.state.datalist.time}
                </span>
                <span>
                  <TagOutlined />
                  {this.state.datalist.category}
                </span>
            </div>
            <div className="content" dangerouslySetInnerHTML={{
                     __html:this.state.datalist.content
                 }}>
            </div>  
        </div>
      </div>
    )
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
export default connect(mapStateToProps,mapDispatchToProps)(Detail);
