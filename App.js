import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Landing from './navigation/Landing';
import Signup from './navigation/Signup';
import Login from './navigation/Login';
import HomePage from './navigation/HomePage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useState } from 'react';


export default function App() {
  const Stack = createStackNavigator()
  const [loggedIn, setloggedIn] = useState(false);

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const maybe = await AsyncStorage.getItem('isloggedin')
        if (maybe == 'Yes') {
          setloggedIn(true)
        }
        else {
          setloggedIn(false)
        }
      } catch (error) {
        console.error(error)
        setloggedIn(false)
      }
    }
    checkLoginStatus();
  })

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {loggedIn ? (
          <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
        ) : (
          <>
            <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name='Signup' component={Signup} options={{ headerShown: false }} />
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='HomePage' component={HomePage} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

