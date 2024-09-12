import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Products from './Products';
import ProductsDetails from './ProductsDetails';

const Stack = createStackNavigator();

function ProductsStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen name='Product' component={Products} options={{ headerShown: false }} />
      <Stack.Screen name='ProductsDetails' component={ProductsDetails} />
    </Stack.Navigator>
  );
}

export default ProductsStack;