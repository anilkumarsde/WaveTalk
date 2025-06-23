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
import getStyle from './styles';
import useThemeStore from '../../store/themeStore';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {chatScreen} from '../../assets/string';
import {useNavigation, useRoute} from '@react-navigation/native';
import images from '../../assets/image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';

const GroupChatScreen = () => {
  const route = useRoute();
  const {groupId, groupName, members} = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [language, setLanguage] = useState('en');
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserName, setCurrentUserName] = useState('');
  const theme = useThemeStore(state => state.theme);

  const style = getStyle(theme);
  const navigation = useNavigation();

  useEffect(() => {
    setLanguage(getDeviceLanguage());
    async function getCurrentUserId() {
      try {
        const id = await AsyncStorage.getItem('userid');
        const userName = await AsyncStorage.getItem('currentuser');
        setCurrentUserName(userName);
        console.log('current user id', id);
        console.log('current user name in group chat screen', userName);
        setCurrentUser(id);
      } catch (error) {
        console.log('some error to find current user', error);
      }
    }
    getCurrentUserId();
  }, []);

  // real time listner

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('groups')
      .doc(groupId)
      .collection('messages')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const list = [];

        snapshot.forEach(item => {
          const data = item.data();
          const formattedTime =
            data.createdAt && data.createdAt.toDate
              ? data.createdAt.toDate().toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : '';

          list.push({
            id: item.id,
            ...data,
            formattedTime,
          });
          setMessages(list);
        });
      });
    return () => unsubscribe();
  }, []);

  // send message handler
  const sendMessageHandler = async (
    message,
    groupId,
    currentUser,
    currentUserName,
  ) => {
    if (message.trim().length === 0) {
      Toast.show('write something');
      return;
    }
    try {
      await firestore()
        .collection('groups')
        .doc(groupId)
        .collection('messages')
        .add({
          senderId: currentUser,
          senderName: currentUserName,
          text: message,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
      console.log('message sent and added to firestore');
      setMessage('');
    } catch (error) {
      console.log('something went wrong to send message', error);
    }
  };

  function callHandler(modeOfCall) {
    navigation.navigate(modeOfCall,{currentUserName});
  }

  return (
    <View style={style.container}>
      {/* app status bar */}
      <AppStatusBar background={colors[theme].background} barStyle={theme === 'dark' ? 'light-content' : 'dark-content'}/>
      {/* Top header */}
      <View style={style.topHeaderWrapper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons
            name="arrow-back"
            color={colors[theme].text3}
            size={20}
          />
        </TouchableOpacity>
        <Text style={style.messageTxt}>
          {language === 'en' ? chatScreen?.messageEn : chatScreen?.messageHi}
        </Text>
        <TouchableOpacity>
          <Entypo
            name="dots-three-vertical"
            color={colors[theme].text3}
            size={20}
          />
        </TouchableOpacity>
        {/*  */}
      </View>
      {/* profile Wrapper */}
      <View style={style.profileWrapper}>
        <View style={style.leftWrapper}>
          <MaterialIcons name="groups" color={colors[theme].text3} size={30} />
          <View style={style.grupNameWrapper}>
            <Text style={style.groupNameTxt}>{groupName}</Text>
            <Text style={style.memberTxt}>{`${members.length} members`} </Text>
          </View>
        </View>
        <View style={style.rightWrapper}>
          <TouchableOpacity onPress={() => callHandler('GroupVideoCall')}>
            <Image
              source={
                theme === 'dark' ? images?.VideocameraLight : images.Videocamera
              }
              style={style.callImg}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => callHandler('GroupAudioCall')}>
            <Image
              source={theme === 'dark' ? images?.PhoneLight : images.Phone}
              style={style.callImg}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.mainWrapper}>
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          contentContainerStyle={{paddingBottom: 10}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            const isCurrentUser = item.senderId === currentUser;
            return (
              <View
                style={[
                  style.itemlist,
                  {alignSelf: isCurrentUser ? 'flex-end' : 'flex-start'},
                ]}>
                <View style={style.messageTxtWrapper}>
                  {!isCurrentUser && (
                    <View style={style.senderNameWrapper}>
                      <FontAwesome6
                        name="user-large"
                        color={colors[theme].text2}
                        size={12}
                      />
                      <Text style={style.senderName}>{item.senderName}</Text>
                    </View>
                  )}
                  <View
                    style={[
                      style.textMessageBox,
                      {
                        backgroundColor: isCurrentUser
                          ? colors[theme].lightBlue
                          : colors[theme].white,
                      },
                    ]}>
                    <Text
                      style={[
                        style.textMessage,
                        {color: isCurrentUser ? colors[theme].white : 'black'},
                      ]}>
                      {item.text}
                    </Text>
                    <Text
                      style={[
                        style.time,
                        {color: isCurrentUser ? colors[theme].white : 'black'},
                      ]}>
                      {item?.formattedTime}
                    </Text>
                  </View>
                </View>
              </View>
            );
          }}
        />
      </View>

      <KeyboardAvoidingView
        keyboardVerticalOffset={10}
        style={style.keyboardView}>
        <View style={style.inputWrapper}>
          <TextInput
            placeholder="write something"
            style={style.textInputfield}
            placeholderTextColor={colors[theme].text3}
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            onPress={() =>
              sendMessageHandler(message, groupId, currentUser, currentUserName)
            }>
            <MaterialIcons
              name={'send'}
              size={25}
              color={colors[theme].lightBlue}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default GroupChatScreen;
