import { primaryColor, secondaryColor, colorSettings } from './Colors.styles';

const { darkText, buttonText, buttonBackground } = colorSettings;
const generalFont = 'Thasadith-Regular';
const generalFontBold = 'Thasadith-Bold';

const generalStyling = {
  h1: {
    fontFamily: generalFontBold,
    fontSize: 20,
    color: darkText,
  },
  h2: {
    fontFamily: generalFontBold,
    fontSize: 16,
    color: darkText,
  },
  h3: {
    fontFamily: generalFontBold,
    fontSize: 14,
    color: darkText,
  },
  normal: {
    fontFamily: generalFont,
    fontSize: 12,
    color: darkText,
  },
  checkbox: {
    title: { fontFamily: generalFont, fontSize: 12 },
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    backgroundColor: 'white',
    color: darkText,
  },
  button: {
    marginTop: 5,
    backgroundColor: buttonBackground,
    fontFamily: generalFont,
    width: 50,
  },
  buttonText: {
    fontFamily: generalFont,
    fontSize: 12,
    color: buttonText,
  },
};

export { generalFont, generalStyling };
