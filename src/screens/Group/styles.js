import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const{height,width}=Dimensions.get('window')

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Color.background,
      //   justifyContent:'center',
      //   alignItems:'center'
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    txt:{
        fontFamily:Fonts.RobotoBold,
        fontSize:width*0.05,
        color:Color.text3
    }
  });
};
export default getStyle;
