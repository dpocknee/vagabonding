import React, { Component } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import colours from '../styles/Colours.styles';
import ErrorComponent from './ErrorComponent';

const {
  getPreviousMessages,
  sendMessage,
  chatsRef,
} = require('../Functionality/chatFunctions');

class Chat extends Component {
  state = {
    messages: [],
    doc: '',
  };

  componentWillMount() {
    const { currentUserID, selectedUserID } = this.props;
    getPreviousMessages(currentUserID, selectedUserID)
      .then((messageObj) => {
        chatsRef.doc(messageObj.doc).onSnapshot((doc) => {
          const messages = doc.data().messages.reverse();
          this.setState({
            doc: messageObj.doc,
            messages,
          });
        });
      })
      .catch(() => {
        this.props.navigation.navigate('Error');
      });
  }

  onSend(messages = []) {
    sendMessage(messages[0], this.state.doc).catch(() => {
      this.props.navigation.navigate('Error');
    });
  }

  renderBubble = props => (
    <Bubble
      {...props}
      textStyle={{
        left: {
          color: 'white',
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: colours.cards.color,
        },
        right: {
          backgroundColor: colours.header.backgroundColor,
        },
      }}
    />
  );

  render() {
    const { currentUserID, currentUsername } = this.props;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: currentUserID, name: currentUsername }}
        renderBubble={this.renderBubble}
      />
    );
  }
}

export default Chat;
