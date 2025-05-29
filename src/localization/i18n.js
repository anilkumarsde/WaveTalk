// i18n.js

import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {NativeModules, Platform} from 'react-native';

// 1. Manually detect device language


// 2. Import translation files
import enLoading from '../localization/locales/en/loding.json'; // English JSON
import hiLoading from '../localization/locales/hi/loding.json'; // Hindi JSON
import enSplass from '../localization/locales/en/splass.json'; // English JSON
import hiSplass from '../localization/locales/hi/splass.json'; // Hindi JSON
import { getDeviceLanguage } from '../assets/checkLanguage';

// 3. Initialize i18n
i18n
  .use(initReactI18next) // Connect with React
  .init({
    resources: {
      en: {
        loading: enLoading,
        splass: enSplass,
      },
      hi: {
        loading: hiLoading,
        splass: hiSplass,
      },
    },

    lng: getDeviceLanguage(), // Set device language
    fallbackLng: 'en', // Use English if device language not available
    defaultNS: 'loading', // Use 'loading' as default namespace
    compatibilityJSON: 'v3', // Make compatible with v3 JSON structure

    debug: __DEV__, // Show debug logs only in development

    interpolation: {
      escapeValue: false, // Not needed for React Native
    },
  });

export default i18n;
