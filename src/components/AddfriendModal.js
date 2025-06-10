import {
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import colors from '../assets/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fonts from '../assets/Fonts';
import {getDeviceLanguage} from '../assets/checkLanguage';
import {chatScreen} from '../assets/string';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('window');

const AddfriendModal = ({isVisible, theme, onClose, setVisible}) => {
  const style = getStyle(theme);
  const [language, setlanuage] = useState('en');
  useEffect(() => {
    setlanuage(getDeviceLanguage());
  }, [language, setlanuage]);

  const navigation = useNavigation();

  function MoveToCreateGrupScreen() {
    navigation.navigate('CreateGroup');
    setVisible(false);
  }

  return (
    <Modal visible={isVisible} transparent animationType="fade">
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={style.container}>
              {/* First Row */}
              <TouchableOpacity style={style.row}>
                <FontAwesome6
                  name="user"
                  size={17}
                  color={colors[theme].ModalIconColor}
                />
                <Text style={style.text}>
                  {language === 'en'
                    ? chatScreen?.addFrindeEn
                    : chatScreen?.addFrindeHi}
                </Text>
              </TouchableOpacity>

              {/* Second Row */}
              <TouchableOpacity
                style={style.row}
                onPress={MoveToCreateGrupScreen}>
                <MaterialIcons
                  name="groups"
                  size={20}
                  color={colors[theme].ModalIconColor}
                />
                <Text style={style.text}>
                  {language === 'en'
                    ? chatScreen?.CreateGroupEn
                    : chatScreen?.CreateGroupHi}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddfriendModal;

const getStyle = theme => {
  const Color = colors[theme];
  return StyleSheet.create({
    container: {
      backgroundColor: Color.ModalBackground,
      width: width * 0.6,
      height: height * 0.17,
      //   paddingVertical: height * 0.02,
      paddingHorizontal: width * 0.04,
      borderRadius: width * 0.02,
      alignSelf: 'center',
      marginTop: height * 0.13,
      justifyContent: 'center',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      //   justifyContent:'center',
      //   paddingBottom:10
      marginBottom: height * 0.017,
      gap: width * 0.02,
    },
    text: {
      fontSize: width * 0.036,
      color: Color.text2,
      //   marginLeft: width * 0.03,
      fontFamily: Fonts.RobotoRegular,
      paddingTop: 3,
      //   marginTop:height*0.01
    },
  });
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});
