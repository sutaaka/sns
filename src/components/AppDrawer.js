import React, { Component } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Channels from './Channels'

class AppDrawer extends Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
    const { open } = this.state;

    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
      >
        <Channels />
      </Drawer>
    );
  }
}

export default AppDrawer
