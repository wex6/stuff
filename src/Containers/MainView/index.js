/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react'

import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  Button,
  View
} from 'react-native'

// import Fuse from 'fuse.js'
import pluralize from 'pluralize'
import s from './styles'
import Touchable from '../../Components/Touchable/'
import StuffItem from '../../Components/StuffItem/'
import { AppEventsLogger } from 'react-native-fbsdk-next'
// import {Navigation} from 'react-native-navigation'
import auth from '@react-native-firebase/auth'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

import Store from '../../Stores'

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
      spots: spots.length
    })
  }, [filteredItems.length])

  useEffect(() => {
    setFilteredItems(itemObjects)
  }, [itemObjects.length])

  useEffect(() => {
    if (!filterText) return setFilteredItems(itemObjects)
    console.log('ITEMS:', Object.values(items))
    // const fuse = new Fuse(Object.values(items), {
    //   includeScore: true,
    //   distance:0,
    //   keys: ['label']
    // })

    // console.log('FUs:', fuse.search(filterText))
    const filtered = itemObjects.filter(([key, value]) =>
      value?.label?.toLowerCase()?.includes(filterText?.toLowerCase())
    )

    setFilteredItems(filtered)
  }, [filterText])

  const onAdd = () => {
    try {
      AppEventsLogger.logEvent(AppEventsLogger.AppEvents.UnlockedAchievement)
    } catch (error) {}
    // launchImageLibrary(
    launchCamera(
      {
        saveToPhotos: true,
        maxWidth: 440,
        maxHeight: 656
      },
      async c => {
        if (c.didCancel || c.errorCode) return
        const imageName = c.assets?.[0]?.fileName
        const imagePath = c.assets?.[0]?.uri

        setTimeout(() => {
          props.navigation.navigate('AddItem', { imageName, imagePath })
        }, 500)
      }
    )

    return
  }

  // console.log('df:', filteredItems)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View style={s.container}>
          <View style={{ flexDirection: 'row' }}>
            <View
              style={{
                marginHorizontal: 12,
                alignItems: 'center',
                height: 50,
                justifyContent: 'space-around'
              }}>
              <Text style={{ fontFamily: 'Montserrat-Regular' }}>
                Where is my
              </Text>
              <Text
                style={{
                  fontFamily: 'Montserrat-Regular',
                  marginTop: 8,
                  fontSize: 22,
                  fontWeight: 'bold'
                }}>
                STUFF
              </Text>
            </View>
            {/* <View style={{flex:1}}> */}

            <TextInput
              placeholder='Search for Stuff'
              onChangeText={setFilterText}
              value={filterText}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 6,
                padding: 8,
                borderWidth: 2,
                borderColor: '#b3d4df',
                marginBottom: 24
              }}
            />
            {/* </View> */}
          </View>
          <View style={s.infoBar}>
            <Text>
              {pluralize('Item', counts.items, true)} |{' '}
              {pluralize('Spot', counts.spots, true)} |{' '}
              {pluralize('Room', counts.rooms, true)} |{' '}
              {pluralize('Home', counts.homes, true)}
            </Text>
            <Touchable
              onPress={onAdd}
              style={{
                borderRadius: 6,
                padding: 8,
                paddingHorizontal: 12,
                borderWidth: 2,
                borderColor: '#84cce4'
              }}>
              <Text
                style={{ fontSize: 14, fontWeight: 'bold', color: '#84cce4' }}>
                Add
              </Text>
            </Touchable>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {filteredItems.map(([key, item]) => (
              <StuffItem id={key} key={key} {...item} />
            ))}
          </View>
          <Button
            title='Sign Out'
            onPress={() => {
              auth()
                .signOut()
                .then(() => props.navigation.replace('Login'))
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default MainView

MainView.options = {}
