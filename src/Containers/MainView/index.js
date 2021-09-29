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
  TouchableOpacity,
  Text,
  useColorScheme,
  Button,
  View,
} from 'react-native'

import s from './styles'
import {Navigation} from 'react-native-navigation'
import auth from '@react-native-firebase/auth'

import Store from '../../Stores'

const StuffItem = props => {
  const onPress = () => {}
  return <TouchableOpacity style={s.item} onPress={onPress} />
}

const MainView = props => {
  const userId = auth()?.currentUser?.uid
  const items = Store('items').useStoreData(userId) || {}
  const [, actions] = Store('items').useStore()
  const itemObjects = Object.entries(items)

  const onAdd = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddItem',
              passProps: {
                text: 'stack with one child',
              },
              options: {
                modalPresentationStyle:'pageSheet',
                layout: {
                  backgroundColor: 'cyan'
                }
              }
            },
          },
        ],
      },
    })
    return
  }

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={s.container}>
      <View style={s.infoBar}>
        <Text>{itemObjects.length} Items | 10 Spots | 3 Rooms | 1 Home</Text>
        <Button title='Add' onPress={onAdd} />
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {itemObjects.map(([key, item]) => (
          <StuffItem key={key} {...item} />
        ))}
      </View>
    </View>
    // </SafeAreaView>
  )
}

export default MainView

MainView.options = {
  topBar: {
    title: {
      text: 'Items',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
}
