import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import profileStyles from '../styles/Profile.styles';
import { getGuestNames, joinEvent } from '../Functionality/eventFunctions';
import MenuWrapper from './MenuWrapper';
import { titleStyles } from '../styles/Hamburger.styles';
import createEventStyles from '../styles/CreateEvent.styles';

class EventInfo extends Component {
  static navigationOptions = () => ({
    title: 'Event Info',
    ...titleStyles,
  });

  state = {
    event: {
      guestNames: [],
      info: {
        guests: [],
      },
    },
    user: true,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ buttonChange: this.buttonChange });

    const eventInfo = this.props.navigation.getParam('eventObj');
    const dateArray = new Date(eventInfo.info.datetime).toString().split(' ');
    eventInfo.date = [...dateArray].splice(0, 4).join(' ');
    eventInfo.time = [...dateArray].splice(4, 1)[0].slice(0, 5);

    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        const { uid } = currentUser;
        if (eventInfo.info.guests.includes(uid)) {
          getGuestNames(eventInfo.info.guests, (err, guestNames) => {
            eventInfo.guestNames = guestNames;
            this.setState({
              event: eventInfo,
            });
          });
        } else {
          getGuestNames(eventInfo.info.guests, (err, guestNames) => {
            eventInfo.guestNames = guestNames;
            this.setState({
              event: eventInfo,
              user: false,
            });
          });
        }
      }
    });
  }

  buttonChange = () => {
    this.setState((state) => {
      const buttonClick = !state.button;
      return { button: buttonClick };
    });
  };

  render() {
    const { event, user } = this.state;
    const { navigation } = this.props;
    return (
      <View style={profileStyles.wholePage}>
        <MenuWrapper
          navigation={navigation}
          currentPage="eventInfo"
          buttonState={this.state.button}
        >
          <LinearGradient
            colors={['rgba(225,225,225,225)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              // height: 300
            }}
          >
            <Text style={profileStyles.name}>{event.info.eventName}</Text>
            <View style={profileStyles.info}>
              <Text>
                <Text style={profileStyles.catInfo}>Where:</Text>
                {event.info.eventLocation}
              </Text>
              <Text>
                <Text style={profileStyles.catInfo}>When:</Text>
                {`${event.date} at ${event.time}`}
              </Text>
              <Text>
                <Text style={profileStyles.catInfo}>What:</Text>
                {event.info.eventDescription}
              </Text>
            </View>
            <View style={profileStyles.info}>
              <Text style={profileStyles.catInfo}>Going:</Text>
              {event.guestNames.map((guest, index) => (
                <Text key={event.info.guests[index] || Math.random() * 100}>{guest}</Text>
              ))}
            </View>
            {!user && (
              <Button
                style={createEventStyles.longButton}
                title="Join event"
                onPress={() => {
                  joinEvent(event.id, (err, newName) => {
                    const array = [...event.guestNames, newName];
                    this.setState(prevState => ({
                      event: { ...prevState.event, guestNames: array },
                      user: true,
                    }));
                  });
                }}
              />
            )}
          </LinearGradient>
        </MenuWrapper>
      </View>
    );
  }
}

export default EventInfo;
