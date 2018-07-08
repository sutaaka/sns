import React, { Component } from 'react';
import axios from 'axios'

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
      .then(() => {
        return axios.get('http://localhost:3001/channels')
      })
      .then((response) => {
        this.setState({ channels: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    const listElements = this.state.channels.map((channel, index) => {
      return <li key={index}>{channel.name}</li>
    })

    return (
      <div id="channels">
        <input id="channel-title" />
        <button id="createChannel" onClick={this.onCreateChannelButtonClicked.bind(this)}>チャンネル作成</button>
        <ul>{listElements}</ul>
      </div>
    );
  }
}

export default Channels;
