import React, { Component } from 'react'
import './Rightmanage.css'
export default class Rightmanage extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}
