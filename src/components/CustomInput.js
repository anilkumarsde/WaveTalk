import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {getThemeColors} from '../assets/colors';
import Fonts from '../assets/Fonts';

const {width, height} = Dimensions.get('window');

const CustomInput = ({
  icon,
  placeholderTxt,
  value,
  setValue,
  icon1,
  secureEntry = false,
  setSecureEntry,
  maxLength,
}) => {
  const theme = useColorScheme();
  const style = getstyles(theme);
  return (
    <View style={style.textInput}>
      <Text>{icon}</Text>
      <TextInput
        placeholder={placeholderTxt}
        placeholderTextColor={theme === 'dark' ? '#fff' : '#000'}
        value={value}
        onChangeText={setValue}
        style={style.textInputField}
        maxLength={maxLength}
        secureTextEntry={secureEntry}
      />
      <TouchableOpacity
        style={style.icon1}
        onPress={() => setSecureEntry(!secureEntry)}>
        <Text>{icon1}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomInput;

const getstyles = theme => {
  const Color = getThemeColors(theme);
  return StyleSheet.create({
    textInput: {
      // backgroundColor:'red'
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: Color.text1,
      paddingHorizontal: '5%',
      borderRadius: width * 0.05,
      gap: width * 0.02,
      paddingVertical: height * 0.003,
      // marginBottom: height * 0.02,
      width: '100%',
    },
    textInputField: {
      fontFamily: Fonts.RobotoRegular,
      fontSize: width * 0.04,
      color: Color.text2,
      width: '82%',
      marginTop: height * 0.01,
    },
    icon1: {
      // textAlign:'right'
      // alignSelf:'flex-end',
    },
  });
};
