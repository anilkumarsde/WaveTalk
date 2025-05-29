import {Dimensions, StyleSheet} from 'react-native';
import colors, {getThemeColors} from '../../assets/colors';
import Fonts from '../../assets/Fonts';
import {WithLocalSvg} from 'react-native-svg';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  const Color = getThemeColors(theme);
  return StyleSheet.create({
    container: {
      backgroundColor: Color.background,
      flex: 1,
    },
    headerWrapper: {
      backgroundColor: Color.blue,
      height: '25%',
      width: '100%',
    },
    topHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.05,
    },
    loginTxt: {
      fontSize: width * 0.06,
      fontFamily: Fonts.RobotoBold,
      color: Color.loginMsg,
    },
    registerBtn: {
      backgroundColor: Color.registerBtnColor,
      paddingVertical: height * 0.01,
      paddingHorizontal: width * 0.04,
      borderRadius: width * 0.1,
    },
    resigesterTxt: {
      fontSize: width * 0.039,
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.registerTxt,
    },
    msgWrapper: {
      // width: '50%',
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.04,
    },
    msgTxt: {
      fontSize: width * 0.065,
      fontFamily: Fonts.RobotoBold,
      color: Color.loginMsg,
    },
    sentToTxt: {
      fontSize: width * 0.06,
      fontFamily: Fonts.RobotoBold,
      color: Color.loginMsg,
    },
    sentTonumWrapper: {
      marginTop: height * 0.01,
    },
    middlePart: {
      height: '10%',
      backgroundColor: Color.midleColor,
    },
    otpWrapper: {
      marginTop: height * 0.09,
      // backgroundColor:'red',
      paddingHorizontal: width * 0.04,
    },
    timerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: width * 0.02,
      marginBottom: height * 0.05,
    },
    timerTxt: {
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.RemembeTxt,
      fontSize: width * 0.04,
    },
    resendTxt: {
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.RemembeTxt,
      fontSize: width * 0.04,
    },
    pinStyle: {
      // backgroundColor:'red',
      borderRadius: 'null',
      borderWidth: 0,
      // width:100,
      borderBottomWidth: 2,
      borderColor: Color.RemembeTxt,
    },
    filledPinCodeContainer: {
      // width:10
    },
    pinCodetext: {
      color: Color.RemembeTxt,
    },
    nextStepBtn: {
      height: height * 0.07,
      width: height * 0.07,
      borderRadius: width / 2,
      backgroundColor: Color.blue1,
      alignSelf: 'flex-end',
      marginTop: height * 0.03,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
};
export default getStyle;
