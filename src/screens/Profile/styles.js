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
    profileImgWrapper: {
      alignSelf: 'center',
      marginTop: width * 0.1,
    },
    userName: {
      fontFamily: Fonts.RobotoBold,
      color: Color.text3,
      fontSize: width * 0.055,
      alignSelf: 'center',
      marginTop: height * 0.025,
    },
    userInfoWrapper: {
      paddingHorizontal: width * 0.04,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: height * 0.04,
    },
    userInfolist: {
      flexDirection: 'row',
      alignSelf: 'center',
      gap: width * 0.016,
    },
    key: {
      fontFamily: Fonts.RobotoMedium,
      color: Color.text2,
      fontSize: width * 0.04,
      // width:90
    },
    value: {
      fontFamily: Fonts.RobotoMedium,
      color: Color.text3,
      fontSize: width * 0.04,
    },
  });
};
export default getStyle;
