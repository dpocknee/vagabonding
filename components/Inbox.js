import React, { Component } from 'react';
import {
  View, ScrollView, Text, Button,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';
import firebase from 'firebase';

const { getChats, getChatPartnerNames } = require('../Functionality/chatFunctions');

// console.log('currentUserSTUFF: ', currentUser, currentUserID);
const theme = getTheme();

class Inbox extends Component {
  //* *********NEEDS CURRENT USERID AS PROP*************** */

  // static navigationOptions = ({ navigation }) => ({
  //   headerTransparent: true,
  //   headerLeft: (
  //     <Button
  //       iconLeft
  //       transparent
  //       onPress={() => {
  //         navigation.getParam('drawerStatus')();
  //       }}
  //       width={50}
  //     >
  //       <Icon type="FontAwesome" name="bars" />
  //     </Button>
  //   ),
  // });

  state = {
    chats: [],
    loading: true,
  };

  componentDidMount() {
    let currentUserID;
    firebase.auth().onAuthStateChanged((user) => {
      currentUserID = user.uid;
      return getChats(currentUserID).then((chats) => {
        const completedChatObjs = chats.map(chatObj => getChatPartnerNames(chatObj.otherUser).then((chatPartnerObj) => {
          const compObj = {
            ...chatObj,
            otherUserUsername: chatPartnerObj.username,
            otherUserName: chatPartnerObj.name,
          };
          return compObj;
        }));
        Promise.all(completedChatObjs).then(result => this.setState({
          chats: result,
        }));

        // this.setState({
        //   chats: completedChatObjs,
        // });
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
