import React, { Component } from 'react';
import { View, Text } from 'react-native';

class NearbyEvents extends Component {
  state = {
    events: [],
  };

  render() {
    const { events } = this.state;
    return (
      <View>
        <Text>No nearby events</Text>
      </View>
    );
  }
}

export default NearbyEvents;
