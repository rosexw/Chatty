import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const data =
  {
    currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
    messages: [], // messages coming from the server will be stored here as they arrive
    userCount: 0
  }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = data;
  }
  // componentDidMount() is invoked after a component is mounted - state in this method is set as data, re-rendering is triggered.
  // username is Anonymous when nothing is typed.
  // messages is an empty array for which we will push messages into as we receive it
  // user count starts at 0 and goes up as more people enter the chatroom. It will live count the number of users and broadcast it.
  componentDidMount() {
    // WebSockets  is an advanced technology that makes it possible to open an interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = (event) => {
      console.log('Connected to server');
    };
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        //both of these cases will concatenate the data as messages and count how many users are in the chat room
        case "incomingMessage":
        case "incomingNotification":
          const messages = this.state.messages.concat(data);
          this.setState({messages: messages});
          break;
        case "incomingCount":
          this.setState({userCount: data.count});
          break;
        //otherwise throw an error
        default:
          throw new Error("Unknown event type: " + data.type);
      }
    };
  }
  sendMessage = (messageEvent) => {
    const {name, message} = messageEvent;
    const newMessage = {type: "incomingMessage", username: name, content: message};

    this.socket.send(JSON.stringify(newMessage));
    this.setName(name);
  }
  setName = (name) => {
    if (name === this.state.currentUser.name) {
      return;
    }
    const content = this.state.currentUser.name + " has changed their name to " + name;

    const newUser = Object.assign({}, this.state.currentUser, { name });
    this.state.currentUser.name = name;
    this.setState({currentUser: newUser});

    const newMessage = {type: "postNotification", content: content};
    this.socket.send(JSON.stringify(newMessage));
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-user-count">{ this.state.userCount } users online</span>
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
