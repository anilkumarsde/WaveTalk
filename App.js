import './src/localization/i18n';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import {useColorScheme} from 'react-native';
import useThemeStore from './src/store/themeStore';
import {t} from 'i18next';

const App = () => {
  const theme = useColorScheme();
  const setTheme = useThemeStore(state => state.setTheme);

  useEffect(() => {
    setTheme(theme);
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
