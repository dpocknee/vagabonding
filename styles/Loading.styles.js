import { StyleSheet } from 'react-native';

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
    padding: 10,
  },
});

export default LoadingStyles;
