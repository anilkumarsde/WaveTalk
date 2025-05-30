import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Pressable,
} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Chat from '../screens/Chat/Chat';
import Group from '../screens/Group/Group';
import Profile from '../screens/Profile/Profile';
import More from '../screens/More/More';
import useThemeStore from '../store/themeStore';
import colors from '../assets/colors';
import Fonts from '../assets/Fonts';

const {height, width} = Dimensions.get('window');

const Tab = createBottomTabNavigator();

// 🔁 Reusable icon with label container
const renderTabIcon = (focused, icon, label) => {
  const backgroundColor = focused ? '#24B8FA' : 'transparent';
  const color = focused ? 'white' : 'gray';

  return (
    <View style={[styles.iconContainer, {backgroundColor}]}>
      {icon(color)}
      <Text style={[styles.label, {color}]}>{label}</Text>
    </View>
  );
};

const BottomTabNavigator = () => {
  const theme = useThemeStore(state => state.theme);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarPressColor: 'transparent',
        tabBarStyle: [
          styles.tabBarStyle,
          {backgroundColor: colors[theme].background},
        ],
        tabBarIcon: ({focused}) => {
          switch (route.name) {
            case 'Chat':
              return renderTabIcon(
                focused,
                color => (
                  <MaterialCommunityIcons
                    name="chat-processing"
                    size={20}
                    color={color}
                  />
                ),
                'Chat',
              );

            case 'Group':
              return renderTabIcon(
                focused,
                color => (
                  <MaterialIcons name="groups" size={20} color={color} />
                ),
                'Group',
              );

            case 'Profile':
              return renderTabIcon(
                focused,
                color => (
                  <FontAwesome name="user-circle-o" size={20} color={color} />
                ),
                'Profile',
              );

            case 'More':
              return renderTabIcon(
                focused,
                color => <Feather name="menu" size={20} color={color} />,
                'More',
              );

            default:
              return null;
          }
        },
      })}>
      <Tab.Screen name="Chat" component={Chat} />
      <Tab.Screen name="Group" component={Group} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="More" component={More} />
      {/*  */}
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: height * 0.13,
    borderTopWidth: 0,
    elevation: 5,
    // width:'100%'
  },
  iconContainer: {
    height: height * 0.1,
    width: height * 0.1,
    borderRadius: width * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.079,
  },
  label: {
    fontSize: width * 0.032,
    marginTop: height * 0.007,
    fontFamily: Fonts.RobotoRegular,
  },
});
