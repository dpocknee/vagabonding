import * as firebase from 'firebase';
import 'firebase/firestore';
import * as Expo from 'expo';

const { firestore } = require('../config');

const eventsRef = firestore.collection('events');

// Function takes an object of event info
// Creates a new object formatted for firestore storage
// Set new object in events collection

const getEventCoords = async locationString => Expo.Location.geocodeAsync(locationString);

const addEvent = async (eventObj) => {
  const {
    eventLocation,
    eventName,
    eventDescription,
    datetime,
    currentUserUID,
  } = eventObj;
  return getEventCoords(eventLocation).then((locationObj) => {
    const { latitude, longitude } = locationObj[0];
    const newEvent = {
      location: { latitude, longitude },
      eventName,
      eventDescription,
      eventLocation,
      datetime,
      guests: [currentUserUID],
    };
    return eventsRef.doc().set(newEvent);
  });
};

export { addEvent, getEventCoords };
