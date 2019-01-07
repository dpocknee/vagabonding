# Northcoders Final Project: Vagabonding

## Overview

**Vagabonding** is a mobile application for geolocation-based messaging and event creation. The app is designed for individuals who are looking for others in the nearby vicinity to share experiences with.

Vagabonding is a mobile app for geolocation-based messaging and event creation. The app is designed for individuals who are looking for others in the nearby vicinity to share experiences with. A typical use scenario would involve a solo-traveller new to a city, opening up the app and messaging another solo-traveller in the same city arranging to meet up the next day to explore the local museums together. Later that day they might want to meet with a group of people in a local pub. They could then use the app to create a public event for this which anyone in the vicinity would be able to see and attend.

## The Team

This app was created over a two-week sprint in December 2018 as the final part of the [Northcoders](http://www.northcoders.com) _Developer Pathway_ course in Manchester. It was made by a team of six people using AGILE-style methodologies, stand-ups, kanban techniques and pair-programming as part of this process.

Made by:

- Kurtis Angell
- Aaron Boniface
- Joanna Cholewa
- Claire McNally
- Hugh Paul
- David Pocknee

with special thanks to Northcoders for their support.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### An important note about using the app

The app is designed for connecting two or more people in a geographical area of 1.5km or less, therefore, to experience all of the functionality of the app (especially the chat function), you will need to have two phones or emulators running the app within 1.5km of each other at the same time.

## Prerequisites

This application requires you to have set up a Google account to be able to sign in and access Google's firebase services.

1. Visit [https://console.firebase.google.com/](https://console.firebase.google.com/) and setup a new project

2. Add Firebase Auth and Firebase Firestore to your project using the menu on the left-hand side of the firebase console.

3. Make a note of your project config codes by clicking on the web setup button on the Auth section of the console. You'll need this information to install the application.

Additionally, to see the application in action its advised that you install the 'expo' application on your smartphone. This will allow you to scan a QR code after installation to see the app running on your phone. Alternatively you can set up iOS and android emulators and view the application running there. See [https://docs.expo.io/versions/latest/](https://docs.expo.io/versions/latest/) for more information.

## Installation

1. Fork and clone this repository

2. Navigate into the downloaded repositrory and install dependencies by running the command `npm install` in the terminal.

3. Create a `config.js` file in the root directory. It should contain the information gained during your firebase setup:

```
import * as firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'YOUR API KEY HERE',
  authDomain: 'YOUR AUTH DOMAIN HERE',
  databaseURL: 'YOUR DATABASE URL HERE',
  projectId: 'YOUR PROJECT ID HERE',
  storageBucket: 'YOUR STORAGE BUCKET INFO HERE',
  messagingSenderId: 'YOUR MESSAGING SENDER ID HERE',
};

const settings = {
  timestampsInSnapshots: true,
};
firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
firestore.settings(settings);

module.exports = { firestore };
```

4. Run the command `npm start`. This will open up a browser window and allow you to either scan the QR code or open an emulator as outlined in the 'Prerequisites' section.

5. The application is designed for use by multiple users, to truly experience the app you may want to get others to scan the QR code so that you can start messaging them, happy chatting!

## Built With

- Node.js
- Expo
- Firebase Auth
- Firebase Firestore
- React Navigation
- React Native
- Gifted Chat
- GeoLib

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
