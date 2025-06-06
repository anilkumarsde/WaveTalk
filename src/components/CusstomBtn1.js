import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Fonts from '../assets/Fonts';

const {height, width} = Dimensions.get('window');

const CusstomBtn1 = ({title, icon, backgroundColor, color, onPress}) => {
  const styles = getStyle(backgroundColor, color);
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <Text>{icon}</Text>
      <Text style={styles.titleTxt}>{title}</Text>
      {/*  */}
    </TouchableOpacity>
  );
};

export default CusstomBtn1;

const getStyle = (backgroundColor, color) => {
  return StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: width * 0.04,
      marginTop: height * 0.04,
      paddingVertical: height * 0.024,
      borderRadius: width * 0.02,
      gap: 10,
    },
    titleTxt: {
      color: color,
      fontFamily: Fonts.RobotoSemiBold,
      fontSize: width * 0.04,
      marginTop: 3,
    },
  });
};
