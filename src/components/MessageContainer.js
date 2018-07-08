import React, { Component } from 'react';
import axios from 'axios'

class MessagesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
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


  render(){
    const listElements = this.state.messages.map((message, index) =>{
      return <li key={index}>{message.text}</li>
    })

  return (
    <div id="messages">
       <ul>{listElements}</ul>
        <input id="text" />
        <button id="createMessage" onClick={this.onCreateMessageButtonClicked.bind(this)}>送信</button> 
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
