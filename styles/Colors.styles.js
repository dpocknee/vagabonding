import hexRgb from 'hex-rgb';

// // ORIGINAL
// const primaryLight = '#1D9FBF';
// const primaryDark = '#16324F';
// const complementary = '#F56463';

const primaryLightest = '#FFFFFF';
const primaryLight = '#8ecfdf'; // '#D2F6FE';
const primaryMid = '#1D9FBF'; // '#39D9FF';
const primaryDark = '#0183A2';
const primaryDarkest = '#014555';

const primaryLightHex = hexRgb(primaryLight, { format: 'array' });
const primaryMidHex = hexRgb(primaryMid, { format: 'array' });

// console.log('COOL COLOR: ', primaryMidHex);

const secondaryMid = '#F56463'; // '#F2C04E';
const secondaryLight = 'FFF1D2';

const colorSettings = {
  // ----- General Colors ------
  mainBackground: primaryLight,
  // General Text
  mainText: primaryDarkest,
  lightText: primaryLightest,
  // Buttons
  buttonText: primaryLightest,
  buttonBackground: primaryDarkest,
  // Gradient
  gradientColor1: primaryMid,
  gradientColor2: ['rgba(225,225,225,225)', 'transparent'],
  // Headers
  headerColor: primaryLight,
  headerTintColor: primaryDark,
  // ----- Menu -----
  // Hamburger Menu
  hamburgerText: primaryDark,
  sidebarBackground: primaryLightest,
  menuOverlay: primaryMid,
  iconColor: primaryDark,
  // ----- Loading Spinner ---
  // Loading Spinner
  loadingText: primaryDarkest,
  // ----- Sign Up and Login -----
  // Sign Up
  signUpBackground: primaryLight,
  signUpText: primaryDarkest,
  // Login
  loginBackground: primaryLight,
  loginText: primaryDarkest,
  // Checkbox
  checkboxText: primaryDarkest,
  checkboxBackground: primaryLight,
  // Text Input
  textInputBackground: primaryLightest,
  textInputText: primaryDarkest,
  textInputPlaceholder: primaryLight,
  textInputBorder: primaryDark,
  // ------ Map Screen Components -----
  // Map
  mapPinColor: primaryMid,
  mapCircleFill: `rgba(${primaryLightHex[0]}, ${primaryLightHex[1]}, ${primaryLightHex[2]}, 0.5)`,

  // Users
  usersBackground: primaryLightest,
  usersTitleText: primaryDarkest,
  usersTitleBorder: primaryMid,
  usersCardBackground: `rgba(${primaryMidHex[0]}, ${primaryMidHex[1]}, ${primaryMidHex[2]}, 0.5)`,
  usersCardBorder: primaryLightest,
  usersCardAction: primaryDarkest,
  usersCardContent: primaryDark,
  usersNoNearbyUsers: primaryLight,
  // ------ Inbox -----
  inboxMessageCard: primaryLightest,
  inboxMessageText: primaryLight,
  inboxBackground: secondaryLight,
  inboxCardText: primaryDarkest,
  inboxCardBorder: primaryMid,
  inboxCardBackground: primaryLightest,
  inboxNoMessages: primaryDarkest,
  // --- Chat -----
  // Chat Bubbles
  chatYouBubble: primaryDark,
  chatYouText: primaryLightest,
  chatThemBubble: secondaryMid,
  chatThemText: primaryLightest,
  // --- Errors ---
  errorBackground: secondaryMid,
  errorText: secondaryMid,
};

export { colorSettings, primaryMid };
