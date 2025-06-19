import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      backgroundColor: Color.background,
      flex: 1,
    },
    topHeaderWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.01,
    },
    messageTxt: {
      fontFamily: Fonts.RobotoBold,
      color: Color.text3,
      fontSize: width * 0.04,
    },
    profileWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.025,
    },
    leftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.04,
    },
    grupNameWrapper: {
      height: height * 0.04,
      flexDirection: 'columns',
      justifyContent: 'center',
    },
    rightWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.04,
    },
    groupNameTxt: {
      fontFamily: Fonts.RobotoSemiBold,
      fontSize: width * 0.037,
      color: Color.text3,
    },
    memberTxt: {
      fontFamily: Fonts.RobotoRegular,
      fontSize: width * 0.03,
      color: Color.text2,
    },
    callImg: {
      height: height * 0.06,
      width: width * 0.06,
      resizeMode: 'contain',
    },
    mainWrapper: {
      height: '75%',
      backgroundColor: Color.inputFiledColor,
      marginHorizontal: width * 0.04,
      borderRadius: width * 0.01,
    },

    itemlist: {
      maxWidth: '70%',
      // backgroundColor: 'red',
      marginTop: height * 0.02,
      marginHorizontal: width * 0.02,
    },
    messageTxtWrapper: {
      // marginBottom:height*0.04
    },
    senderNameWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.02,
      // backgroundColor:'red'
    },
    senderName: {
      fontFamily: Fonts.RobotoRegular,
      color: Color.text2,
      fontSize: width * 0.03,
      marginTop: height * 0.001,
    },
    textMessageBox: {
      // backgroundColor:'blue',
      marginLeft: width * 0.05,
      marginTop: height * 0.001,
      backgroundColor: Color.lightBlue,
      paddingHorizontal: width * 0.03,
      paddingVertical: height * 0.01,
      borderRadius: width * 0.01,
    },
    textMessage: {
      fontFamily: Fonts.RobotoSemiBold,
      fontSize: width * 0.035,
    },
    time: {
      fontFamily: Fonts.RobotoLight,
      fontSize: width * 0.025,
      textAlign: 'right',
    },

    keyboardView: {
      flex: 1,
    },
    inputWrapper: {
      position: 'absolute',
      bottom: 5,
      marginHorizontal: width * 0.04,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: Color.inputFiledColor,
      paddingHorizontal: width * 0.01,
      paddingVertical: height * 0.01,
      borderRadius: width * 0.01,
    },
    textInputfield: {
      flex: 1,
      fontFamily: Fonts.RobotoLight,
      color: Color.text3,
    },
  });
};
export default getStyle;
