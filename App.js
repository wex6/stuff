/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Button } from 'react-native'
// import auth from '@react-native-firebase/auth'
import codePush from 'react-native-code-push'

import LoginView from './src/Containers/LoginView'
import MainView from './src/Containers/MainView'
import AddItemView from './src/Containers/AddItemView'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { setCustomText } from 'react-native-global-props'
import auth from '@react-native-firebase/auth'

const customTextProps = {
  style: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: 'black'
  }
}

setCustomText(customTextProps)

const Stack = createNativeStackNavigator()

const App = () => {
  const user = auth().currentUser
  console.log('USER:', user)
  const initialRouteName = user ? 'Main' : 'Login'
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={LoginView} />
        <Stack.Screen name='Main' component={MainView} />

        <Stack.Screen
          name='AddItem'
          component={AddItemView}
          options={{ presentation: 'fullScreenModal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default codePush(App)
