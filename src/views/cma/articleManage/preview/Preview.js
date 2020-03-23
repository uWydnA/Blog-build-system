import React, { Component } from 'react'
import './preview.css'
export default class Preview extends Component {
  render() {
    return (
      <div>
        {this.props.match.params.id}
      </div>
    )
  }
}
