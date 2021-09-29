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

import auth from '@react-native-firebase/auth'



const InitView = props => {

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: 'pink'}}></View>
    // </SafeAreaView>
  )
}

export default InitView
