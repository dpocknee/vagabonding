import React, { Component } from 'react';
import {
  View, TextInput, Button, Text,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import { generalStyling } from '../styles/generalStyling.styles';
import { addEvent } from '../Functionality/eventFunctions';

class CreateEvent extends Component {
  state = {
    eventName: '',
    eventLocation: '',
    eventCity: '',
    eventDescription: '',
    datetime: '',
    currentUserUID: '',
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((currentUser) => {
      this.setState({
        currentUserUID: currentUser.uid,
      });
    });
  }

  render() {
    const {
      eventName,
      eventLocation,
      eventDescription,
      eventCity,
      datetime,
      currentUserUID,
    } = this.state;
    return (
      <View>
        <TextInput
          placeholder="Event Name"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newEventName => this.setState({ eventName: newEventName })
          }
          value={eventName}
        />
        <TextInput
          placeholder="Event Location"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newEventLocation => this.setState({ eventLocation: newEventLocation })
          }
          value={eventLocation}
        />
        <TextInput
          placeholder="Event City"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newEventCity => this.setState({ eventCity: newEventCity })
          }
          value={eventCity}
        />
        <TextInput
          placeholder="Description"
          autoCapitalize="words"
          style={generalStyling.textInput}
          onChangeText={newDescription => this.setState({ eventDescription: newDescription })
          }
          value={eventDescription}
        />
        <DatePicker
          style={{ width: 200 }}
          date={this.state.datetime}
          mode="datetime"
          placeholder="Select date and time"
          format="LLLL"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
          }}
          onDateChange={(datetime) => {
            this.setState({ datetime });
          }}
        />
        <Button
          title="Create Event"
          rounded
          style={generalStyling.button}
          onPress={() => {
            const eventObj = {
              eventName,
              eventLocation: `${eventLocation} ${eventCity}`,
              eventDescription,
              datetime: Date.parse(datetime),
              currentUserUID,
            };
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
