import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  fetchMessages()  {
    axios.get(`http://localhost:3001/messages?channelId=${this.props.currentChannelId}`)
      .then((response) => {
        this.setState({ messages : response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount(){
    this.fetchMessages()
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.currentChannelId !== prevProps.currentChannelId) {
      this.fetchMessages()
    }
  }

  onCreateMessageButtonClicked() {
    const text = document.getElementById('text').value

    axios
      .post('http://localhost:3001/messages',{
        channelId: this.props.currentChannelId,
        text: text
      })
      .then((response) => {
        this.setState({ messages: [...this.state.messages, response.data] })
      })
      .catch((error) =>{
        console.log(error);
      })
  }

  render() {
    const listElements = this.state.messages.map((message, index) =>{
      return <li key={index}>{message.text}</li>
    })

    return (
      <div id="messages" style={{
        display: 'grid',
        gridTemplateRows: '1fr 100px',
        height: '100vh'
      }}>
        <div style={{
          gridRowStart: 1,
          gridRowEnd: 2,
        }}>
          <ul>{listElements}</ul>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gridRowStart: 2,
          gridRowEnd: 3,
          padding: '16px'
        }}>
          <div style={{ width: '100%' }}>
            <TextField
              id="text"
              label="Message"
              placeholder="Message"
              margin="normal"
              fullWidth
              rows={1}
              multiline
            />
          </div>
          <div>
            <Button id="createMessage" onClick={this.onCreateMessageButtonClicked.bind(this)}>
              Send
            </Button> 
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentChannelId: state.channels.currentChannelId
  }
}

export default connect(mapStateToProps)(MessagesContainer);
