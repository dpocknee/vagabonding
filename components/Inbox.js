import React, { Component } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import { getTheme } from "react-native-material-kit";
import firebase from "firebase";

const {
  getChatPartnerNames,
  chatsRef
} = require("../Functionality/chatFunctions");
const { getCurrentUserInfo } = require("../Functionality/utilityFunctions");

const theme = getTheme();

class Inbox extends Component {
  state = {
    chats: [],
    currentUserID: null,
    currentUsername: null,
    errorMessage: null
  };

  componentDidMount() {
<<<<<<< HEAD
    let currentUserID;
    firebase.auth().onAuthStateChanged(user => {
      currentUserID = user.uid;
      getCurrentUserInfo(currentUserID).then(currentUserInfo => {
        this.setState({
          currentUserID,
          currentUsername: currentUserInfo.username
        });
      });
      const allUserChats = chatsRef.where(
        "usersArr",
        "array-contains",
        `${currentUserID}`
      );
      allUserChats.onSnapshot(querySnapshot => {
        querySnapshot.docChanges().forEach(change => {
          if (change.type === "added") {
            const chatObj = {};
            change.doc.data().usersArr[0] === currentUserID
              ? (chatObj.otherUser = change.doc.data().usersArr[1])
              : (chatObj.otherUser = change.doc.data().usersArr[0]);
            chatObj.messages = change.doc.data().messages;
            getChatPartnerNames(chatObj.otherUser)
              .then(chatPartnerObj => {
                const compObj = {
                  ...chatObj,
                  otherUserUsername: chatPartnerObj.username,
                  otherUserName: chatPartnerObj.name
                };
                this.setState(previousState => ({
                  chats: [...previousState.chats, compObj]
                }));
              })
              .catch(err => {
                this.setState({
                  errorMessage: err.message
                });
              });
          }
          if (change.type === "modified") {
            const chatObj = {};
            change.doc.data().usersArr[0] === currentUserID
              ? (chatObj.otherUser = change.doc.data().usersArr[1])
              : (chatObj.otherUser = change.doc.data().usersArr[0]);
            chatObj.messages = change.doc.data().messages;
            getChatPartnerNames(chatObj.otherUser)
              .then(chatPartnerObj => {
                const compObj = {
                  ...chatObj,
                  otherUserUsername: chatPartnerObj.username,
                  otherUserName: chatPartnerObj.name
                };
                const currentChats = [...this.state.chats];
                const oldChats = currentChats.filter(
                  chatObject => chatObject.otherUser !== compObj.otherUser
                );
                this.setState({
                  chats: [...oldChats, compObj]
                });
              })
              .catch(err => {
                this.setState({
                  errorMessage: err.message
                });
              });
          }
        });
=======
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      const userID = user.uid;
      getCurrentUserInfo(userID).then((currentUserInfo) => {
        this.setState(
          {
            currentUserID: userID,
            currentUsername: currentUserInfo.username,
          },
          () => {
            const { currentUserID } = this.state;
            const allUserChats = chatsRef.where('usersArr', 'array-contains', `${currentUserID}`);
            allUserChats.onSnapshot((querySnapshot) => {
              querySnapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                  const chatObj = {};
                  change.doc.data().usersArr[0] === currentUserID
                    ? (chatObj.otherUser = change.doc.data().usersArr[1])
                    : (chatObj.otherUser = change.doc.data().usersArr[0]);
                  chatObj.messages = change.doc.data().messages;
                  getChatPartnerNames(chatObj.otherUser).then((chatPartnerObj) => {
                    const compObj = {
                      ...chatObj,
                      otherUserUsername: chatPartnerObj.username,
                      otherUserName: chatPartnerObj.name,
                    };
                    this.setState(previousState => ({
                      chats: [...previousState.chats, compObj],
                    }));
                  });
                }
                if (change.type === 'modified') {
                  const chatObj = {};
                  change.doc.data().usersArr[0] === currentUserID
                    ? (chatObj.otherUser = change.doc.data().usersArr[1])
                    : (chatObj.otherUser = change.doc.data().usersArr[0]);
                  chatObj.messages = change.doc.data().messages;
                  getChatPartnerNames(chatObj.otherUser).then((chatPartnerObj) => {
                    const compObj = {
                      ...chatObj,
                      otherUserUsername: chatPartnerObj.username,
                      otherUserName: chatPartnerObj.name,
                    };
                    const currentChats = [...this.state.chats];
                    const oldChats = currentChats.filter(
                      chatObject => chatObject.otherUser !== compObj.otherUser,
                    );
                    this.setState({
                      chats: [...oldChats, compObj],
                    });
                  });
                }
              });
            });
          },
        );
>>>>>>> 258accdb82a9558130f094f02408bf4fdccb98a5
      });
      unsubscribe();
    });
  }

  render() {
    const { chats, currentUserID, currentUsername, errorMessage } = this.state;
    const { allNav } = this.props;
    errorMessage && <ErrorComponent errorMessage={errorMessage} />;
    return (
      <ScrollView>
        {chats.map(chat => (
          <TouchableOpacity
            style={theme.cardStyle}
            key={`inbox${chat.otherUser}`}
            onPress={() =>
              allNav({
                currentUserID,
                currentUsername,
                selectedUserID: chat.otherUser,
                selectedUserUsername: chat.otherUserUsername,
                selectedUsername: chat.otherUserName
              })
            }
          >
            <>
              <Text style={theme.cardActionStyle}>
                {`Conversation with: ${chat.otherUserName} (${
                  chat.otherUserUsername
                })`}{" "}
              </Text>
              <Text style={theme.cardContentStyle}>{`${
                chat.messages.length
              } messages`}</Text>
            </>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Inbox;
