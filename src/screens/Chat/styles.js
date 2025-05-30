import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.background,
    },
  });
};
export default getStyle;
