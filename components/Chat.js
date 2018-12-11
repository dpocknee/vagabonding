import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { userID, clickedUserID } from '../Functionality/chatFunctions';

class Chat extends Component {
  // Chat will need userID and clickedUserID as props
  state = {
    messages: [],
  };

  componentWillMount() {
    // query the database looking for previous messages between the users.
    // if there are. Set the last 20 of these in state
    // if there arent, set to empty array
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
