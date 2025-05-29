import {View, useColorScheme, Animated} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
// import images from '../../assets/image';
import {imageSlider} from '../../assets/imageslider';
import {useNavigation} from '@react-navigation/native';
import colors from '../../assets/colors';
import useThemeStore from '../../store/themeStore';

const Loding = () => {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const navigation = useNavigation();

  const theme = useThemeStore(state=>state.theme); // find the dark or light mode
  const styles = getStyle(theme);
  const Color=colors[theme]
  const {t} = useTranslation('loading');
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        // Change image and fade in
        setIndex(prevIndex => (prevIndex + 1) % imageSlider.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      });
    }, 1000); // every 1 second

    setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    return () => clearInterval(interval);
    // cleanup on unmount
  }, []);
  return (
    <View style={styles.container}>
      <AppStatusBar background={colors[theme].background} />
      {/* <Text style={styles.text}>{t('title')}</Text> */}
      <Animated.Image
        source={imageSlider[index]}
        style={[styles.image, {opacity: fadeAnim}]}
        resizeMode="cover"
      />
    </View>
  );
};

export default Loding;
