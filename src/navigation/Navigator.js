import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../views/LoginView';
import RegisterScreen from '../views/RegisterView';
import HomeScreen from '../views/HomeView';
import VehicleListScreen from '../views/VehiculoListView';
import VehicleFormScreen from '../views/VehiculoFormView';
import VehicleForm from '../views/VehiculoUpdateView';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="VehicleList" component={VehicleListScreen} />
        <Stack.Screen name="VehicleForm" component={VehicleFormScreen} />
        <Stack.Screen name="VehicleUpdate" component={VehicleForm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
