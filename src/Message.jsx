import React, {Component} from 'react';

class Message extends Component {
  render() {
    console.log("Rendering <Message />");
    // set username color
    const userStyle = { color: this.props.message.color };
    return (
        <div className="message">
          <span className="message-username" style={ userStyle }>{this.props.message.username}</span>
          <span className="message-content">{this.props.message.content}</span>
        </div>
    );
  }
}
export default Message;
