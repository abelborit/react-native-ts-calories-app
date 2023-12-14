import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {HomeScreen} from '../screens/HomeScreen';
import {AddFoodScreen} from '../screens/AddFoodScreen';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  HomeScreen: undefined; // undefined significa que la ruta no tiene parámetros
  AddFoodScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
        headerStyle: {
          elevation: 0, // quitar la linea abajo del header en Android
          shadowColor: 'transparent', // quitar la linea abajo del header en iOS
          backgroundColor: '#ddd',
        },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      {/* options={{title: 'Página 1'}} colocar el texto que aparecerá en el header */}
      <Stack.Screen
        name="HomeScreen"
        options={{title: 'Home'}}
        component={HomeScreen}
      />
      <Stack.Screen
        name="AddFoodScreen"
        options={{title: 'Add Food'}}
        component={AddFoodScreen}
      />
    </Stack.Navigator>
  );
};
