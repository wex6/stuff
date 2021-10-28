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
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  useColorScheme,
  Button,
  View,
} from 'react-native'
import Fuse from 'fuse.js'
import s from './styles'
import {Navigation} from 'react-native-navigation'
import auth from '@react-native-firebase/auth'

import Store from '../../Stores'

const StuffItem = props => {
  const onPress = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddItem',
              passProps: {
                editing:true,
                id:props.id,
                tags: props.label?.split(', '),
                image:props.image,
                homeId:props.homeId,
                roomId:props.roomId,
                spotId:props.spotId,
              },
              options: {
                modalPresentationStyle: 'pageSheet',
                topBar: {
                  title: {
                    text: 'Edit Item'
                  }
                }
              },
            },
          },
        ],
      },
    })
  }
  
  return (
    <TouchableOpacity style={s.item} onPress={onPress}>
      <ImageBackground style={s.image} source={{uri: props.image}} />
    </TouchableOpacity>
  )
}

const MainView = props => {
  const userId = auth()?.currentUser?.uid
  const items = Store('items').useStoreData(userId) || {}
  const itemObjects = Object.entries(items)
  const [counts, setCounts] = useState({})
  const [filterText, setFilterText] = useState('')
  const [filteredItems, setFilteredItems] = useState([])

  useEffect(() => {
    const homes = [...new Set(filteredItems.map(([key, i]) => i.homeId))]
    const rooms = [...new Set(filteredItems.map(([key, i]) => i.roomId))]
    const spots = [...new Set(filteredItems.map(([key, i]) => i.spotId))]
    setCounts({
      items: filteredItems.length,
      homes: homes.length,
      rooms: rooms.length,
      spots: spots.length,
    })
  }, [filteredItems.length])

  useEffect(() => {
    setFilteredItems(itemObjects)
  }, [itemObjects.length])

  useEffect(() => {
    if (!filterText) return setFilteredItems(itemObjects)
    console.log('ITEMS:', Object.values(items))
    const fuse = new Fuse(Object.values(items), {
      includeScore: true,
      distance:0,
      keys: ['label']
    })

    console.log('FUs:', fuse.search(filterText))
    const filtered = itemObjects.filter(([key, value]) =>
      value?.label?.toLowerCase()?.includes(filterText?.toLowerCase()),
    )

    setFilteredItems(filtered)
  }, [filterText])

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
                modalPresentationStyle: 'pageSheet',
              },
            },
          },
        ],
      },
    })
    return
  }

  console.log('df:', filteredItems)

  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={s.container}>
      <TextInput
        placeholder='Search'
        onChangeText={setFilterText}
        value={filterText}
        style={{
          height: 44,
          borderRadius: 6,
          padding: 8,
          borderWidth: 2,
          borderColor: '#b3d4df',
          marginBottom: 24,
        }}
      />
      <View style={s.infoBar}>
        <Text>
          {counts.items} Items | {counts.spots} Spots | {counts.rooms} Rooms |{' '}
          {counts.homes} Home
        </Text>
        <Button title='Add' onPress={onAdd} />
      </View>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {filteredItems.map(([key, item]) => (
          <StuffItem id={key} key={key} {...item} />
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
      text: 'Stuff',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
}
