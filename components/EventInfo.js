import React, { Component } from 'react';
import { View, Text } from 'react-native';

class EventInfo extends Component {
  state = {
    event: {
      info: {
        guests: [],
      },
    },
  };

  componentDidMount() {
    const eventInfo = this.props.navigation.getParam('eventObj');
    const dateArray = new Date(eventInfo.info.datetime).toString().split(' ');
    eventInfo.date = [...dateArray].splice(0, 4).join(' ');
    eventInfo.time = [...dateArray].splice(4, 1)[0].slice(0, 5);

    this.setState({
      event: eventInfo,
    });
  }

  render() {
    const { event } = this.state;
    return (
      <View>
        <Text>{event.info.eventName}</Text>
        <Text>{event.info.eventLocation}</Text>
        <Text>{`${event.date} at ${event.time}`}</Text>
        <Text>{event.info.eventDescription}</Text>
        <View>
          <Text>Going:</Text>
          {event.info.guests.map(guest => (
            <Text key={guest}>{guest}</Text>
          ))}
        </View>
      </View>
    );
  }
}

export default EventInfo;
