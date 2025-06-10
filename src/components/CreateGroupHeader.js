import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import {getDeviceLanguage} from '../assets/checkLanguage';
import {groupScreen} from '../assets/string';
import Fonts from '../assets/Fonts';

const {height, width} = Dimensions.get('window');

const CreateGroupHeader = () => {
  const [language, setLanguage] = useState('en');
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  const Color = colors[theme];
  const navigation = useNavigation();

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  return (
    <View style={style.container}>
      <View style={style.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.iconWrapper}>
          <Icon name="arrow-back" size={20} color={Color.white} />
        </TouchableOpacity>
        <Text style={style.title}>
          {language == 'en'
            ? groupScreen?.createGroupEn
            : groupScreen?.createGroupHi}
        </Text>
      </View>
      <View style={style.mainContainer}>
        <Text style={style.label}>
          {language === 'en'
            ? groupScreen.groupNameEn
            : groupScreen.groupNameHi}
        </Text>

        <TextInput
          style={style.inputWrapper}
          placeholder={
            language == 'en'
              ? groupScreen?.enterGroupEn
              : groupScreen?.enterGroupHi
          }
          placeholderTextColor={colors[theme].text3}
        />
        <View style={style.addMemberWrapper}>
          <Text style={style.label}>
            {language == 'en' ? groupScreen?.MembersEn : groupScreen?.MembersHn}
          </Text>

          <TouchableOpacity style={style.addMemberButton}>
            <Text style={style.addMemberText}>
              {language == 'en' ? 'Add Member' : 'सदस्य जोड़ें'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*  */}
    </View>
  );
};

export default CreateGroupHeader;

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Color.lightBlue,
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.025,
    },
    iconWrapper: {},
    title: {
      fontSize: width * 0.054,
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.white,
      flex: 1,
      textAlign: 'center',
    },
    mainContainer: {
      backgroundColor: Color.background,
      paddingHorizontal: width * 0.04,
      paddingTop: height * 0.02,
    },
    label: {
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoRegular,
      color: Color.text3,
      marginBottom: height * 0.005,
    },
    inputWrapper: {
      width: '100%',
      borderWidth: 0.5,
      borderColor: Color.border,
      borderRadius: width * 0.02,
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
      backgroundColor: Color.background,
      elevation: 0.5,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoRegular,
      color: Color.placeholder,
    },
    addMemberButton: {
      marginTop: height * 0.01,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.04,
      backgroundColor: Color.lightBlue,
      borderRadius: width * 0.02,
      alignItems: 'center',
      justifyContent: 'center',
    },

    addMemberText: {
      color: Color.white,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoMedium,
    },
    addMemberWrapper: {
      marginTop: height * 0.04,
    },
  });
};
