import {Dimensions, StyleSheet} from 'react-native';
import {getThemeColors} from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  const Colors = getThemeColors(theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.background,
    },
    text: {
      color: Colors.text,
    },
    headerWrapper: {
      marginTop: height * 0.02,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: width * 0.02,
    },
    logo1: {
      height: height * 0.045,
      width: width * 0.09,
      resizeMode: 'contain',
    },
    title: {
      fontFamily: Fonts.RobotoBold,
      color: Colors.text3,
      fontSize: width * 0.055,
    },
    mainWrapper: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    chatImage: {
      height: height * 0.25,
      width: width * 0.5,
      resizeMode: 'contain',

      justifyContent: 'center',
      alignItems: 'center',
    },
    mainTitle: {
      fontFamily: Fonts.RobotoSemiBold,
      color: Colors.lightBlue,
      fontSize: width * 0.037,
      width: '64%',
      marginLeft: width * 0.02,
      textAlign:'center'
    },
    footerWrapper: {
      // backgroundColor:'red',
      alignSelf: 'center',
      marginBottom: height * 0.05,
    },
    versionTxt: {
      fontSize: width * 0.044,
      color: Colors.blue1,
      fontFamily: Fonts.RobotoSemiBold,
    },
  });
};
export default getStyle;
