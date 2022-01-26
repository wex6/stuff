/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Button } from 'react-native'
import auth from '@react-native-firebase/auth'

import LoginView from './src/Containers/LoginView'
import MainView from './src/Containers/MainView'
import AddItemView from './src/Containers/AddItemView'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginView} />
        <Stack.Screen name='Main' component={MainView} />

        <Stack.Screen
          name='AddItem'
          component={AddItemView}
          options={{ presentation: 'fullScreenModal' }}
        />
      </Stack.Navigator>
      <Button title='Signout' onPress={() => auth().signOut()}></Button>
    </NavigationContainer>
  )
}

export default App
