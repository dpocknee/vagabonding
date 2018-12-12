import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const {
  userID,
  clickedUserID,
  getPreviousMessages,
  userName,
  sendMessage,
  chatsRef,
} = require('../Functionality/chatFunctions');

class Chat extends Component {
  // Chat will need userID, userName and clickedUserID as props
  state = {
    messages: [],
    doc: '',
  };

  componentWillMount() {
    getPreviousMessages(userID, clickedUserID)
      .then((messageObj) => {
        chatsRef.doc(messageObj.doc).onSnapshot((doc) => {
          const messages = doc.data().messages.reverse();
          this.setState(previousState => ({
            doc: messageObj.doc,
            messages,
          }));
        });
      })
      .catch((err) => {
        console.log(err, '<<<Chat Mount');
      });
  }

  onSend(messages = []) {
    sendMessage(messages[0], this.state.doc)
      .then((newMessage) => {
        //* **** OFFLINE MODE????? ********
        // this.setState(previousState => ({
        //   messages: GiftedChat.append(previousState.messages, [newMessage]),
        // }));
        //* **** OFFLINE MODE????? ********
      })
      .catch((err) => {
        console.log(err, '<<<<sendMessage Error');
      });
  }

  // onReceive(text) {
  //   // (in setState) - messages: GiftedChat.append(previousState.messages, text)
  // }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: userID, name: userName }}
      />
    );
  }
}

export default Chat;
