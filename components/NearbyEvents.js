import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'native-base';
import { getNearbyEvents, eventsRef } from '../Functionality/eventFunctions';
import LoadingComponent from './LoadingComponent';
import cardStyles from '../styles/Users.styles';
import MenuWrapper from './MenuWrapper';
import { iconStyles } from '../styles/Hamburger.styles';

class NearbyEvents extends Component {
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
    events: [],
    isLoading: true,
    button: false,
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({ buttonChange: this.buttonChange });

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

  buttonChange = () => {
    this.setState((state) => {
      const buttonClick = !state.button;
      return { button: buttonClick };
    });
  };

  render() {
    const { events, isLoading } = this.state;
    if (isLoading) {
      return <LoadingComponent />;
    }
    return (
      <MenuWrapper
        navigation={this.props.navigation}
        currentPage="createEvent"
        buttonState={this.state.button}
      >
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
      </MenuWrapper>
    );
  }
}

export default NearbyEvents;
