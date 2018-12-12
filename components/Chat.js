import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const { userID, clickedUserID, getPreviousMessages } = require('../Functionality/chatFunctions');

class Chat extends Component {
  // Chat will need userID and clickedUserID as props
  state = {
    messages: [],
  };

  componentWillMount() {
    getPreviousMessages(userID, clickedUserID)
      .then((previousMessages) => {
        this.setState({
          messages: previousMessages,
        });
      })
      .catch((err) => {
        console.log(err, '<<<Chat Mount');
      });
  }

  onSend(messages = []) {
    // send message to database
    // (in setState) - messages: GiftedChat.append(previousState.messages, messages)
  }

  onReceive(text) {
    // (in setState) - messages: GiftedChat.append(previousState.messages, text)
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: userID }}
      />
    );
  }
}

export default Chat;
