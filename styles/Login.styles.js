import { colorSettings } from './Colors.styles';

const { loginBackground, loginText } = colorSettings;

const loginStyles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: loginBackground,
    color: loginText,
  },
  buttons: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

export default loginStyles;
