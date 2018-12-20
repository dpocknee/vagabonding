import { colorSettings } from './Colors.styles';

const {
  darkText,
  buttonText,
  buttonBackground,
  textInputBackground,
  textInputText,
  textInputBorder,
  mainBackground,
} = colorSettings;
// const generalFont = 'Thasadith-Regular';
const generalFontBold = 'Thasadith-Bold';

const createEventStyles = {
  container: {
    flex: 1,
    backgroundColor: mainBackground,
  },
  title: {
    flex: 0.5,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30,
    padding: 10,
    marginBottom: 5,
    color: darkText,
    marginTop: 20,
  },
  textInput: {
    height: 40,
    width: '100%',
    borderColor: textInputBorder,
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: textInputBackground,
    color: textInputText,
    paddingLeft: 5,
    borderRadius: 10,
  },
  inputBoxes: {
    flex: 3,
    padding: 10,
  },
  dateInput: {
    flex: 0.5,
    width: 200,
    height: 10,
    marginTop: 10,
    alignSelf: 'center',
    borderRadius: 10,
  },
  longButton: {
    marginTop: 5,
    backgroundColor: buttonBackground,
    fontFamily: generalFontBold,
    width: 175,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 10,
  },
  buttonText: {
    fontFamily: generalFontBold,
    fontSize: 14,
    color: buttonText,
  },
  buttonBox: {
    flex: 2,
    paddingBottom: 50,
  },
};

export default createEventStyles;
