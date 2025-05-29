import {
  View,
  Text,
  useColorScheme,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import getStyle from './styles';
import AppStatusBar from '../../components/AppStatusBar';
import Swiper from 'react-native-swiper';
import {useTranslation} from 'react-i18next';
import colors, {getThemeColors} from '../../assets/colors';
import splassSliderData from '../../assets/splassSliderData';
import {getDeviceLanguage} from '../../assets/checkLanguage';
import Svg, {Path} from 'react-native-svg';
import Splassstring from '../../assets/string';
import {useNavigation} from '@react-navigation/native';
import useThemeStore from '../../store/themeStore';

const Splass = () => {
  const navigation = useNavigation();
  function swiperHandler() {
    if (currentIdx < splassSliderData.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      navigation.replace('Login');
    }
  }

  useEffect(() => {
    const data = getDeviceLanguage();
    console.log('data', data);
    setlanguage(data);
  }, []);

  function moveToLoginScreen() {
    navigation.replace('Login');
  }

  const theme = useThemeStore(state => state.theme);
  const style = getStyle(theme);
  const Color = colors[theme];
  const {t} = useTranslation('splass');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [language, setlanguage] = useState('en');
  return (
    <View style={style.container}>
      {/*Status bar */}
      <AppStatusBar
        background={colors[theme].background}
      />
      <Swiper
        loop={false}
        // autoplay
        showsPagination
        dotColor="#45B1F4"
        activeDotColor="#7FD7FF"
        removeClippedSubviews={false}
        horizontal
        index={currentIdx}
        onIndexChanged={pre => setCurrentIdx(pre)}
        activeDotStyle={style.activedotstyle}>
        {splassSliderData.map(item => (
          <View style={style.slide} key={item.id}>
            <View style={style.upperPart}>
              <Image source={item.img} style={style.imgStyle} />
              <View style={style.infoWrapper}>
                <Text style={style.title}>
                  {language === 'hi' ? item?.titleHn : item?.titleEn}
                </Text>
                <Text style={style.subTitle}>
                  {language === 'hi' ? item?.subTitleHn : item?.subTitleEn}
                </Text>
              </View>
            </View>

            <View style={style.curveContainer}>
              <Svg
                height="90"
                width="100%"
                viewBox="0 0 100 100"
                preserveAspectRatio="none">
                <Path
                  d="
            M0,0
            Q50,500 500,0
            L100,100
            Q50,110 0,100
            Z
          "
                  fill={Color.upperBorder}
                />
              </Svg>
            </View>
          </View>
        ))}

        {/*

  */}
      </Swiper>
      <View style={style.lowerWrapper}>
        <View style={style.lowePart}>
          <TouchableOpacity
            style={style.getStartedBtn}
            onPress={moveToLoginScreen}>
            <Text style={style.getStartedBtnTxt}>
              {/* get started */}
              {language === 'hi'
                ? Splassstring.btnTitleHn
                : Splassstring.btnTitleEn}
            </Text>
          </TouchableOpacity>
          <View style={style.skipOrNxtBtnWrapper}>
            <TouchableOpacity onPress={moveToLoginScreen}>
              <Text style={style.skipTxt}>
                {language === 'hi' ? Splassstring.skipHn : Splassstring.skipEn}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.nextBtn}
              onPress={() => swiperHandler()}>
              <Text style={style.nextBtnTxt}>
                {language === 'hi' ? Splassstring.nextHn : Splassstring.nextEn}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Splass;
