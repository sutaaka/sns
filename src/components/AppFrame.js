import React, { Component } from 'react'
import AppDrawer from './AppDrawer'
import AppContent from './AppContent'

class AppFrame extends Component {
  render() {
    return (
      <div>
        <AppDrawer />
        <AppContent />
      </div>
    );
  }
}

export default AppFrame
