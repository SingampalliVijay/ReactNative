import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Categories from './Categories';
import Users from './Users';
import Cart from './Cart/Cart';
import ProductsStack from './ProductsStack';

const Tab = createBottomTabNavigator();

export default function ProductsHome() {

  return (
    <Tab.Navigator initialRouteName="Products" screenOptions={{
      tabBarActiveTintColor: '#e91e63', headerShown: false
    }}>
      <Tab.Screen name="Products" component={ProductsStack} options={{
        tabBarLabel: 'Products',
        tabBarIcon: ({ color, size }) => (
          <Icon name="list" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Categoires" component={Categories} options={{
        tabBarLabel: 'Category',
        tabBarIcon: ({ color, size }) => (
          <MaterialIcon name="category" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Users" component={Users} options={{
        tabBarLabel: 'Users',
        tabBarIcon: ({ color, size }) => (
          <Icon name="person" color={color} size={size} />
        ),
      }} />
      <Tab.Screen name="Cart" component={Cart} options={{
        tabBarLabel: 'Cart',
        tabBarIcon: ({ color, size }) => (
          <Icon name="cart" color={color} size={size} />
        ),
      }} />
    </Tab.Navigator>
  );
}

