/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect, useRef} from 'react'

import {
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
} from 'react-native'
import {Navigation} from 'react-native-navigation'
import auth from '@react-native-firebase/auth'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import LottieView from 'lottie-react-native'
import storage from '@react-native-firebase/storage'

import PlaceView from '../../Components/PlaceView'
import Store from '../../Stores'
import s from './styles'

const AddItemView = props => {
  // console.log('TED:', props.text)
  const [homeId, setHomeId] = useState(props.homeId)
  const [roomId, setRoomId] = useState(props.roomId)
  const [spotId, setSpotId] = useState(props.spotId)
  const [inputText, setInputText] = useState(null)
  const [imageUri, setImageUri] = useState(props.image)
  const finalImageUri = useRef(props.image)
  const textInput = useRef(null)
  const [tags, setTags] = useState(props.tags || [])
  const [loading, setLoading] = useState(false)
  const [, actions] = Store('items').useStore()
  useEffect(() => {
    const newRoomId = homeId === props.homeId ? props.roomId : null
    setRoomId(newRoomId)
  }, [homeId])

  useEffect(() => {
    const newSpotId = roomId === props.roomId ? props.spotId : null
    setSpotId(newSpotId)
  }, [roomId])

  const addTag = () => {
    const newTags = [inputText, ...tags]
    setTags(newTags)
    setInputText('')
  }

  const addItem = async () => {
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
        spotId,
      })
      actions.updateEntry(userId, props.id, {
        image: finalImageUri.current,
        label: tags.join(', '),
        owner: userId,
        placeId: spotId,
        homeId,
        roomId,
        spotId,
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
      spotId,
    })
    Navigation.dismissModal(props.componentId)
  }

  const uploadImage = () => {
    launchImageLibrary({}, async c => {
      const name = c.assets?.[0]?.fileName
      const path = c.assets?.[0]?.uri
      setImageUri(path)
      const reference = storage().ref(`test/${name}`)
      const a = await reference.putFile(path)
      const url = await reference.getDownloadURL()
      finalImageUri.current = url
    })
  }

  const onKeyPress = ({nativeEvent}) => {
    console.log('IT::', inputText)

    if (!inputText) return
    addTag()
    // console.log('nativeEvent:', nativeEvent)
    // return
    // console.log('KC:', keyValue)
    // if(keyValue.length < 2) return
    // console.log('TEST:', textInput)
    // textInput.current.focus()
  }

  console.log('ROOMID:', roomId)

  return (
    // <SafeAreaView style={{flex: 1}}>
    <KeyboardAvoidingView behavior='padding' style={{flex: 1}}>
      <SafeAreaView style={s.safeArea}>
        <ScrollView style={s.container}>
          <View
            style={{
              flexDirection: 'row',
              padding: 18,
            }}>
            <Pressable onPress={uploadImage}>
              {imageUri ? (
                <Image
                  resizeMode='cover'
                  source={{uri: imageUri}}
                  style={s.image}
                />
              ) : (
                <View style={s.imageContainer}>
                  <LottieView
                    style={{width: 64}}
                    source={require('../../assets/camera.json')}
                    autoPlay
                    loop
                  />
                </View>
              )}
            </Pressable>
            <View style={{flex: 1}}>
              <Text style={{fontSize: 18, marginBottom: 8}}>This is a </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TextInput
                  ref={textInput}
                  placeholder='Add tags'
                  style={s.input}
                  returnKeyType='done'
                  onSubmitEditing={onKeyPress}
                  onChangeText={setInputText}
                  value={inputText}
                />
                <Pressable onPress={addTag} style={s.addTag}>
                  {/* <LottieView
                  source={require('../../assets/add-new.json')}
                  autoPlay
                  loop
                /> */}
                </Pressable>
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
            selectedId={homeId}
            onPress={setHomeId}
          />
          <PlaceView
            placeId={homeId}
            type='Rooms'
            selectedId={roomId}
            onPress={setRoomId}
          />
          <PlaceView
            placeId={roomId}
            type='Spots'
            selectedId={spotId}
            onPress={setSpotId}
          />
          {/* <PlaceView placeId={spotId} type='Items' /> */}
        </ScrollView>
        <Pressable style={s.pageButton} onPress={addItem} disabled={loading}>
          <Text style={{color: 'white'}}>
            {props.editing ? 'SAVE' : 'ADD ITEM'}
          </Text>
        </Pressable>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
