import hexRgb from 'hex-rgb';

// // ORIGINAL
// const primaryLight = '#1D9FBF';
// const primaryDark = '#16324F';
// const complementary = '#F56463';

const primaryLightest = '#FFFFFF';
const primaryLight = '#D2F6FE';
const primaryMid = '#1D9FBF'; // '#39D9FF';
const primaryDark = '#0183A2';
const primaryDarkest = '#014555';

const primaryLightHex = hexRgb(primaryLight, { format: 'array' });
const primaryMidHex = hexRgb(primaryMid, { format: 'array' });

const secondaryMid = '#F2C04E';
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
  hamburgerText: primaryMid,
  menuOverlay: primaryMid,
  iconColor: primaryMid,
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
  chatYouColor: primaryDarkest,
  chatThemColor: secondaryMid,
};

export { colorSettings, primaryMid };

/* As hex codes */

// .color-primary-0 { color: #39D9FF }	/* Main Primary color */
// .color-primary-1 { color: #FFFFFF }
// .color-primary-2 { color: #D2F6FE }
// .color-primary-3 { color: #0183A2 }
// .color-primary-4 { color: #014555 }

// .color-secondary-1-0 { color: #FFC133 }	/* Main Secondary color (1) */
// .color-secondary-1-1 { color: #FFFFFF }
// .color-secondary-1-2 { color: #FFF1D2 }
// .color-secondary-1-3 { color: #FFB100 }
// .color-secondary-1-4 { color: #895F00 }

// .color-secondary-2-0 { color: #FF4A33 }	/* Main Secondary color (2) */
// .color-secondary-2-1 { color: #FFFFFF }
// .color-secondary-2-2 { color: #FFD7D2 }
// .color-secondary-2-3 { color: #FF1E00 }
// .color-secondary-2-4 { color: #891000 }
