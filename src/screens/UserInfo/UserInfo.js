import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './style';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {loginString} from '../../assets/string';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';

import colors from '../../assets/colors';
import {useNavigation, useRoute} from '@react-navigation/native';
import AppStatusBar from '../../components/AppStatusBar';
import useThemeStore from '../../store/themeStore';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-simple-toast';
import firestore from '@react-native-firebase/firestore';

const UserInfo = () => {
  const theme = useThemeStore(state => state.theme);
  const setUserId = useThemeStore(state => state.setUserId);
  const style = getStyle(theme);
  const [language, setLanguage] = useState('');
  const [name, setName] = useState('');
  const [loding, setLoding] = useState(false);
  const [nameError, setNameError] = useState('');

  const route = useRoute();
  const {email, password} = route.params;

  useEffect(() => {
    console.log('email', email, 'password', password);
  }, [email, password]);

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  const navigation = useNavigation();

  function moveToLoginScreen() {
    navigation.navigate('Login');
  }

  function validate(name) {
    let valid = true;
    if (!name) {
      setNameError('Name is Required');
      valid = false;
    }
    return valid;
  }

  async function signUpHandler(email, password, name) {
    if (validate(name)) {
      setLoding(true);
      try {
        const userCredential = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        const uid = userCredential.user.uid;
        await firestore().collection('user').doc(uid).set({
          name: name,
          email: email,
          password: password,
        });
        // setUserId(uid);
        await AsyncStorage.setItem('userid', `${uid}`);
        console.log('User created successfully', userCredential);
        console.log('user data saved to firestore');
        await AsyncStorage.setItem('isSignUp', 'true'); // ✅ store as string
        Toast.show('Signup Successful');
        navigation.navigate('BottomTabNavigator');
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          Toast.show('Email is already in use');
        } else {
          Toast.show('Something went wrong');
          console.error('Signup Error:', error);
        }
      } finally {
        setLoding(false);
      }
    }
  }

  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].blue} />
      {loding && (
        <View style={style.loadingOverlay}>
          <ActivityIndicator size="large" color="#54da8c" />
        </View>
      )}
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
            color={colors[theme].text2}
          />
          <TextInput
            placeholder={
              language === 'hi'
                ? loginString?.userNameHi
                : loginString?.userNameEn
            }
            style={style.inputField}
            placeholderTextColor={colors[theme].text2}
            maxLength={20}
            value={name}
            onChangeText={setName}
          />
        </View>
        <TouchableOpacity
          style={style.nextBtn}
          activeOpacity={0.2}
          onPress={() => signUpHandler(email, password, name)}>
          <AntDesign name="arrowright" color={colors[theme].text1} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserInfo;
