import React, { Component } from 'react'
import ToTOP from '../totop/toTOP'
import { Timeline } from 'antd'
import './timeline.css'
export default class TimeLine extends Component {

  componentDidMount() {
    React.$axios.get("http://localhost:12138/articles").then(res => {
      var arr = []
      res.data.map(item => {
        arr.push(item.time.split("-")[0])
      })
      this.setState({
        year: [...new Set(arr)]
      })
      var list = []
      for (var i in this.state.year) {
        // console.log(res.data.filter(item => item.time.split("-")[0] === this.state.year[i]));

        list.push({
          inDex: this.state.year[i],
          list: res.data.filter(item => item.time.split("-")[0] === this.state.year[i]).sort(function (a, b) {
            return Date.parse(b.time) - Date.parse(a.time);//时间正序
          })
        })
      }
      this.setState({
        datalist: list
      })
    })
  }

  handletiao = (id) => {
    console.log(id);
  }


  state = {
    datalist: [],
    year: []
  }

  render() {
    return (
      <div className="box">
        <Timeline>
          <Timeline.Item color="black" className="head">
            Yesterday Once More!
          </Timeline.Item>
          {
            this.state.datalist.map(item =>
              <div key={item.inDex}>
                <Timeline.Item color="black" key={item.inDex} style={{ paddingTop: "5px", paddingBottom: "40px" }} >
                  <a className="te" style={{ paddingLeft: "10px" }}>{item.inDex}</a>
                </Timeline.Item>
                {
                  item.list.map(data =>
                    <Timeline.Item color="black" className="word" key={data.id} onMouseOver={this.onmouseover}>
                      <a className="putong" style={{ padding: "10px" }} onClick={() => { this.handletiao(data.id) }}>
                        <span style={{ paddingRight: "15px", fontSize: "12px" }}>{data.time.substring(5)}</span>
                        <span>{data.title}</span>
                      </a>
                    </Timeline.Item>
                  )
                }
              </div>
            )
          }
        </Timeline>
        <ToTOP></ToTOP>
      </div >
    )
  }
}


