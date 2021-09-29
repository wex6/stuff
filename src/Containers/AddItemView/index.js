/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'

import {Text, View} from 'react-native'
import {Navigation} from 'react-native-navigation'
import auth from '@react-native-firebase/auth'
import PlaceView from '../../Components/PlaceView'
import Store from '../../Stores'

const AddItemView = props => {
  const [homeId, setHomeId] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [spotId, setSpotId] = useState(null)

  useEffect(() => {
    setRoomId(null)
  }, [homeId])

  useEffect(() => {
    setSpotId(null)
  }, [roomId])

  const data = Store('places').useStoreData('placeId')
  console.log('data:', data)
  console.log('USER:', auth()?.currentUser?.uid)
  return (
    // <SafeAreaView style={{flex: 1}}>
    <View style={{flex: 1, backgroundColor: '#f4f4f4'}}>
      <View
        style={{
          flexDirection: 'row',
          height: 200,
          padding: 18,
          backgroundColor: 'blue',
        }}>
        <View style={{width: 110, backgroundColor: 'pink', marginRight: 24}} />
        
      </View>
      <PlaceView
        placeId={auth()?.currentUser?.uid}
        type='Homes'
        onPress={setHomeId}
      />
      <PlaceView placeId={homeId} type='Rooms' onPress={setRoomId} />
      <PlaceView placeId={roomId} type='Spots' onPress={setSpotId} />
      <PlaceView placeId={spotId} type='Items' />
    </View>
    // </SafeAreaView>
  )
}

export default AddItemView

AddItemView.options = {
  topBar: {
    title: {
      text: 'Add Item',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
}
