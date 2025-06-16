import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import {getDeviceLanguage} from '../assets/checkLanguage';
import {chatScreen, groupScreen} from '../assets/string';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fonts from '../assets/Fonts';
import AddMembersModal from './AddMembersModal';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Toast from 'react-native-simple-toast';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const {height, width} = Dimensions.get('window');

const CreateGroupHeader = () => {
  const [language, setLanguage] = useState('en');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState([]);
  const [groupName, setGroupName] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [groupNameError, setGroupNameError] = useState('');
  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  const Color = colors[theme];
  const navigation = useNavigation();

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  useEffect(() => {
    console.log('selected user in the creatgroup screen', selected);
  }, [selected]);

  useEffect(() => {
    const uid = auth().currentUser?.uid;

    const fetchCurrentUser = async () => {
      try {
        const userDoc = await firestore().collection('user').doc(uid).get();
        if (userDoc.exists) {
          console.log('current userFound', userDoc.data());
          setCurrentUser({id: uid, ...userDoc.data()});
        } else {
          console.log('error to find current user');
        }
      } catch (error) {
        console.log('error found', error);
      }
    };
    if (uid) {
      fetchCurrentUser();
    }
  }, []);

  function validate() {
    setGroupNameError('');
    let valid = true;
    if (groupName.length < 1) {
      setGroupNameError('Please Enter Group Name');
      valid = false;
    } else if (selected.length < 1) {
      Toast.show('Please Add atleast two members');
      valid = false;
    }
    return valid;
  }

  async function createGroupHandler() {
    if (validate()) {
      try {
        //  Step 1: Collect all selected members and current user
        const members = [...selected, currentUser]; // each member should have id, name, email etc.

        // Step 2: Prepare group data
        const groupData = {
          name: groupName,
          members: members, // full user info for UI
          memberIds: members.map(user => user.id), // user IDs only for query
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        //  Step 3: Add to Firestore
        const grupRef = await firestore().collection('groups').add(groupData);
        console.log('Group has been created', grupRef.id);

        Toast.show('Group created');
        setGroupName('');
        setSelected([]);
      } catch (error) {
        console.log('Something went wrong', error);
      }
    }
  }

  return (
    <View style={style.container}>
      <AddMembersModal
        visible={visible}
        setVisible={setVisible}
        setSelected={setSelected}
      />

      <View style={style.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={style.iconWrapper}>
          <Icon name="arrow-back" size={20} color={Color.white} />
        </TouchableOpacity>
        <Text style={style.title}>
          {language == 'en'
            ? groupScreen?.createGroupEn
            : groupScreen?.createGroupHi}
        </Text>
      </View>
      <View style={style.mainContainer}>
        <Text style={style.label}>
          {language === 'en'
            ? groupScreen.groupNameEn
            : groupScreen.groupNameHi}
        </Text>

        <TextInput
          style={style.inputWrapper}
          placeholder={
            language == 'en'
              ? groupScreen?.enterGroupEn
              : groupScreen?.enterGroupHi
          }
          placeholderTextColor={colors[theme].text3}
          value={groupName}
          onChangeText={setGroupName}
        />
        {groupNameError && <Text style={style.errorTxt}>{groupNameError}</Text>}

        <View style={style.addMemberWrapper}>
          <Text style={style.label}>
            {language == 'en' ? groupScreen?.MembersEn : groupScreen?.MembersHn}
          </Text>

          <TouchableOpacity
            style={style.addMemberButton}
            activeOpacity={0.5}
            onPress={() => setVisible(true)}>
            <AntDesign name="plus" size={19} color={colors[theme].blue1} />

            <Text style={style.addMemberText}>
              {language == 'en'
                ? groupScreen?.addMembersEn
                : groupScreen?.addMembersHi}
            </Text>
          </TouchableOpacity>
        </View>

        {selected && (
          <View style={style.selectedUserWrapper}>
            <FlatList
              data={selected}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <View style={style.useList}>
                  <FontAwesome6
                    name="user-large"
                    color={colors[theme].text2}
                    size={24}
                  />
                  <View style={style.nameWrapper}>
                    <Text style={style.userName}>{item?.name}</Text>
                    <Text style={style.userEmail}>{item?.email}</Text>
                  </View>
                </View>
              )}
            />
            {/*  */}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={style.createGroupBtn}
        activeOpacity={0.5}
        onPress={createGroupHandler}>
        <Text style={style.createGroupTxt}>
          {language == 'en'
            ? chatScreen?.CreateGroupEn
            : chatScreen?.CreateGroupHi}
        </Text>
      </TouchableOpacity>

      {/*  */}
    </View>
  );
};

export default CreateGroupHeader;

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Color.lightBlue,
      paddingHorizontal: width * 0.04,
      paddingVertical: height * 0.025,
    },
    iconWrapper: {},
    title: {
      fontSize: width * 0.054,
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.white,
      flex: 1,
      textAlign: 'center',
    },
    mainContainer: {
      backgroundColor: Color.background,
      paddingHorizontal: width * 0.04,
      paddingTop: height * 0.02,
    },
    label: {
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoRegular,
      color: Color.text3,
      marginBottom: height * 0.005,
    },
    inputWrapper: {
      width: '100%',
      borderWidth: 0.5,
      borderColor: Color.border,
      borderRadius: width * 0.02,
      paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
      backgroundColor: Color.background,
      elevation: 0.5,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoRegular,
      color: Color.placeholder,
    },
    addMemberButton: {
      marginTop: height * 0.01,
      paddingVertical: height * 0.015,
      paddingHorizontal: width * 0.04,
      backgroundColor: '#ECF9FF',
      borderRadius: width * 0.02,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: width * 0.02,
    },

    addMemberText: {
      color: Color.blue1,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoSemiBold,
      marginTop: height * 0.005,
    },
    addMemberWrapper: {
      marginTop: height * 0.04,
    },
    selectedUserWrapper: {
      height: '55%',
      // backgroundColor: 'red',
      marginTop: height * 0.03,
    },
    useList: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.03,
      marginBottom: height * 0.02,
    },
    nameWrapper: {},
    userName: {
      color: Color.text3,
      fontFamily: Fonts.RobotoBold,
      fontSize: width * 0.037,
    },
    userEmail: {
      color: Color.text2,
      fontFamily: Fonts.RobotoLight,
      fontSize: width * 0.032,
    },
    createGroupBtn: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.blue1,
      marginHorizontal: width * 0.04,
      position: 'absolute',
      bottom: 0,
      width: '90%',
      padding: height * 0.02,
      borderRadius: width * 0.5,
    },
    createGroupTxt: {
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.white,
      fontSize: width * 0.035,
    },
    errorTxt: {
      color: 'red',
      fontFamily: Fonts.RobotoLight,
      fontSize: width * 0.03,
      paddingLeft: width * 0.03,
    },
  });
};
