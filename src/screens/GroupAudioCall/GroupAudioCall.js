import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  ZegoUIKitPrebuiltCall,
  GROUP_VOICE_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';

const randomUserID = String(Math.floor(Math.random() * 100000));

const GroupAudioCall = () => {
  const route = useRoute();
  const {currentUserName} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.contaienr}>
      <ZegoUIKitPrebuiltCall
        appID={484634835}
        appSign={
          '42b3f06f3c1a8197e76f6535071567c6210dbd77f16550bf4ce2eb1ee4e1a50f'
        }
        userID={randomUserID}
        userName={currentUserName || 'user_' + randomUserID}
        callID={'ZegoCloudGroupAudioCall'}
        config={{
          ...GROUP_VOICE_CALL_CONFIG,
          onCallEnd: () => navigation.navigate('BottomTabNavigator'),
        }}
      />
    </View>
  );
};

export default GroupAudioCall;

const styles = StyleSheet.create({
  contaienr: {
    flex: 1,
  },
});
