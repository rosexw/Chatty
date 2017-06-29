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
    };
    this.socket.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      const messages = this.state.messages.concat(receivedMessage);
      this.setState({messages: messages});
    };
  }
  sendMessage = (message) => {
      const newMessage = {username: this.state.currentUser.name, content: message};

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
