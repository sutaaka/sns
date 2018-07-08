import React, { Component } from 'react';
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

  componentDidMount(){
    axios.get('http://localhost:3001/messages')
      .then((response) => {
        this.setState({ messages : response.data })
        console.log(this.setState.messages)
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onCreateMessageButtonClicked() {
      const text = document.getElementById('text').value

      axios
      .post('http://localhost:3001/messages',{
        text: text
      })
      .then(() => {
        return axios.get('http://localhost:3001/messages')
      })
      .then((response) =>{
        this.setState({ messages: response.data })
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
    // return (
    //   <div id="messages">
    //  
    // <Messages data={this.state.messages} />)
  
}

// function Messages(props){
//   const listElements = props.data.map((message,index) =>{ 
//     return <li 
//     key={index}
//     style={{
//       fontSize: 20,
//       color:'red',
//     }}
//     >{message.text}</li>
//   });


export default MessagesContainer;
