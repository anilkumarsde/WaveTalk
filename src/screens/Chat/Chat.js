import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Chat = () => {
  const signOutUser = async () => {
    try {
      await auth().signOut();
      ToastAndroid.show('Signed out successfully', ToastAndroid.SHORT);
      console.log('User signed out!');
      await AsyncStorage.setItem('isSignup', false);
      // You can navigate to Login screen here, e.g.:
      // navigation.replace('Login');
    } catch (error) {
      console.error('Sign out error:', error);
      ToastAndroid.show('Failed to sign out', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Chat</Text>
      <TouchableOpacity onPress={signOutUser}>
        <Text>Signout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({});
