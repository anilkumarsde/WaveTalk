import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation} from '@react-navigation/native';

export default function VoiceCallPage({route}) {
  const {userID, userName, callID, appID, appSign} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={appID}
        appSign={appSign}
        userID={userID}
        userName={userName}
        callID={callID}
        config={{
          ...ONE_ON_ONE_VOICE_CALL_CONFIG,
          onCallEnd: () => navigation.navigate('BottomTabNavigator'), // You can also navigate to 'HomePage'
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
