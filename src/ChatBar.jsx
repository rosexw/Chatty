import React, {Component} from 'react';

class ChatBar extends Component {
  render() {
    const hiddenStyles = {
      height: '0px', width: '0px', border: 'none', padding: '0px'
    };
    console.log("Rendering <ChatBar />");
    return (
      <form onSubmit={this.handleSubmit}>
        <footer className="chatbar">
          <input className="chatbar-username" placeholder="Your Name (Optional)" defaultValue={this.props.currentUser.name}/>
          <input className="chatbar-message" placeholder="Type a message and hit ENTER" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" style={ hiddenStyles } />
        </footer>
      </form>
    );
  }

  constructor(props) {
    super(props);
    this.state = {value: ''};
  }
  handleChange = (event) => {
    this.setState({value: event.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log("submit", this.state.value);
    this.setState({value: ''});
    this.props.onMessageSend(this.state.value);
  }
}
export default ChatBar;
