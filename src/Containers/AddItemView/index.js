/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'

import {
  Text,
  View,
  TextInput,  
  ScrollView,
  SafeAreaView,
  Pressable,
} from 'react-native'
import {Navigation} from 'react-native-navigation'
import auth from '@react-native-firebase/auth'
import PlaceView from '../../Components/PlaceView'
import Store from '../../Stores'

const AddItemView = props => {
  const [homeId, setHomeId] = useState(null)
  const [roomId, setRoomId] = useState(null)
  const [spotId, setSpotId] = useState(null)
  const [inputText, setInputText] = useState(null)
  const [tags, setTags] = useState([])

  useEffect(() => {
    setRoomId(null)
  }, [homeId])

  useEffect(() => {
    setSpotId(null)
  }, [roomId])

  const data = Store('places').useStoreData('placeId')
  // console.log('data:', data)
  // console.log('USER:', auth()?.currentUser?.uid)
  const addTag = () => {
    const newTags = [inputText, ...tags]
    setTags(newTags)
    setInputText('')
  }
  return (
    // <SafeAreaView style={{flex: 1}}>
    <SafeAreaView style={{flex: 1, justifyContent: 'flex-end'}}>
      <ScrollView style={{flex:1, backgroundColor: '#f4f4f4'}}>
        <View
          style={{
            flexDirection: 'row',
            padding: 18,
          }}>
          <View
            style={{
              width: 110,
              height: 164,
              backgroundColor: 'pink',
              marginRight: 24,
            }}
          />
          <View style={{flex: 1}}>
            <Text style={{fontSize: 18, marginBottom: 8}}>This is a </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TextInput
                style={{
                  flex: 1,
                  height: 44,
                  backgroundColor: 'white',
                  paddingHorizontal: 8,
                }}
                onChangeText={setInputText}
                value={inputText}
              />
              <Pressable
                onPress={addTag}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 12,
                  height: 44,
                  width: 44,
                  backgroundColor: 'red',
                }}
              />
            </View>
            <Text style={{fontSize: 12, marginVertical: 8}}>
              (Add more tags to find it easily later)
            </Text>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {tags.map(tag => (
                <Text key={tag} style={{fontSize: 14, marginRight: 12}}>
                  #{tag}
                </Text>
              ))}
            </View>
          </View>
        </View>
        <Text style={{fontSize: 28, marginLeft: 16, margin: 8}}>
          Where is this stuff?
        </Text>
        <PlaceView
          placeId={auth()?.currentUser?.uid}
          type='Homes'
          onPress={setHomeId}
        />
        <PlaceView placeId={homeId} type='Rooms' onPress={setRoomId} />
        <PlaceView placeId={roomId} type='Spots' onPress={setSpotId} />
        <PlaceView placeId={spotId} type='Items' />
      </ScrollView>
      <Pressable style={{height: 56, backgroundColor: 'black'}} />
    </SafeAreaView>
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
