import React, { Component } from 'react';
import {
  View, TextInput, Button, Text,
} from 'react-native';
import { generalStyling } from '../styles/generalStyling.styles';
import { addEvent } from '../Functionality/eventFunctions';

class CreateEvent extends Component {
  state = {
    eventName: '',
    eventLocation: '',
    eventDescription: '',
  };

  render() {
    const { eventName, eventLocation, eventDescription } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Event Name"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newEventName => this.setState({ eventName: newEventName })}
          value={eventName}
        />
        <TextInput
          placeholder="Event Location"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newEventLocation => this.setState({ eventLocation: newEventLocation })}
          value={eventLocation}
        />
        <TextInput
          placeholder="Description"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newDescription => this.setState({ eventDescription: newDescription })}
          value={eventDescription}
        />
        <Button
          title="Create Event"
          rounded
          style={generalStyling.button}
          onPress={() => {
            const eventObj = { eventName, eventLocation, eventDescription };
            addEvent(eventObj).catch((err) => {
              this.props.navigation.push('Error');
            });
            this.props.navigation.navigate('NearbyEvents');
          }}
        >
          <Text style={generalStyling.buttonText}>Create Event</Text>
        </Button>
      </View>
    );
  }
}

export default CreateEvent;
