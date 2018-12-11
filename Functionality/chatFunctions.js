const { firestore } = require('../config');

const userID = '1234';
const clickedUserID = '5678';
const chatsRef = firestore.collection('chats');

console.log(new Date());

chatsRef
  .doc(`${userID}${clickedUserID}`)
  .set({
    users: [`${userID}${clickedUserID}`, `${clickedUserID}${userID}`],
    messages: [
      {
        _id: '1',
        text: 'My message',
        createdAt: `${new Date()}`,
        user: {
          _id: userID,
          name: 'React Native',
        },
        // Any additional custom parameters are passed through
      },
    ],
  })
  .catch((err) => {
    console.log(err, '<<<< Setting Test Message');
  });

const getPreviousMessages = async (currentUser, clickedUser) => {
  // query the database looking for previous messages between the users.
  const queryPreviousChatHistory = chatsRef.where(
    'users',
    'array-contains',
    `${currentUser}${clickedUser}`,
  );
  return queryPreviousChatHistory
    .get()
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        return [];
      }
      const previousMessages = [];
      querySnapshot.forEach((doc) => {
        previousMessages.push(doc.data().messages);
      });
      return previousMessages[0].splice(-20);
    })
    .catch((err) => {
      console.log(err, '<<<<<Get Previous Messages');
    });
  // return this if it exists, otherwise return empty array
};

module.exports = {
  userID,
  clickedUserID,
  getPreviousMessages,
};
