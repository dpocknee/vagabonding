import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { getTheme } from 'react-native-material-kit';
import firebase from 'firebase';
import { View } from 'native-base';
import LoadingComponent from './LoadingComponent';
import { colorSettings } from '../styles/Colors.styles';
import cardStyles from '../styles/Users.styles';

const { getChatPartnerNames, chatsRef } = require('../Functionality/chatFunctions');
const { getCurrentUserInfo } = require('../Functionality/utilityFunctions');

const theme = getTheme();

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
        .catch((err) => {
          this.props.navigation.navigate('Error', { error: err });
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
        <View style={{ backgroundColor: colorSettings.inboxBackground, flex: 1, justifyContent: 'center' }}>
          <Text
            style={{
              fontSize: 19,
              alignSelf: 'center',
              color: colorSettings.colorSettings.inboxNoMessages,
              fontWeight: 'bold',
            }}
          >
            There are no conversations to display
          </Text>
        </View>
      );
    }
    return (
      <ScrollView style={{ flex: 1, backgroundColor: colorSettings.headerTintColor }}>
        {chats.map(chat => (
          <TouchableOpacity
            style={cardStyles.inbox}
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
              <Text
                style={[theme.cardActionStyle, ...cardStyles.cardActionStyle]}
              >
                {`Conversation with ${chat.otherUserName} (${chat.otherUserUsername})`}
              </Text>

              <Text
                style={[theme.cardContentStyle, ...cardStyles.cardContentStyle]}
              >
                {`${chat.messages.length} messages`}
              </Text>
            </>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }
}

export default Inbox;
