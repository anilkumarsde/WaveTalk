import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import images from '../assets/image';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import Fonts from '../assets/Fonts';

const HeaderCom = ({isVisible, setVisible}) => {
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  const Color = colors[theme];

  return (
    <View style={style.headrWrapper}>
      {/* Left Section */}
      <View style={style.leftWrapper}>
        <Image source={images.Logo} style={style.logo} />
        <Text style={style.title}>Wave Talk</Text>
      </View>

      {/* Right Section */}
      <View style={style.rightWrapper}>
        <Feather name={'search'} color={Color.white} size={20} />
        <TouchableOpacity onPress={() => setVisible(!isVisible)}>
          <AntDesign name="plus" size={20} color={Color.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeaderCom;
const getStyle = theme => {
  const {width, height} = Dimensions.get('window');
  const Color = colors[theme];

  return StyleSheet.create({
    headrWrapper: {
      backgroundColor: Color.lightBlue,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: width * 0.04,
      height: height * 0.12,
    },
    leftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.01,
    },
    logo: {
      height: height * 0.06,
      width: height * 0.06,
      resizeMode: 'contain',
    },
    title: {
      fontFamily: Fonts.RobotoSemiBold,
      //   color: Color.white,
      color: 'white',
      fontSize: width * 0.045,
    },
    rightWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.04,
    },
  });
};
