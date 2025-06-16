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
    mainContainer: {
      flex: 1,
    },
    txt: {
      fontFamily: Fonts.RobotoBold,
      fontSize: width * 0.05,
      color: Color.text2,
    },
    groupItemContainer: {
      marginBottom: height * 0.02,
      paddingHorizontal: 16,
      flexDirection: 'row',
      gap: width * 0.05,
    },
    groupNameText: {
      fontFamily: Fonts.RobotoSemiBold,
      fontSize: width * 0.045,
      color: Color.text3,
    },
    emptyText: {
      fontFamily: Fonts.RobotoSemiBold,
      fontSize: width * 0.045,
      color: Color.text3,
      textAlign: 'center',
      marginTop: height * 0.2,
    },
    flatListContainer: {
      paddingTop: height * 0.02,
      paddingBottom: height * 0.01,
    },
  });
};

export default getStyle;
