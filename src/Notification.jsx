import React, { Component } from 'react';

class Notification extends Component {
  render() {
    console.log('message', this.props.message);
    return (
      <div className="message system">
        {this.props.message.content}
      </div>
    );
  }
}

export default Notification;
