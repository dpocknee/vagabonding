import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { getNearbyEvents } from '../Functionality/eventFunctions';

class NearbyEvents extends Component {
  state = {
    events: [],
  };

  componentDidMount() {
    // goGetNearbyEvents.then(nearbyEvents => {})
    getNearbyEvents();
    // set those events in state
  }

  render() {
    const { events } = this.state;
    return (
      <View>
        {events.map(eventObj => eventObj)}
        <Text>No nearby events</Text>
      </View>
    );
  }
}

export default NearbyEvents;
