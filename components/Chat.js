import React, { Component } from "react";
import { GiftedChat } from "react-native-gifted-chat";

const {
  getPreviousMessages,
  sendMessage,
  chatsRef
} = require("../Functionality/chatFunctions");

class Chat extends Component {
  state = {
    messages: [],
    doc: "",
    errorMessage: null
  };

  componentWillMount() {
    const { currentUserID, selectedUserID } = this.props;
    getPreviousMessages(currentUserID, selectedUserID)
      .then(messageObj => {
        chatsRef.doc(messageObj.doc).onSnapshot(doc => {
          const messages = doc.data().messages.reverse();
          this.setState({
            doc: messageObj.doc,
            messages
          });
        });
      })
      .catch(err => {
        console.log(err.message, "<<< Error message");
        this.setState({
          errorMessage: err.message
        });
      });
  }

  onSend(messages = []) {
    sendMessage(messages[0], this.state.doc);
  }

  render() {
    const { currentUserID, currentUsername } = this.props;
    const { errorMessage } = this.state;
    errorMessage && <ErrorComponent errorMessage={errorMessage} />;
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{ _id: currentUserID, name: currentUsername }}
      />
    );
  }
}

export default Chat;
