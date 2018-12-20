import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import * as firebase from 'firebase';
import { getGuestNames, joinEvent } from '../Functionality/eventFunctions';

class EventInfo extends Component {
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
    const eventInfo = this.props.navigation.getParam('eventObj');
    const dateArray = new Date(eventInfo.info.datetime).toString().split(' ');
    eventInfo.date = [...dateArray].splice(0, 4).join(' ');
    eventInfo.time = [...dateArray].splice(4, 1)[0].slice(0, 5);

    firebase.auth().onAuthStateChanged((currentUser) => {
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
    });
  }

  render() {
    const { event, user } = this.state;
    return (
      <View>
        <Text>{event.info.eventName}</Text>
        <Text>
          Where:
          {event.info.eventLocation}
        </Text>
        <Text>
          When:
          {`${event.date} at ${event.time}`}
        </Text>
        <Text>
          What:
          {event.info.eventDescription}
        </Text>
        <View>
          <Text>Going:</Text>
          {event.guestNames.map((guest, index) => (
            <Text key={event.info.guests[index] || Math.random() * 100}>{guest}</Text>
          ))}
        </View>

        {!user && (
          <Button
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
      </View>
    );
  }
}

export default EventInfo;
