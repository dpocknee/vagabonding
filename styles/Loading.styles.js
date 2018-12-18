import { StyleSheet } from 'react-native';
import { colorSettings } from './Colors.styles';

const LoadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    alignItems: 'center',
    padding: 100,
    width: 175,
    height: 175,
  },
  spinner: {
    color: colorSettings.loadingText,
  },
});

export default LoadingStyles;
