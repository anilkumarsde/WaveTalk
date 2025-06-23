import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useThemeStore from '../../store/themeStore';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {chatScreen} from '../../assets/string';
import images from '../../assets/image';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';

const ChatConversation = () => {
  const route = useRoute();
  const {chatid, currentUserId, otherUserId, outerUserName} = route.params;
  const theme = useThemeStore(state => state.theme);
  const [language, setLanguage] = useState('en');
  const [message, setMessage] = useState([]);
  const [inputText, setInputText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    setLanguage(getDeviceLanguage());

    const unsubscribe = firestore()
      .collection('chats')
      .doc(chatid)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        snapshot => {
          if (!snapshot?.empty) {
            const list = [];
            snapshot.forEach(doc => {
              const data = doc.data();
              const formattedTime =
                data.createdAt && data.createdAt.toDate
                  ? data.createdAt.toDate().toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '';

              list.push({
                id: doc.id,
                ...data,
                formattedTime,
              });
            });
            setMessage(list);
            console.log(list, 'list of messages');
          } else {
            setMessage([]);
            console.log('list of message is empty');
          }
        },
        error => {
          console.error('Firestore onSnapshot error:', error);
        },
      );

    return () => unsubscribe();
  }, []);

  function moveBack() {
    navigation.goBack();
  }

  const sendMessage = async () => {
    try {
      if (inputText.trim() === '') {
        Toast.show('Write something');
        return;
      }
      await firestore()
        .collection('chats')
        .doc(chatid)
        .collection('messages')
        .add({
          senderId: currentUserId,
          text: inputText,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      setInputText('');
      console.log('yes message added to firestore');
    } catch (error) {
      console.log('something went wrong', error);
    }
  };

  // voice call handler

  function callHandler(ModeOfCall, otherUserName) {
    navigation.navigate(ModeOfCall, {otherUserName});
  }

  const style = getStyle(theme);
  return (
    <View style={style.container}>
      <AppStatusBar
        background={colors[theme].background}
        barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}
      />

      {/* Header */}
      <View style={style.header}>
        <TouchableOpacity style={style.icon} onPress={moveBack}>
          <MaterialIcons
            name="keyboard-backspace"
            size={20}
            color={colors[theme].text2}
          />
        </TouchableOpacity>
        <Text style={style.messageTxt}>
          {language === 'en' ? chatScreen?.messageEn : chatScreen?.messageHi}
        </Text>
        <TouchableOpacity style={style.icon}>
          <MaterialCommunityIcons
            name="dots-horizontal"
            color={colors[theme].text2}
            size={20}
          />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View style={style.userNameWrapper}>
        <View style={style.leftWrapper}>
          <FontAwesome6
            name="user-large"
            size={20}
            color={colors[theme].text2}
          />
          <Text style={style.userName}>{outerUserName}</Text>
        </View>
        <View style={style.rightWrapper}>
          <TouchableOpacity
            onPress={() => callHandler('VideoCallPage', outerUserName)}>
            <Image
              source={
                theme === 'dark'
                  ? images?.VideocameraLight
                  : images?.Videocamera
              }
              style={style.callIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              callHandler('VoiceCallPage', outerUserName);
            }}>
            <Image
              source={theme === 'dark' ? images?.PhoneLight : images?.Phone}
              style={style.callIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={style.mainWrapper}>
        <FlatList
          data={message}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            const messageTime = item.formattedTime;
            return (
              <View
                style={[
                  style.messageBubble,
                  item.senderId === currentUserId
                    ? style.rightBubble
                    : style.leftBubble,
                ]}>
                <Text
                  style={[
                    style.messageText,
                    item.senderId === currentUserId ? style.white : style.black,
                  ]}>
                  {item.text}
                </Text>

                <Text
                  style={[
                    style.timeText,
                    item.senderId === currentUserId ? style.white : style.black,
                  ]}>
                  {item.formattedTime || '...'}{' '}
                  {/* fallback if time not yet available */}
                </Text>
              </View>
            );
          }}
          contentContainerStyle={style.messageList}
          showsVerticalScrollIndicator={false}
        />
      </View>

      {/* Bottom Input Field */}
      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        style={style.keyboardView}>
        <View style={style.inputContainer}>
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Type a message"
            placeholderTextColor={colors[theme].text2}
            style={style.inputField}
          />
          <TouchableOpacity style={style.sendButton} onPress={sendMessage}>
            <MaterialIcons
              name="send"
              size={24}
              color={colors[theme].lightBlue}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default ChatConversation;
