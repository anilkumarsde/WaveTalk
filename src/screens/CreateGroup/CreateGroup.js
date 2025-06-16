import {View, Text} from 'react-native';
import React from 'react';
import getStyle from './style';
import useThemeStore from '../../store/themeStore';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import CreateGroupHeader from '../../components/CreateGroupHeader';

const CreateGroup = () => {
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].lightBlue} />
      <CreateGroupHeader />
    </View>
  );
};

export default CreateGroup;
