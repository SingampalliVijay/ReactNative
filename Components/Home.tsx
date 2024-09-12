import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import Settings from './screens/Settings';
import List from './screens/List';
import Profile from './screens/Profile';
import Icon from 'react-native-vector-icons/MaterialIcons'

const Tab = createBottomTabNavigator();

export default function App() {

  return (
    <Tab.Navigator initialRouteName="Home" screenOptions={{
        tabBarActiveTintColor: '#e91e63', headerShown:false
      }}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }} />
      <Tab.Screen name="List" component={List} options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <Icon name="list" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Profile" component={Profile} options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" color={color} size={size} />
          ),
        }}/>
      <Tab.Screen name="Settings" component={Settings} options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Icon name="settings" color={color} size={size} />
          ),
        }}/>
    </Tab.Navigator>
  );
}

