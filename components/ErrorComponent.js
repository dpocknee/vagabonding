import React from 'react';
import { Text } from 'react-native';

const ErrorComponent = message => (
  <div>
    <Text>
      An error has occured:
      {message}
    </Text>
  </div>
);

export default ErrorComponent;
