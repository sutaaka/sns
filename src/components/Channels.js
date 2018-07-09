import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { changeChannel } from '../actions/channels'

class Channels extends Component {
  constructor(props) {
    super(props);
    this.state = { channels: [] };
  }

  componentDidMount() {
    axios.get('http://localhost:3001/channels')
      .then((response) => {
        this.setState({ channels: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onCreateChannelButtonClicked() {
    const name = document.getElementById('channel-title').value

    axios
      .post('http://localhost:3001/channels', {
        name: name
      })
      .then((response) => {
        const { id, name } = response.data
        this.setState({ channels: [...this.state.channels, { id, name }] })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeChannel(channelId, e) {
    // console.log(channelId)
    this.props.changeChannel(channelId)
  }

  render() {
    const listElements = this.state.channels.map((channel, index) => {

      return (
        <ListItem
          key={index}
          button
          onClick={this.onChangeChannel.bind(this, channel.id)}
        >
          <ListItemText primary={`${channel.name} ${this.props.currentChannelId === channel.id ? '(selected)' : ''}`} />
        </ListItem>
      )
    })

    return (
      <div id="channels">
        <TextField
          id="channel-title"
          label="Channel Name"
          placeholder="Channel Name"
          margin="normal"
        />
        <Button id="createChannel" onClick={this.onCreateChannelButtonClicked.bind(this)}>
          Create
        </Button>

        <List>{listElements}</List>
      </div>
    );
  }
}



export default connect(
  (state) => {
    return {
      currentChannelId: state.channels.currentChannelId
    }
  },
  (dispatch) => {
    return bindActionCreators({ changeChannel }, dispatch)
  }
)(Channels);
