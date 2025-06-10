import {Text, View} from 'react-native';
import React, {useState} from 'react';
import useThemeStore from '../../store/themeStore';
import style from '../More/styles';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import HeaderCom from '../../components/HeaderCom';
import AddfriendModal from '../../components/AddfriendModal';

const Group = () => {
  const [isVisible, setVisible] = useState(false);
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  return (
    <View style={style.container}>
      {/* <Text>Group</Text> */}
      <AppStatusBar background={colors[theme].lightBlue} />
      <HeaderCom isVisible={isVisible} setVisible={setVisible} />
      <View style={style.mainContainer}>
        <Text style={style.txt}>Comming soon</Text>
        {/*  */}
      </View>
    </View>
  );
};

export default Group;
