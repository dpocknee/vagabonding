import { colorSettings } from './Colors.styles';

const {
  darkText,
  buttonText,
  buttonBackground,
  textInputBackground,
  textInputText,
  textInputBorder,
} = colorSettings;
const generalFont = 'Thasadith-Regular';
const generalFontBold = 'Thasadith-Bold';

const createEventStyles = {
  title: {
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 30,
    paddingTop: 10,
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
    padding: 20,
  },
};

export default createEventStyles;
