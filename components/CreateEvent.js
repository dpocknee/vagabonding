import React, { Component } from 'react';
import {
  View, TextInput, Text, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import * as firebase from 'firebase';
import { Button, Icon } from 'native-base';
import Textarea from 'react-native-textarea';
import createEventStyles from '../styles/CreateEvent.styles';
import { addEvent } from '../Functionality/eventFunctions';
import { generalStyling } from '../styles/generalStyling.styles';
import MenuWrapper from './MenuWrapper';
import { iconStyles } from '../styles/Hamburger.styles';

class CreateEvent extends Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <Button
        iconLeft
        transparent
        onPress={() => {
          navigation.getParam('buttonChange')();
        }}
        width={50}
      >
        <Icon type="FontAwesome" name="bars" style={iconStyles} />
      </Button>
    ),
  });

  state = {
    eventName: '',
    eventLocation: '',
    eventCity: '',
    eventDescription: '',
    datetime: '',
    currentUserUID: '',
    button: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ buttonChange: this.buttonChange });

    firebase.auth().onAuthStateChanged((currentUser) => {
      if (currentUser) {
        this.setState({
          currentUserUID: currentUser.uid,
        });
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
    const {
      eventName,
      eventLocation,
      eventDescription,
      eventCity,
      datetime,
      currentUserUID,
    } = this.state;
    return (
      <View style={createEventStyles.container}>
        <MenuWrapper
          navigation={this.props.navigation}
          currentPage="createEvent"
          buttonState={this.state.button}
        >
          <KeyboardAvoidingView
            behavior={Platform.select({ android: 'padding', ios: undefined })}
            style={{ flex: 1 }}
            keyboardVerticalOffset={0}
          >
            <View style={createEventStyles.container}>
              <Text style={createEventStyles.title}>Create A New Event</Text>
              <View style={createEventStyles.inputBoxes}>
                <TextInput
                  placeholder="Event Name"
                  autoCapitalize="words"
                  style={createEventStyles.textInput}
                  onChangeText={newEventName => this.setState({ eventName: newEventName })}
                  value={eventName}
                />
                <TextInput
                  placeholder="Event Location"
                  autoCapitalize="words"
                  style={createEventStyles.textInput}
                  onChangeText={newEventLocation => this.setState({ eventLocation: newEventLocation })
                  }
                  value={eventLocation}
                />
                <TextInput
                  placeholder="Event City"
                  autoCapitalize="words"
                  style={createEventStyles.textInput}
                  onChangeText={newEventCity => this.setState({ eventCity: newEventCity })}
                  value={eventCity}
                />
                <Textarea
                  placeholder="Description"
                  autoCapitalize="sentences"
                  maxLength={200}
                  containerStyle={generalStyling.textareaContainer}
                  style={generalStyling.textarea}
                  onChangeText={newDescription => this.setState({ eventDescription: newDescription })
                  }
                  value={eventDescription}
                />

                <View style={createEventStyles.buttonBox}>
                  <DatePicker
                    style={createEventStyles.dateInput}
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
                    onDateChange={(newDatetime) => {
                      this.setState({ datetime: newDatetime });
                    }}
                  />
                  <Button
                    title="Create Event"
                    rounded
                    style={createEventStyles.longButton}
                    onPress={() => {
                      const eventObj = {
                        eventName,
                        eventLocation: `${eventLocation}, ${eventCity}`,
                        eventDescription,
                        datetime: Date.parse(datetime),
                        currentUserUID,
                      };
                      addEvent(eventObj).catch(() => {
                        this.props.navigation.push('Error');
                      });
                      this.props.navigation.navigate('NearbyEvents');
                    }}
                  >
                    <Text style={createEventStyles.buttonText}>Create Event</Text>
                  </Button>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </MenuWrapper>
      </View>
      // Possible Issues with whether or not keyboardWrapper is inside menuwrapper and also how many closing view tags there are
    );
  }
}

export default CreateEvent;
