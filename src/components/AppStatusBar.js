import {useColorScheme, StatusBar} from 'react-native';
import React from 'react';

const AppStatusBar = ({background}) => {
  const theme = useColorScheme();
  return (
    <StatusBar
      backgroundColor={background}
      barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
    />
  );
};

export default AppStatusBar;
