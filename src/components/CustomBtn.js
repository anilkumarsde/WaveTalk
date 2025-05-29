import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Touchable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import colors, {getThemeColors} from '../assets/colors';
import Fonts from '../assets/Fonts';
import useThemeStore from '../store/themeStore';

const {height, width} = Dimensions.get('window');

const CustomBtn = ({btnTilte,onPress}) => {
  const theme = useThemeStore(state=>state.theme);
  const style = getStyle(theme);
  return (
    <TouchableOpacity style={style.btn} onPress={onPress}>
      <Text style={style.btnTxt}>{btnTilte}</Text>
      {/*  */}
    </TouchableOpacity>
  );
};

export default CustomBtn;

const getStyle = theme => {
  const Color =colors[theme];
  return StyleSheet.create({
    btn: {
      backgroundColor: Color.blue,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: height * 0.02,
      borderRadius: width * 0.1,
      marginTop: height * 0.07,
    },
    btnTxt: {
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.white,
      fontSize: width * 0.04,
    },
  });
};
