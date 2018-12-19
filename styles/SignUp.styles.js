import { colorSettings } from './Colors.styles';

const { mainBackground } = colorSettings;

const signUpStyles = {
  container: {
    flex: 1,
    backgroundColor: mainBackground,
    // padding: 30,
  },
  mainView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: mainBackground,
    padding: 20,
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
