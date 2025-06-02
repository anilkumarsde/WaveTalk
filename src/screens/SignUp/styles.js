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
    },
    mainContainer: {
      flex: 1,
      backgroundColor: Color.background,
      borderTopLeftRadius: '20%',
      paddingHorizontal: '5%',
    },



    createAccount: {
      fontSize: width * 0.06,
      fontFamily: Fonts.RobotoBold,
      color: Color.white,
      paddingVertical: '17%',
      textAlign: 'center',
    },
    messageTxt: {
      fontFamily: Fonts.RobotoRegular,
      fontSize: width * 0.04,
      color: Color.text2,
      textAlign: 'center',
      // marginTop: '10%',
      marginVertical: '12%',
      width: '70%',
      alignSelf: 'center',
      // marginBottom:height*0.1
      // marginTop:height*0.01
    },
    footerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.04,
      gap: width * 0.01,
    },
    alredyAccTxt: {
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoLight,
      color: Color.text2,
    },
    loginTxt: {
      color: Color.lightBlue,
      fontFamily:Fonts.RobotoMedium,
      fontSize:width*0.04
    },
    inputBoxWrapper: {
      marginBottom: height * 0.015,
    },
    errorMsg: {
      fontFamily: Fonts.RobotoLight,
      color: 'red',
      fontSize: width * 0.03,
      paddingLeft: width * 0.04,
    },
  });
};
export default getStyle;
