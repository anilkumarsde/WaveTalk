import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  console.log('function call', theme);
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      backgroundColor: Color.background,
      flex: 1,
    },
    // headrWrapper: {
    //   backgroundColor: Color.lightBlue,
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   paddingHorizontal: width * 0.04,
    //   height: '15%',
    // },
    // leftWrapper: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   gap: width * 0.01,
    // },
    // logo: {
    //   height: height * 0.12,
    //   width: width * 0.12,
    //   resizeMode: 'contain',
    //   // backgroundColor: 'red',
    // },
    // title: {
    //   fontFamily: Fonts.RobotoSemiBold,
    //   color: Color.white,
    //   fontSize: width * 0.045,
    // },
    // rightWrapper: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   gap: width * 0.04,
    // },
    userWrapper: {
      marginBottom: width * 0.06,
    },
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: Color.lightBlue,
      // padding: width * 0.035,
      // borderRadius: width * 0.03,
      marginVertical: height * 0.005,
      marginHorizontal: width * 0.04,
      // shadowColor: '#000',
      // shadowOffset: {width: 0, height: 2},
      // shadowOpacity: 0.1,
      // shadowRadius: 1,
      // elevation: 0.1,
    },

    icon: {
      marginRight: width * 0.04,
      backgroundColor: Color.darkBlue,
      padding: width * 0.03,
      borderRadius: width * 0.1,
    },

    name: {
      fontSize: width * 0.04,
      color: Color.text3,
      fontFamily: Fonts.RobotoBold,
      // backgroundColor:'red'
      // color:'red'
    },

    email: {
      fontSize: width * 0.035,
      color: Color.text2,
      fontFamily: Fonts.RobotoLight,
      // marginTop: height * 0.003,
      // backgroundColor:'blue'
    },
  });
};
export default getStyle;
