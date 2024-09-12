import React from 'react';
import Login from './components/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import Counter from './components/redux/Counter';
import store from './components/redux/Store'
import { Provider } from 'react-redux';
import UserList from './components/redux/UserList';
import ProductsHome from './components/Ecommerce/ProductsHome';
import Calenders from './components/Ecommerce/Calender';
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductsHome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name="Counter" component={Counter} />
        <Stack.Screen name='userList' component={UserList}/>
        <Stack.Screen name='ProductsHome' component={ProductsHome} />
        <Stack.Screen name="calender" component={Calenders} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;