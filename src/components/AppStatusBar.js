import {useColorScheme, StatusBar} from 'react-native';
import React from 'react';
import {getThemeColors} from '../assets/colors';

const AppStatusBar = ({background}) => {
  const theme = useColorScheme();
  // const Colors = getThemeColors(theme);
  return (
    <StatusBar
      backgroundColor={background}
      barStyle={theme === 'dark' ? 'dark-content' : 'light-content'}
    />
  );
};

export default AppStatusBar;
