import {Dimensions, StyleSheet} from 'react-native';
import colors, {getThemeColors} from '../../assets/colors';
// import Fonts from '../../assets/Fonts';

const {height, width} = Dimensions.get('window');

const getStyle = theme => {
  const Colors = colors[theme];

  return StyleSheet.create({
    container: {
      backgroundColor: Colors.background,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 100,
      height: 100,
      // borderRadius: 10,
      resizeMode:'contain'
    },
  });
};
export default getStyle;
