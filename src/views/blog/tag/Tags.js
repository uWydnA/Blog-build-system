import React, { Component } from 'react'
import List from './List'
import axios from 'axios'
// import { connect } from 'react-redux'

export default class Tags extends Component {
    state = {
        dataList: []
    }
    
    componentDidMount () {
        axios(`http://localhost:12138/articles?tag=${ this.props.history.location.pathname.split('/')[2] }`)
        .then( res => {
            this.setState({ 
                dataList: res.data
            }, () => {
                // this.props.actionCreator()
            })
        })
    }
    
    UNSAFE_componentWillReceiveProps () {
        axios(`http://localhost:12138/articles?tag=${ this.props.history.location.pathname.split('/')[2] }`)
        .then( res => {
            this.setState({ 
                dataList: res.data
            }, () => {
                // this.props.actionCreator()
            })
        })
    }

    render() {
        return  <List articalList={ this.state.dataList } {...this.props}></List>      
    }
}

// const mapStateToProps = state=>{
//     return {
//       isLoading:state.isLoading
//     }
//   }
  
//   const mapDispatchToProps = {
//     actionCreator : ()=>{
//       return {
//         type:'loading',
//         payload:false
//       }
//     }
//   }
  
//   export default connect(mapStateToProps,mapDispatchToProps)(Tags)