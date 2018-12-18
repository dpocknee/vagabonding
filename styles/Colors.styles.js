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
  gradientColor1: primaryColor,
  gradientColor2: ['rgba(225,225,225,225)', 'transparent'],
  // Headers
  headerColor: primaryColor,
  headerTintColor: secondaryColor,
  // Chat Bubbles
  chatYouColor: primaryColor,
  chatThemColor: tertiaryColor,
  // Inbox
  inboxMessageCard: tertiaryColor,
  inboxMessageText: this.lightText,
  // Map Screen
  mapPinColor: primaryColor,
  mapCircleFill: 'rgba(204, 210, 192, 0.5)',
  // Hamburger Menu
  hamburgerText: primaryColor,
  menuOverlay: primaryColor,
  iconColor: primaryColor,
  // Loading Spinner
  loadingText: primaryColor,
};

export {
  primaryColor, secondaryColor, tertiaryColor, colorSettings,
};
