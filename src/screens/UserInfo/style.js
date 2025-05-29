import {Dimensions, StyleSheet} from 'react-native';
import {getThemeColors} from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');
const getStyle = theme => {
  const Color = getThemeColors(theme);
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.background,
    },
    topWrapper: {
      height: '40%',
      paddingHorizontal: width * 0.04,
      backgroundColor: Color.blue,
    },
    middleWrapper: {
      height: '10%',
      backgroundColor: Color.midleColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomWrapper: {
      height: '40',
      marginTop: height * 0.1,
      paddingHorizontal: width * 0.04,
    },
    upperWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: height * 0.07,
    },
    loginBtn: {
      backgroundColor: Color.registerBtnColor,
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.04,
      gap: width * 0.02,
      borderRadius: width / 2,
      flexDirection: 'row',
      alignItems: 'center',
    },
    loginTxt: {
      color: Color.lightBlue,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoBold,
    },
    register: {
      fontFamily: Fonts.RobotoBold,
      color: Color.loginMsg,
      fontSize: width * 0.07,
    },
    profileImgwrapper: {
      height: height * 0.2,
      width: height * 0.2,
      borderRadius: height * 0.1,
      backgroundColor: '#88D6F9',
      position: 'absolute',
      marginTop: -height * 0.15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    editWrapper: {
      position: 'absolute',
      top: height * -0.15,
      zIndex: 1,
      right: width * 0.3,
      backgroundColor: Color.lightBlue,
      height: height * 0.065,
      width: height * 0.065,
      borderRadius: height / 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inputWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.02,
      borderBottomColor: Color.bordercolor,
      borderBottomWidth: 1,
      //   marginTop: height * 0.02,
      //   justifyContent:'center'
    },
    inputField: {
      fontSize: width * 0.05,
      color: Color.text3,
      //   marginTop: height * 0.01,
      fontFamily: Fonts.RobotoSemiBold,
      // paddingTop: height * 0.03,
    },
    nextBtn:{
      backgroundColor: Color.blue1,
      height: height * 0.06,
      width: height * 0.06,
      borderRadius: height / 2,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      marginTop: height * 0.02,
    }
  });
};
export default getStyle;
