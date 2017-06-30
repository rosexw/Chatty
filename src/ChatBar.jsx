import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: this.props.currentUser.name,
      messageValue: ""
    };
  }
  handleNameChange = (event) => {
    const username = event.target.value;
    this.setState({nameValue: username});
  }

  handleMessageChange = (event) => {
    const messages = event.target.value;
    this.setState({messageValue: event.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onMessageSend({
      name: this.state.nameValue,
      message: this.state.messageValue
    });
    this.setState({messageValue: ''});
  }
  render() {
    const hiddenStyles = {
      height: '0px', width: '0px', border: 'none', padding: '0px'
    };
    console.log("Rendering <ChatBar />");
    return (
      <form className="chatbar-username-form" onSubmit={this.handleSubmit}>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.state.nameValue} onChange={this.handleNameChange} />
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.messageValue} onChange={this.handleMessageChange} />
          <input type="submit" style={ hiddenStyles } />
        </footer>
      </form>
    );
  }
}

export default ChatBar;
