import React, { Component } from 'react'
import './List.css'
import {
    UserOutlined,
    TagOutlined,
    ClockCircleOutlined
} from '@ant-design/icons'
import { Pagination } from 'antd'

export default class List extends Component {
    state = {
        dataList: [],
        currentData: [],
        num: 5,
        currentPage: 1
    }

    componentDidMount () {
        if (this.props.articalList) {
            this.setState({ 
                dataList: this.props.articalList
            }, () => {
                this.onChange()
            })
        } 
    }

    UNSAFE_componentWillReceiveProps (nextProps) {
        if (nextProps.articalList) {
            this.setState({
                dataList: nextProps.articalList
            }, () => {
                this.onChange()
            })
        }
    }

    render() {
        return (
            <div id='box'>
                {
                    this.state.currentData.map( (val,index) => {
                        return <div key={ index }>
                                    <h3>{ val.title }</h3>
                                    <div>
                                        <UserOutlined />
                                        <span>{ val.author }</span>
                                        <ClockCircleOutlined />
                                        <span>{ val.time }</span>
                                        <TagOutlined />
                                        <span>{ val.tag }</span>
                                    </div>
                                </div>
                    })
                }
                <Pagination showQuickJumper hideOnSinglePage defaultCurrent={this.state.currentPage} 
                total={this.state.dataList.length/this.state.num*10} onChange={this.onChange}/>
            </div>
        )
    }
    onChange = (pageNumber) => {
        pageNumber || (pageNumber = this.state.currentPage)
        let item = this.state.dataList.filter((val,index) => {
            if ((pageNumber-1)*this.state.num<=index && index<pageNumber*this.state.num) {
                return val
            } else {
                return null
            }
        })      
        this.setState({
            currentData:  item
        })
    }
}
