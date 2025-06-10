import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import {getDeviceLanguage} from '../assets/checkLanguage';
import {profileScreen} from '../assets/string';
import Fonts from '../assets/Fonts';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-simple-toast';
const {width, height} = Dimensions.get('window');

const EditProfileModal = ({editVisible, setEditVisible}) => {
  const [language, setLanguage] = useState('en');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const theme = useThemeStore(state => state.theme);
  const styles = getStyle(theme);

  useEffect(() => {
    setLanguage(getDeviceLanguage());
  }, []);

  const handleClose = () => {
    setEditVisible(false);
  };

  const handleSave = async (name, email, password) => {
    const userId = auth().currentUser.uid;
    const currentUser = auth().currentUser;
    if ((email, name, password)) {
      try {
        const snapshot = await firestore()
          .collection('user')
          .where('email', '==', email)
          .get();

        const emailExists = snapshot.docs.some(doc => doc.id !== userId);
        if (emailExists) {
          Toast.show('Email already in use by another user!');
          return;
        }

        await firestore().collection('user').doc(userId).update({
          name: name,
          email: email,
          password: password,
        });
        console.log('profile updated in firestore');

        if (currentUser.email !== email) {
          await currentUser.sendEmailVerification();
          Toast.show('Verify your new email first. Check your inbox.');
          return;
        }

        if (password.length > 0) {
          await currentUser.updatePassword(password);
        }

        Toast.show('Profile update successfully!');
        console.log('profile updated in firebase auth as well');
        setEditVisible(false);
      } catch (error) {
        console.log('something went wrong', error);
        Toast.show('Something went wrong!');
      }
    }
  };

  return (
    <Modal
      visible={editVisible}
      transparent
      animationType="slide"
      onRequestClose={handleClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Top tap area to close */}
          <TouchableOpacity onPress={handleClose} style={styles.closeBar}>
            <View style={styles.barIndicator} />
          </TouchableOpacity>

          <Text style={styles.title}>Edit Profile</Text>

          <TextInput
            placeholder={
              language === 'en' ? profileScreen?.NameEn : profileScreen?.NameHi
            }
            style={styles.input}
            placeholderTextColor={colors[theme].text2}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder={
              language === 'en'
                ? profileScreen?.EmailEn
                : profileScreen?.EmailHi
            }
            keyboardType="email-address"
            style={styles.input}
            placeholderTextColor={colors[theme].text2}
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            placeholder={
              language === 'en'
                ? profileScreen?.PaaswordEn
                : profileScreen?.PaaswordHi
            }
            secureTextEntry
            style={styles.input}
            placeholderTextColor={colors[theme].text2}
            value={password}
            onChangeText={setPassword}
            maxLength={6}
          />

          {/* Buttons */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: '#ccc'}]}
              onPress={handleClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                {backgroundColor: colors[theme].lightBlue},
              ]}
              onPress={() => handleSave(name, email, password)}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditProfileModal;

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: width,
      backgroundColor: Color.editModalBg,
      borderTopRightRadius: width * 0.04,
      borderTopLeftRadius: width * 0.04,
      padding: width * 0.04,
      //   elevation: 5,
      height: '70%',
      position: 'absolute',
      bottom: 1,
    },
    closeBar: {
      width: '100%',
      height: '5%',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: height * 0.014,
    },
    barIndicator: {
      width: width * 0.1,
      height: height * 0.005,
      backgroundColor: Color.text2,
      borderRadius: width * 0.005,
    },
    title: {
      fontSize: width * 0.05,
      fontFamily: Fonts.RobotoSemiBold,
      color: Color.text3,
      marginBottom: height * 0.015,
      textAlign: 'center',
    },
    input: {
      width: '100%',
      height: height * 0.079,
      borderWidth: width * 0.001,
      borderColor: Color.text2,
      borderRadius: width * 0.02,
      paddingHorizontal: width * 0.04,
      marginBottom: height * 0.015,
      color: Color.text2,
    },
    buttonWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: height * 0.09,
      gap: width * 0.04,
      //   width:'100%'
    },
    button: {
      flex: 1,
      paddingVertical: height * 0.025,
      borderRadius: width * 0.015,
      marginHorizontal: width * 0.0,
      alignItems: 'center',
    },
    buttonText: {
      color: Color.white,
      fontFamily: Fonts.RobotoMedium,
      fontSize: width * 0.04,
      //   fontWeight: 'bold',
    },
  });
};
