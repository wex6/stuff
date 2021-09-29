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
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import storage from '@react-native-firebase/storage'

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
            },
          },
        ],
      },
    })
    return

    launchImageLibrary({}, async c => {
      console.log('CAD:', c)
      const name = c.assets?.[0]?.fileName
      const path = c.assets?.[0]?.uri
      const reference = storage().ref(`test/${name}`)
      const a = await reference.putFile(path)
      console.log('PUAS:', a)
    })
    // actions.addEntry(userId, {
    //   label:'#test #tube #what',
    //   owner: userId,
    //   homeId: 'z1231',
    //   roomId: 'z123113',
    //   spotId: 'z12311'
    // })
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
