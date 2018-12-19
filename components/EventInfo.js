import React, { Component } from 'react';
import { View, Text } from 'react-native';

class EventInfo extends Component {
  state = {
    event: { stuff: 'I am stuff' },
  };

  render() {
    const { stuff } = this.state.event;
    return (
      <View>
        <Text>I am an event</Text>
      </View>
    );
  }
}

export default EventInfo;
