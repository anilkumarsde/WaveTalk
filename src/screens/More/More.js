import {View, Text} from 'react-native';
import React, {useState} from 'react';
import getStyle from './styles';
import useThemeStore from '../../store/themeStore';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import HeaderCom from '../../components/HeaderCom';
import AddfriendModal from '../../components/AddfriendModal';

const More = () => {
  const [isVisible, setVisible] = useState(false);
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].lightBlue} />
      <HeaderCom isVisible={isVisible} setVisible={setVisible} />
      <AddfriendModal
        isVisible={isVisible}
        theme={theme}
        onClose={() => setVisible(false)}
      />
      <View style={style.mainContainer}>
        <Text style={style.txt}>Comming soon</Text>
        {/*  */}
      </View>
    </View>
  );
};

export default More;
