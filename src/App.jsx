import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data =
  {
    currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [] // messages coming from the server will be stored here as they arrive
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }
  componentDidMount() {
    console.log("componentDidMount <App />");
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (event) => {
    }

  }
  sendMessage = (message) => {
      const newMessage = {id: this.state.messages.length+1, username: this.state.currentUser.name, content: message};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})

      this.socket.send(JSON.stringify(newMessage));
  }
  render() {
    console.log("Rendering on <App />");
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages={this.state.messages}/>
        <ChatBar
          currentUser={this.state.currentUser}
          onMessageSend={this.sendMessage}
         />
      </div>
    );
  }
}
export default App;
