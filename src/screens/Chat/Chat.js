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

  function moveToChatconversation() {
    navigation.navigate('ChatConversation');
  }

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        style={style.card}
        onPress={() => moveToChatconversation()}>
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
      <View style={style.headrWrapper}>
        <View style={style.leftWrapper}>
          <Image source={images.logo} style={style.logo} />
          <Text style={style.title}>Wave Talk</Text>
        </View>
        <View style={style.rightWrapper}>
          <Feather name={'search'} color={Color.white} size={20} />
          <TouchableOpacity onPress={() => setVisible(!isVisible)}>
            <AntDesign name="plus" size={20} color={Color.white} />
          </TouchableOpacity>
          {/*  */}
        </View>
      </View>
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
