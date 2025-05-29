import {
  View,
  Text,
  useColorScheme,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import {useNavigation, useRoute} from '@react-navigation/native';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {loginString} from '../../assets/string';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {OtpInput} from 'react-native-otp-entry';
// import auth from '@react-native-firebase/auth';

const Otp = () => {
  const [language, setLanguage] = useState(null);
  const [isSignUp, setIsSignup] = useState(false);
  const [confirmObj, setConfirmObj] = useState(null);
  const [code, setCode] = useState('');

  const navigation = useNavigation();
  const route = useRoute();

  const {confirmation, number, isSignUp: isFromSignup} = route.params;

  useEffect(() => {
    const lang = getDeviceLanguage();
    setLanguage(lang);
    console.log('Device language:', lang);
  }, []);

  useEffect(() => {
    setConfirmObj(confirmation);
    setIsSignup(isFromSignup);
  }, [confirmation, isFromSignup]);

  const verifyOtpHandler = async enteredCode => {
    if (enteredCode.length < 6) {
      Alert.alert('OTP must be 6 digits');
      return;
    }

    try {
      const userCredential = await confirmObj.confirm(enteredCode);
      console.log('OTP verified, user:', userCredential);

      if (isSignUp) {
        navigation.replace('UserInfo'); // Navigate to user info screen
      } else {
        navigation.replace('BottomTabNavigator'); // Navigate to home screen
      }
    } catch (error) {
      console.log('Invalid OTP:', error);
      Alert.alert(
        'Invalid OTP',
        'The code you entered is incorrect. Please try again.',
      );
    }
  };

  const theme = useColorScheme();
  const style = getStyle(theme);

  return (
    <View style={style.container}>
      <AppStatusBar />

      {/* Header */}
      <View style={style.headerWrapper}>
        <View style={style.topHeader}>
          <Text style={style.loginTxt}>
            {language === 'hi' ? loginString.loginHi : loginString.loginEn}
          </Text>
          <TouchableOpacity style={style.registerBtn}>
            <Text style={style.rememberTxt}>
              {language === 'hi'
                ? loginString.registerHi
                : loginString.registerEn}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={style.msgWrapper}>
          <Text style={style.msgTxt}>
            {language === 'hi'
              ? loginString.OtpMessageHi
              : loginString.OtpMessageEn}
          </Text>
          <View style={style.sentTonumWrapper}>
            <Text style={style.sentToTxt}>
              {language === 'hi'
                ? loginString.OtpSubMessageHi
                : loginString.OtpSubMessageEn}{' '}
              {number}
            </Text>
          </View>
        </View>
      </View>

      <View style={style.middlePart} />

      {/* OTP Section */}
      <View style={style.otpWrapper}>
        <View style={style.timerWrapper}>
          {/* Optional Timer or Resend Button */}
          <TouchableOpacity>
            <Text style={style.resendTxt}>
              {language === 'hi' ? loginString.resendHi : loginString.resendEn}
            </Text>
          </TouchableOpacity>
        </View>

        <OtpInput
          numberOfDigits={6}
          focusColor="#0EAEF6"
          onTextChange={text => setCode(text)}
          theme={{
            pinCodeContainerStyle: style.pinStyle,
            pinCodeTextStyle: style.pinCodetext,
          }}
        />

        <TouchableOpacity
          style={style.nextStepBtn}
          onPress={() => verifyOtpHandler(code)}>
          <AntDesign name="arrowright" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;
