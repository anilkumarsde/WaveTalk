import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');
const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: width * 0.04,
      justifyContent: 'space-between',
      marginTop: height * 0.02,
    },
    messageTxt: {
      fontSize: width * 0.042,
      color: Color.text2,
      fontFamily: Fonts.RobotoBold,
    },
    icon: {
      height: height * 0.05,
      width: height * 0.05,
      borderRadius: width / 2,
      backgroundColor: Color.iconColor,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1.5,
    },
    userNameWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: width * 0.05, // 5% of screen width
      paddingVertical: width * 0.04,
    },
    leftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.03,
    },
    rightWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.05,
    },
    callIcon: {
      height: height * 0.06,
      width: width * 0.06,
      resizeMode: 'contain',
    },
    userName: {
      fontSize: width * 0.045,
      fontWeight: '600',
      color: Color.text2,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: width * 0.02,
      marginBottom: height * 0.02,
      backgroundColor: Color.inputFiledColor,

      borderRadius: width * 0.02,
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.012,
      position: 'absolute',
      bottom: 0,
    },
    keyboardView: {
      flex: 1,
    },
    mainWrapper: {
      height: '70%',
      backgroundColor: Color.chatScreenBack,
      marginHorizontal: width * 0.02,
    },

    inputField: {
      flex: 1,
      fontSize: width * 0.045,
      fontFamily: Fonts.RobotoRegular,
      color: Color.text2,
    },

    sendButton: {
      marginLeft: width * 0.01,
    },
    messageList: {
      padding: height * 0.01,
      paddingBottom: 60, // space for input box
    },

    messageBubble: {
      maxWidth: '70%',
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.007,
      borderRadius: width * 0.02,
      marginBottom: height * 0.016,
      // flexDirection:'row'
    },

    leftBubble: {
      backgroundColor: Color.white,
      alignSelf: 'flex-start',
    },

    rightBubble: {
      backgroundColor: '#007AFF',
      alignSelf: 'flex-end',
      // position:'absolute',
      // bottom:0
    },
    timeText: {
      fontFamily: Fonts.RobotoLight,
      marginTop: height * 0.001,
      fontSize: width * 0.025,
      alignSelf: 'flex-end',
    },

    messageText: {
      // color: Color.text,
      fontFamily: Fonts.RobotoRegular,
      fontSize: width * 0.037,
    },
    white: {
      color: 'white',
    },
    black: {
      color: 'black',
    },
  });
};
export default getStyle;
