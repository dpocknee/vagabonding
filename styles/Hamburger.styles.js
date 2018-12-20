import { colorSettings } from './Colors.styles';
import { generalFontBold } from './generalStyling.styles';

const drawerStyles = {
  drawer: {
    backgroundColor: 'transparent',
    height: 100,
  },
  main: {
    paddingLeft: 0,
    paddingTop: 0,
    backgroundColor: 'transparent',
  },
  drawerOverlay: {
    opacity: 0,
  },
  mainOverlay: {
    opacity: 0,
    backgroundColor: colorSettings.menuOverlay,
    shadowColor: colorSettings.menuOverlay,
    shadowOpacity: 0.8,
  },
  // Check here for native-base drawer styles: https://github.com/root-two/react-native-drawer
  // The native-base drawer component uses the same props as react-native-drawer.
};
const sidebarStyles = {
  container: {
    backgroundColor: colorSettings.sidebarBackground,
    opacity: 0.8,
    width: '60%',
    flex: 0.9,
    paddingTop: 20,
    borderRadius: 10,
  },
  content: {
    paddingTop: 0,
  },
  contentMap: {
    paddingTop: 50,
  },
  menuTextStyle: { left: 5, color: colorSettings.hamburgerText, fontFamily: generalFontBold },
};

const titleStyles = {
  headerStyle: {
    // backgroundColor: colorSettings.headerColor,
    // headerTransparent: true,
    //THIS MAY BREAK THE HEADER STYLING
  },
  headerTintColor: colorSettings.headerTintColor,
  headerTitleStyle: {
    fontFamily: generalFontBold,
  },
};

const iconStyles = {
  color: colorSettings.iconColor,
};

export {
  sidebarStyles, drawerStyles, titleStyles, iconStyles,
};
