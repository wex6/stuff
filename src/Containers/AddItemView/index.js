/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect, useRef } from 'react'

import {
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  LayoutAnimation,
  SafeAreaView,
  Pressable
} from 'react-native'
import { Navigation } from 'react-native-navigation'
import auth from '@react-native-firebase/auth'

// import LottieView from 'lottie-react-native'
import storage from '@react-native-firebase/storage'
// import { Modalize } from 'react-native-modalize'

import Store from '../../Stores'
import PlaceView from '../../Components/PlaceView'
import PlaceItem from '../../Components/PlaceItem'
import Touchable from '../../Components/Touchable'
import s from './styles'

const IMAGE =
  'https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8&w=1000&q=80'

const AddItemView = props => {
  // console.log('TED:', props.text)
  const [homeId, setHomeId] = useState(props.homeId)
  const [roomId, setRoomId] = useState(props.roomId)
  const [spotId, setSpotId] = useState(props.spotId)
  const [inputText, setInputText] = useState(null)
  const [imageUri, setImageUri] = useState(props.image)
  const finalImageUri = useRef(props.image)
  const tagsInput = useRef(null)
  const [tags, setTags] = useState(props.tags || [])
  const [loading, setLoading] = useState(false)
  const [, actions] = Store('items').useStore()

  const setId = func => id => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    func(id)
  }

  const uploadImage = async () => {
    if (props.image) return

    const reference = storage().ref(`test/${props.imageName}`)
    await reference.putFile(props.imagePath)
    const url = await reference.getDownloadURL()
    finalImageUri.current = url
    console.log('FUI:', (finalImageUri.current = url))
  }

  useEffect(() => {
    uploadImage()
  }, [])

  useEffect(
    () => {
      const newRoomId = homeId === props.homeId ? props.roomId : null
      setRoomId(newRoomId)
    },
    [homeId]
  )

  useEffect(
    () => {
      const newSpotId = roomId === props.roomId ? props.spotId : null
      setSpotId(newSpotId)
    },
    [roomId]
  )

  const addTag = () => {
    const newTags = [inputText, ...tags]
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTags(newTags)
    setInputText('')
  }

  const addItem = async () => {
    if (loading) return
    setLoading(true)
    const userId = auth()?.currentUser?.uid
    if (props.editing) {
      console.log('EDIT:', props.id, {
        image: finalImageUri.current,
        label: tags.join(', '),
        owner: userId,
        placeId: spotId,
        homeId,
        roomId,
        spotId
      })
      actions.updateEntry(userId, props.id, {
        image: finalImageUri.current,
        label: tags.join(', '),
        owner: userId,
        placeId: spotId,
        homeId,
        roomId,
        spotId
      })
      Navigation.dismissModal(props.componentId)
      return
    }

    if (!tags.length) return
    // if(!finalImageUri.current) return
    // if (!homeId) return
    // if (!roomId) return
    // if (!spotId) return

    actions.addEntry(userId, {
      image: finalImageUri.current,
      label: tags.join(', '),
      owner: userId,
      placeId: spotId,
      homeId,
      roomId,
      spotId
    })
    Navigation.dismissModal(props.componentId)
  }

  const onKeyPress = ({ nativeEvent }) => {
    console.log('IT::', inputText)

    if (!inputText) return
    addTag()
    // console.log('nativeEvent:', nativeEvent)
    // return
    // console.log('KC:', keyValue)
    // if(keyValue.length < 2) return
    // console.log('TEST:', textInput)
    //
  }

  console.log('ROOMID:', roomId)

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: 'white' }}
    >
      <View style={{ flex: 1 }}>
        <Image
          resizeMode="cover"
          style={{ backgroundColor: 'black', height: '100%' }}
          source={{ uri: imageUri || props.imagePath }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 48,
            borderTopLeftRadius: 44,
            borderTopRightRadius: 44,
            backgroundColor: 'white'
          }}
        />
      </View>
      <View style={{ backgroundColor: 'white', paddingBottom: 44 }}>
        <View style={{ padding: 24, paddingVertical: 0 }}>
          <Text style={{ fontSize: 18 }}>The stuff is</Text>
          <View
            style={{ marginTop: 12, flexDirection: 'row', flexWrap: 'wrap' }}
          >
            {tags.map(tag => (
              <Text
                key={tag}
                style={{ fontSize: 16, fontWeight: 'bold', marginRight: 12 }}
              >
                #{tag}
              </Text>
            ))}
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 12
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>#</Text>

            <TextInput
              placeholder="Search for Stuff"
              ref={tagsInput}
              returnKeyType="done"
              onSubmitEditing={onKeyPress}
              onChangeText={setInputText}
              value={inputText}
              style={{
                flex: 1,
                height: 50,
                borderRadius: 6,
                padding: 8,
                borderWidth: 2,
                borderColor: '#b3d4df',
                marginHorizontal: 12
              }}
            />
          </View>
          {/* Stuff Location */}
        </View>
        {!tags.length ? null : (
          <View>
            <Text style={{ fontSize: 18, margin: 12, marginLeft: 18 }}>
              {!spotId ? 'Where is it?' : 'The stuff is at'}
            </Text>
            {!spotId ? null : (
              <ScrollView horizontal bounce={false} contentContainerStyle={{alignItems: 'center'}}>
                <View style={{ width: 24 }} />
                <PlaceItem id={homeId} labelOnly />
                <Text style={{fontSize:18, fontWeight: 'bold'}}>  ->  </Text>
                <PlaceItem id={roomId} labelOnly />
                <Text style={{fontSize:18, fontWeight: 'bold'}}>  ->  </Text>
                <PlaceItem id={spotId} labelOnly />
              </ScrollView>
            )}
            <PlaceView
              style={{ marginTop: 16 }}
              placeId={auth()?.currentUser?.uid}
              type="Homes"
              selectedId={homeId}
              onPress={setId(setHomeId)}
            />
            <PlaceView
              style={{ marginTop: 16 }}
              placeId={homeId}
              type="Rooms"
              selectedId={roomId}
              onPress={setId(setRoomId)}
            />
            <PlaceView
              style={{ marginTop: 16 }}
              placeId={roomId}
              type="Spots"
              selectedId={spotId}
              onPress={setId(setSpotId)}
            />
          </View>
        )}
        {!spotId ? null : (
          <Touchable
            onPress={addItem}
            style={{
              margin: 24,
              marginBottom: 12,
              borderRadius: 999,
              height: 56,
              backgroundColor: 'black',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {loading ? null : (
              <Text
                style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}
              >
                ADD
              </Text>
            )}
          </Touchable>
        )}
      </View>
      {/* </SafeAreaView> */}
    </KeyboardAvoidingView>
  )
}

export default AddItemView

AddItemView.options = {
  topBar: {
    visible: false
  }
}
