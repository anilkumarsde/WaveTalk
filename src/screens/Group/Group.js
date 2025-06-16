import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import useThemeStore from '../../store/themeStore';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import colors from '../../assets/colors';
import HeaderCom from '../../components/HeaderCom';
import AddfriendModal from '../../components/AddfriendModal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const Group = () => {
  const [isVisible, setVisible] = useState(false);
  const [groups, setGroups] = useState([]);
  const theme = useThemeStore(state => state.theme);
  const navigation = useNavigation();
  const style = getStyle(theme);
  useEffect(() => {
    const uid = auth().currentUser?.uid;

    const unsubscribe = firestore()
      .collection('groups')
      .where('memberIds', 'array-contains', uid) //  Filter only groups where current user is a member
      .onSnapshot(snapshot => {
        const allGroups = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('All groups for user:', allGroups);
        setGroups(allGroups);
      });

    return () => unsubscribe();
  }, []);

  function chatstartHandler(groups) {
    console.log('groupId in grupscreen ', groups.id);
    console.log('groupname in grupscreen ', groups.name);
    console.log('groupmember in grupscreen ', groups.members);
    navigation.navigate('GroupChatScreen', {
      groupId: groups.id,
      groupName: groups.name,
      members: groups.members,
    });
  }

  return (
    <View style={style.container}>
      {/* <Text>Group</Text> */}
      <AddfriendModal
        isVisible={isVisible}
        setVisible={setVisible}
        theme={theme}
        onClose={() => setVisible(false)}
      />
      <AppStatusBar background={colors[theme].lightBlue} />
      <HeaderCom isVisible={isVisible} setVisible={setVisible} />
      <View style={style.mainContainer}>
        <FlatList
          data={groups}
          keyExtractor={item => item.id}
          contentContainerStyle={style.flatListContainer}
          renderItem={({item}) => (
            <TouchableOpacity
              style={style.groupItemContainer}
              onPress={() => chatstartHandler(item)}>
              <MaterialIcons
                name="groups"
                size={26}
                color={colors[theme].text2}
              />
              <Text style={style.groupNameText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <Text style={style.emptyText}>No groups found.</Text>
          }
        />

        {/*  */}
      </View>
    </View>
  );
};

export default Group;
