import {useColorScheme, StatusBar} from 'react-native';
import React from 'react';

const AppStatusBar = ({background,barStyle}) => {
  const theme = useColorScheme();
  return (
    <StatusBar
      backgroundColor={background}
      barStyle={barStyle}
    />
  );
};

export default AppStatusBar;
