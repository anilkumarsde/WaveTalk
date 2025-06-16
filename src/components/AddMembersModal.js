import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import {getDeviceLanguage} from '../assets/checkLanguage';
import {groupScreen} from '../assets/string';
import Fonts from '../assets/Fonts';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CheckBox from '@react-native-community/checkbox';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const {height, width} = Dimensions.get('window');

const AddMembersModal = ({visible, setVisible, setSelected}) => {
  const [language, setLanguage] = useState('en');
  const [currentId, setCurrentId] = useState('');
  const [selectedUser, setSelctedUser] = useState([]);

  const userData = useThemeStore(state => state.userData);
  console.log('userData in addmembersmodal', userData);

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);
  const theme = useThemeStore(state => state.theme);
  const styles = getStyle(theme);
  function closeModalHandler() {
    setVisible(false);
  }

  function fun(item, index) {
    const isAlready = selectedUser.find(value => value.id == item.id);
    if (!isAlready) {
      setCurrentId(index);
      setSelctedUser([...selectedUser, item]);
      setSelected([...selectedUser, item]);
    } else {
      setCurrentId(null);
      const newData = selectedUser.filter(value => value.id !== item.id);
      setSelctedUser(newData);
      setSelected(newData);
    }
  }
  console.log('selcetedUser', selectedUser);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.line} onPress={closeModalHandler} />
          <Text style={styles.title}>
            {language == 'en'
              ? groupScreen?.addMembersEn
              : groupScreen?.addMembersHi}
          </Text>
          <View style={styles.inputFieldWrapper}>
            <Feather name="search" size={19} color={colors[theme].text2} />
            <TextInput
              placeholder={
                language === 'en'
                  ? groupScreen?.SearchEn
                  : groupScreen?.SearchHi
              }
              style={styles.inputfiled}
              placeholderTextColor={colors[theme].text2}
            />
          </View>
          <View style={styles.userWrapper}>
            <FlatList
              data={userData}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({item, index}) => {
                const isActive = selectedUser.find(
                  value => value.id == item.id,
                );

                return (
                  <View style={styles.itemListWrapper}>
                    <View style={styles.leftWrapper}>
                      <FontAwesome6
                        name="user-large"
                        size={30}
                        color={colors[theme].text2}
                      />
                      <View style={styles.userNameWrapper}>
                        <Text style={styles.userName}>{item?.name}</Text>
                        <Text style={styles.userEmail}>{item?.email}</Text>
                      </View>
                    </View>
                    <View
                      style={styles.rightWrapper}
                      onPress={() => setCurrentId(index)}>
                      <CheckBox
                        value={isActive ? true : false}
                        onValueChange={newValue => fun(item, index)}
                        tintColors={{
                          true: colors[theme].blue1,
                          false: colors[theme].text2,
                        }}
                      />

                      {/*  */}
                    </View>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.footerWrapper}>
            <TouchableOpacity style={styles.cancelBtn} activeOpacity={0.5}>
              <Text style={styles.cancelText}>
                {language === 'en'
                  ? groupScreen?.CancelEn
                  : groupScreen?.CancelHi}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cancelBtn, {backgroundColor: colors[theme].blue1}]}
              activeOpacity={0.5}
              onPress={() => setVisible(false)}>
              <Text style={[styles.cancelText, styles.addText]}>
                {language === 'en' ? groupScreen?.addEn : groupScreen?.addHn}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/*  */}
    </Modal>
  );
};

export default AddMembersModal;

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)', // Transparent overlay
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      height: '90%',
      backgroundColor: Color.editModalBg,
      position: 'absolute',
      bottom: 0,
      borderTopEndRadius: width * 0.1,
      borderTopLeftRadius: width * 0.1,
    },
    line: {
      height: height * 0.01,
      width: '20%',
      backgroundColor: Color.text2,
      marginTop: height * 0.02,
      alignSelf: 'center',
      borderRadius: width * 0.01,
    },
    title: {
      textAlign: 'center',
      marginTop: height * 0.03,
      color: Color.text3,
      fontFamily: Fonts.RobotoSemiBold,
      fontSize: width * 0.045,
    },
    inputFieldWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: width * 0.04,
      borderWidth: 0.5,
      marginTop: height * 0.03,
      paddingHorizontal: width * 0.04,
      borderRadius: width * 0.02,
      gap: width * 0.01,
      borderColor: Color.text2,
      // marginBottom:height*0.01,
      // backgroundColor:'red'
    },
    inputfiled: {
      flex: 1,
      marginTop: height * 0.004,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoRegular,
      color: Color.text2,
    },
    userWrapper: {
      paddingHorizontal: width * 0.04,
      // marginBottom: height * 0.24,
      // backgroundColor: 'red',
      height: '70%',
      paddingVertical: height * 0.01,
    },
    itemListWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: height * 0.01,
      // backgroundColor:'red',
      marginBottom: width * 0.02,
    },
    leftWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: width * 0.04,
      // backgroundColor:'blue'
    },
    userNameWrapper: {},
    userName: {
      fontFamily: Fonts.RobotoBold,
      fontSize: width * 0.035,
      color: Color.text3,
    },
    userEmail: {
      fontFamily: Fonts.RobotoLight,
      color: Color.text2,
      fontSize: width * 0.035,
    },
    rightWrapper: {},
    footerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: width * 0.04,
      marginTop: height * 0.01,
    },
    cancelBtn: {
      height: height * 0.055,
      width: width * 0.4,
      backgroundColor: Color.cancelBtnColor,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: height * 0.05,
    },
    cancelText: {
      color: Color.blue1,
      fontFamily: Fonts.RobotoBold,
      fontSize: width * 0.034,
    },
    addBtn: {
      backgroundColor: Color.blue1,
    },
    addText: {
      color: Color.white,
    },
  });
};
