import {Dimensions, StyleSheet} from 'react-native';
import colors from '../../assets/colors';
import Fonts from '../../assets/Fonts';

const{width,height}=Dimensions.get('window')

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      backgroundColor: Color.background,
      flex: 1,
    },
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    txt:{
        fontFamily:Fonts.RobotoBold,
        color:Color.text2,
        fontSize:width*0.05
    }
  });
};
export default getStyle;
