import React, {Component} from 'react';
import Message from './Message.jsx';

// System message:
// <div className="message system">
//   Anonymous1 changed their name to nomnom.
// </div>
class MessageList extends Component {
  render() {
    console.log("Rendering <MessageList />", this.props.messages);
    return (
      <main className="messages">
        {this.props.messages.map((message) => <Message message={message}  key={message.id} />)}
      </main>
    );
  }
}
export default MessageList;
