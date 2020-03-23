import React, { Component } from 'react'
import './update.css'
export default class Update extends Component {
  render() {
    return (
      <div>
        update -- {this.props.match.params.id}
      </div>
    )
  }
}
