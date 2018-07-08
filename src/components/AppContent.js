import React, { Component } from 'react'
import MessageContainer from './MessageContainer'

const style = {
  marginLeft: '255px',
}

class AppContent extends Component {
  render() {
    return (
      <main style={style}>
        <MessageContainer />
      </main>
    );
  }
}

export default AppContent
