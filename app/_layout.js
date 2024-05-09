import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import PersonnelInformation from './PersonnelInformation';
import LoginScreen from './LoginScreen';
import SignupScreen from './SignupScreen';
import TabsScreen from './TabsScreen';  // Assuming this represents some tab navigators.

const Stack = createStackNavigator();

function RootLayout() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Index" component={IndexScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Tabs" component={TabsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Personnel_Information" component={PersonnelInformation} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default RootLayout;
