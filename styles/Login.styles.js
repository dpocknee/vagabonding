import { colorSettings } from './Colors.styles';

const { mainBackground, mainText } = colorSettings;

const loginStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainBackground,
    color: mainText,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default loginStyles;
