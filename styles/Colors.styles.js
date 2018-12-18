const primaryColor = '#1D9FBF';
const secondaryColor = '#16324F';
const tertiaryColor = '#F56463';

const colorSettings = {
  mainBackground: primaryColor,
  // General Text
  mainText: secondaryColor,
  darkText: secondaryColor,
  lightText: 'white',
  // Buttons
  buttonText: 'white',
  buttonBackground: secondaryColor,
  // Checkbox
  checkboxText: this.darkText,
  checkboxBackground: this.primaryColor,
  // Text Input
  textInputBackground: 'white',
  textInputText: this.primaryColor,
  textInputPlaceholder: this.lightText,
  textInputBorder: this.secondaryColor,
  // Gradient
  gradientColor1: '#1D9FBF',
  gradientColor2: ['rgba(225,225,225,225)', 'transparent'],
  // Headers
  headerColor: primaryColor,
  headerTintColor: secondaryColor,
  // Chat Bubbles
  chatYouColor: secondaryColor,
  chatThemColor: tertiaryColor,
  // Inbox
  inboxMessageCard: tertiaryColor,
  inboxMessageText: this.lightText,
};

export {
  primaryColor, secondaryColor, tertiaryColor, colorSettings,
};
