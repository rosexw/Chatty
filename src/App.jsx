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
  sendMessage = (messageEvent) => {
    const {name, message} = messageEvent;
    console.log(messageEvent);

    const newMessage = {username: name, content: message};

    this.socket.send(JSON.stringify(newMessage));
    this.setName(name);
  }
  setName = (name) => {
    const newUser = Object.assign({}, this.state.currentUser, { name });
    this.setState({currentUser: newUser});
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
          onNameChange={this.setName}
         />
      </div>
    );
  }
}
export default App;
