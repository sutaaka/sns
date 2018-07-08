import React, { Component } from 'react';
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

        // <input id="channel-title" />
        // <Button id="createChannel" onClick={this.onCreateChannelButtonClicked.bind(this)}>チャンネル作成</Button>

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

  render() {
    const listElements = this.state.channels.map((channel, index) => {
      return (
        <ListItem key={index} button>
          <ListItemText primary={channel.name} />
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

export default Channels;
