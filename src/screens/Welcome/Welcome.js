import {View, Text, Image, ImageBackground} from 'react-native';
import React, {useEffect} from 'react';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import images from '../../assets/image';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import colors from '../../assets/colors';
import useThemeStore from '../../store/themeStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Welcome = () => {
  const theme = useThemeStore(state => state.theme);
  const Color = colors[theme];
  const style = getStyle(theme);
  const {t} = useTranslation('loading');

  const navigation = useNavigation();

  useEffect(() => {
    const checkAuth = async () => {
      const user = auth().currentUser;
      const isSignUp = await AsyncStorage.getItem('isSignUp');

      setTimeout(() => {
        if (user && isSignUp === 'true') {
          navigation.replace('BottomTabNavigator');
        } else {
          navigation.replace('Splass');
        }
      }, 4000);
    };

    checkAuth();
  }, []);

  return (
    <View style={style.container}>
      {/*  */}
      <AppStatusBar background={colors[theme].background} />
      {/* header */}
      <View style={style.headerWrapper}>
        <Image source={images.logo1} style={style.logo1} />
        <Text style={style.title}>Wave Talk</Text>
      </View>
      {/* main  */}
      <View style={style.mainWrapper}>
        <ImageBackground source={images.chat} style={style.chatImage}>
          <Text style={style.mainTitle}>{t('title')}</Text>
        </ImageBackground>
      </View>
      {/* footer  */}
      <View style={style.footerWrapper}>
        <Text style={style.versionTxt}>Version 2.1.0</Text>
      </View>
    </View>
  );
};

export default Welcome;
