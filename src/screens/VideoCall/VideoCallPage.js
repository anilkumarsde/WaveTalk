import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
  ZegoUIKitPrebuiltCall,
  ONE_ON_ONE_VIDEO_CALL_CONFIG,
} from '@zegocloud/zego-uikit-prebuilt-call-rn';
import {useNavigation, useRoute} from '@react-navigation/native';

// Generate a random user ID if not passed
const randomUserID = String(Math.floor(Math.random() * 100000));

export default function VideoCallPage() {
  const navigation = useNavigation();
  const route = useRoute();
  const {otherUserName} = route.params;

  return (
    <View style={styles.container}>
      <ZegoUIKitPrebuiltCall
        appID={484634835} // Replace with your actual App ID
        appSign={
          '42b3f06f3c1a8197e76f6535071567c6210dbd77f16550bf4ce2eb1ee4e1a50f'
        } // Replace with your actual App Sign
        userID={randomUserID}
        userName={otherUserName || 'user_' + randomUserID}
        callID={'ZegoCloudOneOnOneVideoCall'}
        config={{
          ...ONE_ON_ONE_VIDEO_CALL_CONFIG,
          onCallEnd: () => navigation.navigate('BottomTabNavigator'),
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
