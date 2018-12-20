# NC-Project

## Northcoders Final Project - Nomad Network

### Note

This project is still in development and as such is still unstable. A stable version of this project will be available from the 'master' branch as of 21/12/2018.

### Overview

TBC is a mobile application for geolocation-based messaging. The app is designed for individuals who are looking for others in the nearby vicinity to share experiences with.

A typical use scenario would involve a solo-traveller new to a city, opening up the app and messaging another solo-traveller in the same city and arranging to meet up the next day to explore the local museums together.

### Collaborators

This application has been made possible by the hard work and dedication of:

- Kurtis Angell
- Aaron Boniface
- Joanna Cholewa
- Claire M
- Hugh Paul
- David Pocknee

with special thanks to Northcoders for their support.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

This application requires you to have set up a Google account to be able to sign in and access Google's firebase services.

1. Visit https://console.firebase.google.com/ and setup a new project

2. Add Firebase Auth and Firebase Firestore to your project using the menu on the left-hand side of the firebase console.

3. Make a note of your project config codes by clicking on the web setup button on the Auth section of the console. You'll need this information to install the application.

Additionally, to see the application in action its advised that you install the 'expo' application on your smartphone. This will allow you to scan a QR code after installation to see the app running on your phone. Alternatively you can set up iOS and android emulators and view the application running there. See https://docs.expo.io/versions/latest/ for more information.

### Installation

1. Fork and clone the repository from:
   https://github.com/Lluran/NC-Project.git

2. Install dependencies by running the command:

```
$ npm i
```

3. Create a config.js file in the root directory. It should contain the information gained during your firebase setup:

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

4. Run the command:

```
$ npm start
```

This will open up a browser window and allow you to either scan the QR code or open an emulator as outlined in the 'Prerequisites' section.

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
