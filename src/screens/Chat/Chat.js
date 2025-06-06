import {
  View,
  Text,
  Image,
  useColorScheme,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import React, {useEffect, useId, useState} from 'react';
import useThemeStore from '../../store/themeStore';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import images from '../../assets/image';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AddfriendModal from '../../components/AddfriendModal';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import HeaderCom from '../../components/HeaderCom';

const {height, width} = Dimensions.get('window');

const Chat = () => {
  const setTheme = useThemeStore(state => state.setTheme);
  const theme = useColorScheme();
  const [isVisible, setVisible] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userId, setUserId] = useState('');

  const style = getStyle(theme);
  const Color = colors[theme];
  const navigation = useNavigation();

  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  useEffect(() => {
    async function getId() {
      const id = await AsyncStorage.getItem('userid');
      setUserId(id);
      console.log(id, 'id of curent user');
    }
    function getUserCollection() {
      try {
        const unsubscribe = firestore()
          .collection('user')
          .onSnapshot(data => {
            const userlist = [];
            data.forEach(user => {
              userlist.push({
                id: user.id,
                ...user.data(),
              });
              console.log(user.data());
            });
            setUserData(userlist.filter(user => user.id !== userId));
            console.log(userData, 'userdata ');
          });

        console.log('data fetched');
        return () => unsubscribe();
      } catch (error) {
        console.log('some went wrong', error);
      }
    }

    getId();
    if (useId) getUserCollection();
  }, [userId]);

  function moveToChatconversation(person, userId) {
    const personId = person.id;
    const chatid = [userId, personId].sort().join('_');
    console.log('chat id ', chatid);

    navigation.navigate('ChatConversation', {
      chatid,
      currentUserId: userId,
      otherUserId: personId,
      outerUserName: person.name,
    });
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={style.card}
        onPress={() => moveToChatconversation(item, userId)}>
        <FontAwesome6
          name="user-large"
          size={width * 0.08}
          color={colors[theme].text2}
          style={style.icon}
        />
        <View>
          <Text style={style.name}>{item.name}</Text>
          <Text style={style.email}>{item.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].lightBlue} />
      {/* modal for add Friend */}
      <AddfriendModal
        isVisible={isVisible}
        theme={theme}
        onClose={() => setVisible(false)}
      />
      <HeaderCom isVisible={isVisible} setVisible={setVisible} />
      <View style={style.userWrapper}>
        <FlatList
          data={userData}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{paddingBottom: height * 0.02}}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <Text>hi</Text>
    </View>
  );
};

export default Chat;
