import {View, Text} from 'react-native';
import React from 'react';
import useThemeStore from '../../store/themeStore';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';

const ChatConversation = () => {
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].background} />
      <Text>ChatConversation</Text>
    </View>
  );
};

export default ChatConversation;
