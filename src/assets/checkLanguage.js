// utils/getDeviceLanguage.js
import * as RNLocalize from 'react-native-localize';

export const getDeviceLanguage = () => {
  const locales = RNLocalize.getLocales();
  if (Array.isArray(locales) && locales.length > 0) {
    return locales[0].languageCode; // 'hi' or 'en'
  }
  return 'en';
};
