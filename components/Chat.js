import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const { getPreviousMessages, sendMessage, chatsRef } = require('../Functionality/chatFunctions');

class Chat extends Component {
  // Chat will need currentUserID, currentUserName and selectedUserID as props
  state = {
    messages: [],
    doc: '',
  };

  componentWillMount() {
    const { currentUserID, currentUsername, selectedUserID } = this.props;
    console.log(currentUserID, currentUsername, selectedUserID);
    getPreviousMessages(currentUserID, selectedUserID)
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
    const { currentUserID, currentUserName } = this.props;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: currentUserID, name: currentUserName }}
      />
    );
  }
}

export default Chat;
