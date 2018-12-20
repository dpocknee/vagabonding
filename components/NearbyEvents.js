import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { getNearbyEvents, eventsRef } from '../Functionality/eventFunctions';
import LoadingComponent from './LoadingComponent';
import cardStyles from '../styles/Users.styles';

class NearbyEvents extends Component {
  state = {
    events: [],
    isLoading: true,
  };

  componentDidMount() {
    eventsRef.onSnapshot((querySnapshot) => {
      if (querySnapshot.empty === true) {
        this.setState({
          isLoading: false,
        });
      }
      querySnapshot.docChanges().forEach(() => {
        getNearbyEvents((nearbyEvents) => {
          this.setState({
            events: nearbyEvents,
            isLoading: false,
          });
        });
      });
    });
  }

  render() {
    const { events, isLoading } = this.state;
    if (isLoading) {
      return <LoadingComponent />;
    }
    return (
      <ScrollView>
        <Text style={cardStyles.header}>Scroll down to see events in your area</Text>
        {events.map((eventObj) => {
          const dateArray = new Date(eventObj.info.datetime).toString().split(' ');
          const date = [...dateArray].splice(0, 4).join(' ');
          const time = [...dateArray].splice(4, 1)[0].slice(0, 5);
          return (
            <TouchableOpacity
              style={cardStyles.events}
              key={eventObj.id}
              onPress={() => {
                this.props.navigation.push('EventInfo', { eventObj });
              }}
            >
              <>
                <Text style={cardStyles.eventTitle}>{eventObj.info.eventName}</Text>
                <Text>
                  Where:
                  {eventObj.info.eventLocation}
                </Text>
                <Text>
                  When:
                  {`${date} at ${time}`}
                </Text>
              </>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  }
}

export default NearbyEvents;
