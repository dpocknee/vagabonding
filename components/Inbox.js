import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import { View } from 'native-base';
import LoadingComponent from './LoadingComponent';
import { tertiaryColor } from '../styles/Colors.styles';

const { getChatPartnerNames, chatsRef } = require('../Functionality/chatFunctions');
const { getCurrentUserInfo } = require('../Functionality/utilityFunctions');

class Inbox extends Component {
  state = {
    chats: [],
    currentUserID: null,
    currentUsername: null,
    isLoading: true,
  };

  componentDidMount() {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      const userID = user.uid;
      getCurrentUserInfo(userID)
        .then((currentUserInfo) => {
          this.setState(
            {
              currentUserID: userID,
              currentUsername: currentUserInfo.username,
            },
            () => {
              const { currentUserID } = this.state;
              const allUserChats = chatsRef.where('usersArr', 'array-contains', `${currentUserID}`);
              allUserChats.onSnapshot((querySnapshot) => {
                if (querySnapshot.empty === true) {
                  this.setState({
                    isLoading: false,
                  });
                }
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
                        isLoading: false,
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
                        isLoading: false,
                      });
                    });
                  }
                });
              });
            },
          );
        })
        .catch(() => {
          this.props.navigation.navigate('Error');
        });
      unsubscribe();
    });
  }

  render() {
    const {
      chats, currentUserID, currentUsername, isLoading,
    } = this.state;
    const { allNav } = this.props;
    if (isLoading) {
      return <LoadingComponent />;
    }
    if (chats.length === 0) {
      return (
        <View style={{ backgroundColor: tertiaryColor, flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 19,
              alignSelf: 'center',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            There are no conversations to display
          </Text>
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: tertiaryColor }}>
        {chats.map(chat => (
          <TouchableOpacity
            style={{
              margin: 9,
              borderColor: 'black',
              borderWidth: 2,
              backgroundColor: 'white',
              padding: 10,
            }}
            key={`inbox${chat.otherUser}`}
            onPress={() => allNav({
              currentUserID,
              currentUsername,
              selectedUserID: chat.otherUser,
              selectedUserUsername: chat.otherUserUsername,
              selectedUsername: chat.otherUserName,
            })
            }
          >
            <>
              <Text style={{ fontSize: 19, margin: 3 }}>
                {`Conversation with ${chat.otherUserName} (${chat.otherUserUsername})`}
                {' '}
              </Text>
              <Text style={{ fontSize: 16, margin: 3 }}>{`${chat.messages.length} messages`}</Text>
            </>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Inbox;
