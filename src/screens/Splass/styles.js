import {Dimensions, StyleSheet} from 'react-native';
import colors, {getThemeColors} from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.background,
    },
    slide: {
      flex: 1,
    },
    activedotstyle: {
      width: 10,
      height: 10,
      elevation: 0.5,
    },
    upperPart: {
      width: '100%',
      height: '100%',
      // flex:1,
      justifyContent: 'center',
      alignItems: 'center',
      // backgroundColor: Color.upperColor,
      // backgroundColor: 'blue',
    },
    imgStyle: {
      height: height * 0.2,
      width: '70%',
      resizeMode: 'contain',
      // backgroundColor: 'blue'
      // marginHorizontal: width * 0.04,
    },
    infoWrapper: {
      // backgroundColor: 'green',
      width: '61%',
      marginTop: height * 0.07,
      // paddingTop: 10,
      alignItems: 'center',
      justifyContent: 'center',
      // margin:10
    },
    title: {
      fontFamily: Fonts.RobotoBold,
      fontSize: width * 0.05,
      color: Color.lightBlue,
      marginBottom: height * 0.01,
      textAlign: 'center',
    },
    subTitle: {
      fontFamily: Fonts.RobotoRegular,
      color: Color.lightBlue,
      fontSize: width * 0.039,
      textAlign: 'center',
    },
    lowerWrapper: {
      // backgroundColor:'red'
      height: '40%',
      backgroundColor: Color.lowerColor,
    },
    lowePart: {
      width: '100%',
    },

    // curveContainer: {
    //   width: '100%',
    //   height: 100,
    //   overflow: 'hidden',
    // },
    getStartedBtn: {
      backgroundColor: Color.blue1,
      marginHorizontal: width * 0.04,
      marginTop: height * 0.1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: height * 0.02,
      borderRadius: width * 0.1,
    },
    getStartedBtnTxt: {
      fontFamily: Fonts.RobotoBold,
      fontSize: width * 0.04,
      color: Color.text,
    },
    skipOrNxtBtnWrapper: {
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.15,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    skipTxt: {
      color: Color.blue1,
      fontFamily: Fonts.RobotoMedium,
      fontSize: width * 0.036,
    },
    nextBtn: {
      backgroundColor: Color.nextBtnColor,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.015,
      borderRadius: width * 0.1,
    },
    nextBtnTxt: {
      fontFamily: Fonts.RobotoMedium,
      fontSize: width * 0.036,
      color: Color.lightBlue,
    },
  });
};
export default getStyle;
