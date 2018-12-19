import { colorSettings } from './Colors.styles';

const { signUpBackground } = colorSettings;

const signUpStyles = {
  container: {
    flex: 1,
    backgroundColor: signUpBackground,
    // padding: 30,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: signUpBackground,
  },
  interests: {
    marginTop: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
  },
};

export default signUpStyles;
