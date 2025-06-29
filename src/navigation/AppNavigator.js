import React from 'react';
import Loding from '../screens/Loding/Loding';
import Splass from '../screens/Splass/SplassScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import Welcome from '../screens/Welcome/Welcome';
import Login from '../screens/Login/Login';
import Otp from '../screens/Otp/Otp';
import SignUp from '../screens/SignUp/SignUp';
import UserInfo from '../screens/UserInfo/UserInfo';
import ChatConversation from '../screens/ChatConversation/ChatConversation';
import VoiceCallPage from '../screens/VoiceCall/VoiceCallPage';
import VideoCallPage from '../screens/VideoCall/VideoCallPage';
import CreateGroup from '../screens/CreateGroup/CreateGroup';
import GroupChatScreen from '../screens/GroupChatScreen/GroupChatScreen';
import GroupAudioCall from '../screens/GroupAudioCall/GroupAudioCall';
import GroupVideoCall from '../screens/GroupVideoCall/GroupVideoCall';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Loding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Loding" component={Loding} />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Splass" component={Splass} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Otp" component={Otp} />
      <Stack.Screen name="UserInfo" component={UserInfo} />
      <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
      <Stack.Screen name="ChatConversation" component={ChatConversation} />
      <Stack.Screen name="VoiceCallPage" component={VoiceCallPage} />
      <Stack.Screen name="VideoCallPage" component={VideoCallPage} />
      <Stack.Screen name="CreateGroup" component={CreateGroup} />
      <Stack.Screen name="GroupChatScreen" component={GroupChatScreen} />
      <Stack.Screen name="GroupAudioCall" component={GroupAudioCall} />
      <Stack.Screen name="GroupVideoCall" component={GroupVideoCall} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
