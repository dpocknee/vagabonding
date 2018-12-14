import React, { Component } from 'react';
import {
  View, ScrollView, Text, Button,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import firebase from 'firebase';

const { getChatPartnerNames, chatsRef } = require('../Functionality/chatFunctions');

// console.log('currentUserSTUFF: ', currentUser, currentUserID);
const theme = getTheme();

class Inbox extends Component {
  //* *********NEEDS CURRENT USERID AS PROP*************** */
  state = {
    chats: [],
    loading: true,
  };

  componentDidMount() {
    let currentUserID;
    firebase.auth().onAuthStateChanged((user) => {
      currentUserID = user.uid;
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
            console.log(change.doc.data(), '<<<<< Chat Modified');
          }
        });
      });
    });
  }

  render() {
    const { chats } = this.state;
    return (
      <ScrollView>
        {chats.map((chat, index) => (
          <View style={theme.cardStyle} key={index}>
            <Text style={theme.cardActionStyle}>
              {`Conversation with: ${chat.otherUserName} (${chat.otherUserUsername})`}
              {' '}
            </Text>
            <Text style={theme.cardContentStyle}>{`${chat.messages.length} messages`}</Text>
            {/* <Button title="chat" onPress={() => navigation.navigate('Chat')} /> ******NEEDS CURRENT USERNAME, ID and OTHERUSERID AS PROPS */}
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default Inbox;
