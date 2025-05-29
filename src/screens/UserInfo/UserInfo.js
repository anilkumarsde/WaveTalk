import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './style';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {loginString} from '../../assets/string';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import colors, {getThemeColors} from '../../assets/colors';
import {useNavigation} from '@react-navigation/native';
import AppStatusBar from '../../components/AppStatusBar';

const UserInfo = () => {
  const theme = useColorScheme();
  const style = getStyle(theme);
  const Color = getThemeColors(theme);
  const [language, setLanguage] = useState('');
  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  const navigation = useNavigation();

  function moveToLoginScreen() {
    navigation.navigate('Login');
  }

  function moveToHomeScreen() {
    navigation.navigate('BottomTabNavigator');
  }

  return (
    <View style={style.container}>
      <AppStatusBar background={theme === 'dark' ? Color?.blue : Color?.blue} />
      {/* <Text>UserInfo</Text> */}
      <View style={style.topWrapper}>
        <View style={style.upperWrapper}>
          <TouchableOpacity style={style.loginBtn} onPress={moveToLoginScreen}>
            <MaterialCommunityIcons
              name="keyboard-backspace"
              size={20}
              color={
                theme === 'dark'
                  ? colors?.darkColors?.lightBlue
                  : colors?.lightColors?.lightBlue
              }
            />
            <Text style={style.loginTxt}>
              {language === 'hi' ? loginString?.loginHi : loginString?.loginEn}
            </Text>
          </TouchableOpacity>
          <Text style={style.register}>
            {language === 'hi'
              ? loginString?.registerHi
              : loginString?.registerEn}
          </Text>
        </View>
      </View>
      <View style={style.middleWrapper}>
        <TouchableOpacity style={style.editWrapper} activeOpacity={0.7}>
          <Feather name="edit-2" size={20} color={'#ffffff'} />
        </TouchableOpacity>
        <View style={style.profileImgwrapper}>
          <FontAwesome6 name="user-large" size={70} color={'#ffffff'} />
        </View>
      </View>
      <View style={style.bottomWrapper}>
        <View style={style.inputWrapper}>
          <FontAwesome6
            name="user-large"
            size={24}
            color={
              theme === 'dark'
                ? colors?.darkColors?.RemembeTxt
                : colors?.lightColors?.RemembeTxt
            }
          />
          <TextInput
            placeholder={
              language === 'hi'
                ? loginString?.userNameHi
                : loginString?.userNameEn
            }
            style={style.inputField}
            placeholderTextColor={
              theme === 'dark'
                ? colors?.darkColors?.text3
                : colors?.lightColors?.text3
            }
            maxLength={20}
          />
        </View>
        <TouchableOpacity
          style={style.nextBtn}
          activeOpacity={0.7}
          onPress={moveToHomeScreen}>
          <AntDesign name="arrowright" color={'#ffffff'} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfo;
