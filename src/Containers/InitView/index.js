/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Button,
  View,
} from 'react-native'
import { Navigation } from 'react-native-navigation'
// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen'
import auth from '@react-native-firebase/auth'

const createStackChild = (id, names, options) => ({
  stack: {
    id,
    children: names.map(({name}) => ({
      component: {
        name,
      },
    })),
    options,
  },
})

const InitView = props => {
  const isDarkMode = useColorScheme() === 'dark'

  // Handle user state changes
  function onAuthStateChanged (user) {
    console.log('UID:', user && user.uid)
    // SET USET GLOBALLY?
    if (!user) {
      return Navigation.setStackRoot(props.componentId, {
        component: {
          name: 'Login',
        },
      })
    }

    Navigation.setStackRoot(props.componentId, {
      component: {
        name: 'Main',
      },
    })
  }

  useEffect(() => {
    console.log('AUH:', auth)
    
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    // setTimeout(() => {
    //   console.log('NB', Navigation)

    //   Navigation.setStackRoot(props.componentId, {
    //     component: {
    //       name: 'Login',
    //     },
    //   })
    // }, 3000)

    // return subscriber // unsubscribe on unmount
  }, [])

  // console.log('ISER:', Object.keys(auth().signOut))
  // auth().signOut()

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: 'pink'}}></View>
    // </SafeAreaView>
  )
}

export default InitView
