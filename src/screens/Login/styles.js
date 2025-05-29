import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.blue,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    greetingText: {
      fontSize: width * 0.06,
      fontFamily: Fonts.RobotoBold,
      color: Color.white,
      paddingVertical: '17%',
      textAlign: 'center',
      // marginBottom: 20,
      // textAlign: 'center',s
      // marginVertical: '40%',
      // marginTop: 30,
    },
    mainContainer: {
      flex: 1,
      // marginTop: '40%',
      borderTopLeftRadius: '20%',
      backgroundColor: Color.background,
      paddingHorizontal: '5%',
    },
    topContainer: {
      // backgroundColor: 'red',
      alignItems: 'center',
      marginVertical: '10%',
      gap: '5%',
    },
    logoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: '3%',
    },
    logoImage: {
      height: 25,
      width: 25,
      resizeMode: 'contain',
    },
    appName: {
      fontSize: width * 0.055,
      fontFamily: Fonts.RobotoBold,
      color: Color.text3,
    },
    instructionText: {
      fontFamily: Fonts.RobotoRegular,
      fontSize: width * 0.04,
      color: Color.text2,
      textAlign: 'center',
      marginTop: '5%',
    },
    inputwrapper: {
      paddingTop: height * 0.02,
    },
    footerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.12,
      gap: width * 0.01,
    },
    noAccountTxt: {
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoLight,
      color: Color.text2,
      // color:'red'
    },
    signUpTxt: {
      color: Color.lightBlue,
    },
    errorMsg:{
      fontFamily:Fonts.RobotoLight,
      color:'red',
      fontSize: width * 0.03,
      paddingLeft:width*0.06
    }
  });
};
export default getStyle;
