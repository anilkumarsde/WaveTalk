import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {loginString} from '../../assets/string';
import images from '../../assets/image';
import CustomInput from '../../components/CustomInput';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import CustomBtn from '../../components/CustomBtn';
import {useNavigation} from '@react-navigation/native';
import useThemeStore from '../../store/themeStore';
import auth from '@react-native-firebase/auth';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Image } from 'react-native-svg';
// import images from '../../assets/image';

const Login = () => {
  const [language, setLanguage] = useState('en');
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoding] = useState(false);
  const [secureEntry, setSecureEntry] = useState(true);
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  const navigation = useNavigation();
  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  function moveToSignUpscreenHanlder() {
    navigation.navigate('SignUp');
  }
  function validate(email, Password) {
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    setEmailError('');
    setPasswordError('');
    if (!email) {
      setEmailError('Email is required');
      setEmail('');
      setPassword('');
      valid = false;
    } else if (!emailRegex.test(email)) {
      setEmailError('Enter a Valid Email');
      setEmail('');
      setPassword('');
      valid = false;
    }
    if (!Password) {
      setPasswordError('Password is required');
      setEmail('');
      setPassword('');
      valid = false;
    } else if (Password.length < 6) {
      setPasswordError('Password must be of 6 digits');
      setEmail('');
      setPassword('');
      valid = false;
    }
    return valid;
  }

  async function loginHandler(email, password) {
    console.log('📧 Email:', email);
    console.log('🔐 Password:', password);

    if (validate(email, password)) {
      setLoding(true);
      try {
        const userCredential = await auth().signInWithEmailAndPassword(
          email,
          password,
        );
        await AsyncStorage.setItem('isSignUp', 'true');
        Toast.show('Login Successful');
        navigation.navigate('BottomTabNavigator');
      } catch (error) {
        console.log('🔥 Error Code:', error.code);
        console.log('🔥 Error Message:', error.message);

        switch (error.code) {
          case 'auth/invalid-email':
            Toast.show('Invalid email address');
            break;
          case 'auth/user-not-found':
            Toast.show('No user found with this email');
            break;

          case 'auth/wrong-password':
            Toast.show('Wrong password');
            break;
          case 'auth/invalid-credential':
            Toast.show('Invalid credentials');
            break;
          default:
            Toast.show('Something went wrong');
        }
      } finally {
        setLoding(false);
      }
    }
  }

  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].blue} />
      <Text style={style.greetingText}>
        {language === 'en'
          ? loginString.greetingMessageEn
          : loginString.greetingMessageHi}
      </Text>
      <KeyboardAvoidingView style={style.mainContainer}>
        <View style={style.topContainer}>
          <View style={style.logoContainer}>
            <Image source={images?.logo1} style={style.logoImage} />
            <Text style={style.appName}>Wave Talk</Text>
          </View>
          <Text style={style.instructionText}>
            {language === 'en'
              ? loginString.instructionMessageEn
              : loginString.instructionMessageHi}
          </Text>
        </View>

        {/* input field for email  */}
        <View>
          <CustomInput
            placeholderTxt={
              language === 'en' ? loginString.messageEn : loginString.messageHi
            }
            maxLength={30}
            icon={
              <Fontisto
                name="email"
                size={20}
                color={theme === 'dark' ? '#fff' : '#000'}
              />
            }
            value={email}
            setValue={setEmail}
          />
          {emailError && <Text style={style.errorMsg}>{emailError}</Text>}
        </View>
        {/* input field for password */}

        <View style={style.inputwrapper}>
          <CustomInput
            placeholderTxt={
              language === 'en'
                ? loginString.passwordEn
                : loginString.passwordHi
            }
            maxLength={6}
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
          />
          {passwordError && <Text style={style.errorMsg}>{passwordError}</Text>}
        </View>

        <CustomBtn
          onPress={() => loginHandler(email, Password)}
          btnTilte={
            language === 'en' ? loginString?.loginEn : loginString?.loginHi
          }
        />

        <View style={style.footerContainer}>
          <Text style={style.noAccountTxt}>
            {language === 'en'
              ? loginString?.switchSignUpEn
              : loginString?.switchSignUpHi}
          </Text>
          <TouchableOpacity onPress={moveToSignUpscreenHanlder}>
            <Text style={style.signUpTxt}>
              {language === 'en'
                ? loginString?.signUpEn
                : loginString?.signUpHi}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;
