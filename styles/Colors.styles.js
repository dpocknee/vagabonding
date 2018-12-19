const primaryColor = '#1D9FBF';
const secondaryColor = '#16324F';
const tertiaryColor = '#F56463';

const colorSettings = {
  // ----- General Colors ------
  mainBackground: primaryColor,
  // General Text
  mainText: secondaryColor,
  darkText: secondaryColor,
  lightText: 'white',
  // Buttons
  buttonText: 'white',
  buttonBackground: secondaryColor,
  // Gradient
  gradientColor1: primaryColor,
  gradientColor2: ['rgba(225,225,225,225)', 'transparent'],
  // Headers
  headerColor: primaryColor,
  headerTintColor: secondaryColor,

  // ----- Menu -----
  // Hamburger Menu
  hamburgerText: primaryColor,
  menuOverlay: primaryColor,
  iconColor: primaryColor,

  // ----- Loading Spinner ---
  // Loading Spinner
  loadingText: primaryColor,

  // ----- Sign Up and Login -----
  // Sign Up
  signUpBackground: this.mainBackground,
  signUpText: this.darkText,
  // Login
  loginBackground: this.mainBackground,
  loginText: this.darkText,
  // Checkbox
  checkboxText: this.darkText,
  checkboxBackground: this.primaryColor,
  // Text Input
  textInputBackground: 'white',
  textInputText: this.primaryColor,
  textInputPlaceholder: this.lightText,
  textInputBorder: this.secondaryColor,

  // ------ Map Screen Components -----
  // Map
  mapPinColor: primaryColor,
  mapCircleFill: 'rgba(204, 210, 192, 0.5)',
  // Users
  usersBackground: 'rgba(29, 159, 191, 0.5)',
  usersTitleText: this.lightText,
  usersTitleBorder: this.lightText,
  usersCardBackground: primaryColor,
  usersCardBorder: primaryColor,
  usersCardAction: secondaryColor,
  usersCardContent: 'rgba(255, 255, 255, 0.9)',
  // ------ Inbox -----
  inboxMessageCard: tertiaryColor,
  inboxMessageText: this.lightText,
  inboxBackground: this.tertiaryColor,
  // --- Chat -----
  // Chat Bubbles
  chatYouColor: primaryColor,
  chatThemColor: tertiaryColor,
};

export {
  primaryColor, secondaryColor, tertiaryColor, colorSettings,
};
