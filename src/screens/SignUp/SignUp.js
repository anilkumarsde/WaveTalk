import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {loginString, signUpString} from '../../assets/string';
import CustomInput from '../../components/CustomInput';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import CustomBtn from '../../components/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import useThemeStore from '../../store/themeStore';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp = () => {
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPassWordError] = useState('');
  const [confirmpasswordError, setconfirmPassWordError] = useState('');
  const [loding, setLoding] = useState(false);

  const [confirmSecureTextEntry, setConfirmSecureTextEntry] = useState(true);
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  const navigation = useNavigation();

  function validate() {
    let valid = true;

    // Clear all errors
    setEmailError('');
    setPassWordError('');
    setconfirmPassWordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setEmailError('Email is required');
      setEmail('');
      setPassword('');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a valid email');
      setEmail('');
      setPassword('');
      valid = false;
    }

    if (!Password) {
      setPassWordError('Password is required');
      setEmail('');
      setPassword('');
      valid = false;
    } else if (Password.length < 6) {
      setPassWordError('Password must be at least 6 characters');
      setEmail('');
      setPassword('');
      valid = false;
    }

    if (!confirmPassword) {
      setconfirmPassWordError('Please confirm your password');
      valid = false;
    } else if (confirmPassword.length < 6) {
      setconfirmPassWordError('Confirm Password must be at least 6 characters');
      valid = false;
    } else if (confirmPassword !== Password) {
      setconfirmPassWordError('Please Enter correct Password');
      valid = false;
    }

    return valid;
  }

  function moveBackHandler() {
    navigation.goBack();
  }

  function moveToregister(email, password) {
    if (validate()) {
      navigation.navigate('UserInfo',{email,password});
    }
  }

  // async function signUphandler(email, password) {
  //   if (validate()) {
  //     setLoding(true);
  //     try {
  //       const userCredential = await auth().createUserWithEmailAndPassword(
  //         email,
  //         password,
  //       );
  //       console.log('User created successfully', userCredential);

  //       await AsyncStorage.setItem('isSignUp', 'true'); // ✅ store as string
  //       Toast.show('Signup Successful');

  //       navigation.navigate('UserInfo');
  //     } catch (error) {
  //       if (error.code === 'auth/email-already-in-use') {
  //         Toast.show('Email is already in use');
  //         setEmail('');
  //         setPassword('');
  //         setconfirmPassword('');
  //       } else {
  //         Toast.show('Something went wrong');
  //         console.error('Signup Error:', error);
  //       }
  //     } finally {
  //       setLoding(false);
  //     }
  //   }
  // }
  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].blue} />
      {loding && (
        <View style={style.loadingOverlay}>
          <ActivityIndicator size="large" color="#54da8c" />
        </View>
      )}

      <Text style={style.createAccount}>
        {language === 'en'
          ? signUpString?.createAccountEn
          : signUpString?.createAccountHi}
      </Text>

      <View style={style.mainContainer}>
        <Text style={style.messageTxt}>
          {language === 'en'
            ? signUpString?.messageEn
            : signUpString?.messageHi}
        </Text>

        {/* input field for eamil  */}

        <View style={style.inputBoxWrapper}>
          <CustomInput
            icon={
              <Fontisto
                name="email"
                size={20}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            }
            placeholderTxt={
              language === 'en'
                ? loginString?.messageEn
                : loginString?.messageHi
            }
            value={email}
            setValue={setEmail}
            maxLength={30}
          />
          {emailError && <Text style={style.errorMsg}>{emailError}</Text>}
        </View>

        {/* input field for password */}
        <View style={style.inputBoxWrapper}>
          <CustomInput
            placeholderTxt={
              language === 'en'
                ? loginString?.passwordEn
                : loginString?.passwordHi
            }
            icon={
              <SimpleLineIcons
                name="lock"
                size={20}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            }
            value={Password}
            setValue={setPassword}
            icon1={
              <Feather
                name={secureEntry ? 'eye' : 'eye-off'}
                size={20}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            }
            secureEntry={secureEntry}
            setSecureEntry={setSecureEntry}
            maxLength={6}
          />
          {passwordError && <Text style={style.errorMsg}>{passwordError}</Text>}
        </View>

        {/* confirm password input filed */}

        <View style={style.inputBoxWrapper}>
          <CustomInput
            placeholderTxt={
              language === 'en'
                ? signUpString?.confirmPasswordEn
                : signUpString?.confirmPasswordHi
            }
            icon={
              <SimpleLineIcons
                name="lock"
                size={20}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            }
            value={confirmPassword}
            setValue={setconfirmPassword}
            icon1={
              <Feather
                name={confirmSecureTextEntry ? 'eye' : 'eye-off'}
                size={20}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            }
            secureEntry={confirmSecureTextEntry}
            setSecureEntry={setConfirmSecureTextEntry}
            maxLength={6}
          />
          {confirmpasswordError && (
            <Text style={style.errorMsg}>{confirmpasswordError}</Text>
          )}
        </View>
        <View>
          <CustomBtn
            btnTilte={
              language === 'en' ? loginString.signUpEn : loginString?.signUpHi
            }
            onPress={() => moveToregister(email, Password)}
          />
        </View>

        <View style={style.footerWrapper}>
          <Text style={style.alredyAccTxt}>
            {language === 'en'
              ? signUpString?.alredyAccountEn
              : signUpString?.alredyAccountHi}
          </Text>
          <TouchableOpacity onPress={moveBackHandler}>
            <Text style={style.loginTxt}>
              {language === 'en' ? loginString?.loginEn : loginString?.loginHi}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
