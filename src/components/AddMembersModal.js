import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import Feather from 'react-native-vector-icons/Feather';
import {getDeviceLanguage} from '../assets/checkLanguage';
import {groupScreen} from '../assets/string';
import Fonts from '../assets/Fonts';

const {height, width} = Dimensions.get('window');

const AddMembersModal = ({visible, setVisible}) => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);
  const theme = useThemeStore(state => state.theme);
  const styles = getStyle(theme);
  function closeModalHandler() {
    setVisible(false);
  }

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
      width: '100%',
      height: '90%',
      backgroundColor: Color.editModalBg,
      position: 'absolute',
      bottom: 0,
      borderTopEndRadius: width * 0.1,
      borderTopLeftRadius: width * 0.1,
    },
    line: {
      height: height * 0.005,
      width: '10%',
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
    },
    inputfiled: {
      flex: 1,
      marginTop: 5,
      fontSize: width * 0.04,
      fontFamily: Fonts.RobotoRegular,
      color: Color.text2,
    },
  });
};
