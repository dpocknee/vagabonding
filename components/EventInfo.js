import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo';
import profileStyles from '../styles/Profile.styles';

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

    // funcGetGuestNames

    this.setState({
      event: eventInfo,
    });
  }

  render() {
    const { event } = this.state;
    return (
      <View style={profileStyles.wholePage}>
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
            {event.info.guests.map(guest => (
              <Text key={guest}>{guest}</Text>
            ))}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

export default EventInfo;
