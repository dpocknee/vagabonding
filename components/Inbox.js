import React, { Component } from 'react';
import {
  View, ScrollView, Text, Button,
} from 'react-native';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();

class Inbox extends Component {
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
  };

  render() {
    const { chats } = this.state.chats;
    const otherUser = '';
    return (
      <ScrollView>
        {chats.map(chat => (
          <View style={theme.cardStyle} key={chat.id}>
            <Text style={theme.cardActionStyle}>
              {`Conversation with: ${otherUser}`}
              {' '}
            </Text>
            <Text style={theme.cardContentStyle}>SOMETHING ABOUT UNREAD OR NO UNREAD MESSAGES</Text>
            <Button title="chat" onPress={() => navigation.navigate('Chat')} />
          </View>
        ))}
      </ScrollView>
    );
  }
}

export default Inbox;
