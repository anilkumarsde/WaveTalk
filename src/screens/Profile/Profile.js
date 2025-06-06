import {View, Text, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './styles';
import useThemeStore from '../../store/themeStore';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import HeaderCom from '../../components/HeaderCom';
import AddfriendModal from '../../components/AddfriendModal';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import CusstomBtn1 from '../../components/CusstomBtn1';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import {profileScreen} from '../../assets/string';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import EdilProfileModal from '../../components/EdilProfileModal';
import EditProfileModal from '../../components/EdilProfileModal';

const Profile = () => {
  const [isVisible, setVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [language, setLanguage] = useState('en');
  const [editVisible, setEditVisible] = useState(false);

  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  const navigation = useNavigation();

  useEffect(() => {
    let unsubscribe;

    async function fetchUserData() {
      try {
        const id = await AsyncStorage.getItem('userid');
        if (id) {
          setUserId(id);

          // Real-time listener
          unsubscribe = firestore()
            .collection('user')
            .doc(id)
            .onSnapshot(doc => {
              if (doc.exists) {
                setUserData(doc.data());
                console.log(' Real-time user data:', doc.data());
              }
            });
        }
      } catch (error) {
        console.log(' Error fetching user data:', error);
      }
    }
    setLanguage(getDeviceLanguage());

    fetchUserData();

    // Cleanup listener on unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  async function signOutHandler() {
    try {
      await auth().signOut();
      await AsyncStorage.setItem('isSignUp', 'false');
      navigation.navigate('Loding');
      console.log('signOut');
      ToastAndroid.show('signout successful');
    } catch (error) {
      console.log('something went wrong', error);
    }
  }
  return (
    <View style={style.container}>
      <AppStatusBar background={colors[theme].lightBlue} />
      <HeaderCom isVisible={isVisible} setVisible={setVisible} />
      <AddfriendModal
        isVisible={isVisible}
        theme={theme}
        onClose={() => setVisible(false)}
      />
      <EditProfileModal
        editVisible={editVisible}
        setEditVisible={setEditVisible}
      />

      <View style={style.profileImgWrapper}>
        <FontAwesome6
          name="user-large"
          color={colors[theme].text2}
          size={100}
        />
        <Text style={style.userName}>{userData?.name}</Text>
      </View>

      {userData && (
        <>
          <View style={style.userInfoWrapper}>
            <View style={style.userInfolist}>
              <Text style={style.key}>Email : </Text>
              <Text style={style.value}>{userData?.email}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="copy-outline"
                size={20}
                color={colors[theme].text3}
              />
            </TouchableOpacity>
          </View>

          <View style={style.userInfoWrapper}>
            <View style={style.userInfolist}>
              <Text style={style.key}>Password : </Text>
              <Text style={style.value}>{userData?.password}</Text>
            </View>
            <TouchableOpacity>
              <Ionicons
                name="copy-outline"
                size={20}
                color={colors[theme].text3}
              />
            </TouchableOpacity>
          </View>

          <CusstomBtn1
            title={
              language === 'en'
                ? profileScreen?.titleEn
                : profileScreen?.titleHi
            }
            icon={
              <Feather name="edit-2" color={colors[theme]?.white} size={20} />
            }
            backgroundColor={colors[theme]?.lightBlue}
            color={colors[theme].white}
            onPress={() => setEditVisible(true)}
          />
          <CusstomBtn1
            title={
              language === 'en'
                ? profileScreen?.logoutEn
                : profileScreen?.logoutHi
            }
            icon={
              <SimpleLineIcons
                name="logout"
                color={colors[theme]?.logoutBtnTxtColor}
                size={20}
              />
            }
            backgroundColor={colors[theme]?.logoutBtnColor}
            color={colors[theme].logoutBtnTxtColor}
            onPress={signOutHandler}
          />
        </>
      )}
    </View>
  );
};

export default Profile;
