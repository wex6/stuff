/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react'

import {Text, View, ScrollView, Button, TouchableOpacity} from 'react-native'
import {Navigation} from 'react-native-navigation'
import Dialog from 'react-native-dialog'
import Store from '../../Stores'
import s from './styles'

const PlaceItem = props => {
  const place = Store('places').useStoreData(props.id) || {}
  return (
    <TouchableOpacity
      style={s.item}
      onPress={() => {
        console.log('Onpress:', props.id)
        props.onPress(props.id)
      }}>
      <Text style={{fontSize: 18}}>{place.name}</Text>
    </TouchableOpacity>
  )
}

const PlaceView = props => {
  const [, actions] = Store('places').useStore()
  const [showAdd, setShowAdd] = useState(false)
  const [newText, setNewText] = useState('')
  const place = Store('places').useStoreData(props.placeId) || {}
  const onAddRequest = () => {
    setNewText('')
    setShowAdd(true)
  }

  const onCreate = async () => {
    const placeId = await actions.addBaseEntry({
      name: newText,
      type: props.type,
      parent: props.placeId,
    })
    actions.updateEntry(`${props.placeId}/places`, placeId, {
      addedAt: new Date().getTime(),
    })
    setShowAdd(false)
  }

  if (!props.placeId) return null
  const places = place?.places || {}
  const items = place?.items || {}
  const displayType = props.type.slice(0, -1)
  return (
    <View style={s.container}>
      <View style={s.nameContainer}>
        <Text style={s.nameText}>
          {props.type} {place.name ? `in ${place.name}` : null}
          <Text style={{fontSize: 18}}> ({Object.keys(places).length})</Text>
        </Text>
        <Button title='Add' onPress={onAddRequest} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{width: 10}}></View>
        {Object.entries(places).map(([key, item]) => (
          <PlaceItem id={key} onPress={props.onPress} />
        ))}
      </ScrollView>
      <Dialog.Container
        visible={showAdd}
        onBackdropPress={() => setShowAdd(false)}>
        <Dialog.Title>Add {displayType}</Dialog.Title>
        <Dialog.Description>
          Add a {displayType} in your list
        </Dialog.Description>
        <Dialog.Input
          autoFocus
          placeholder={`${displayType} name`}
          onChangeText={setNewText}
          value={newText}
        />
        <Dialog.Button label='Cancel' onPress={() => setShowAdd(false)} />
        <Dialog.Button label='Create' onPress={onCreate} />
      </Dialog.Container>
    </View>
  )
}

export default PlaceView

PlaceView.defaultProps = {
  type:'',
  items: [],
  onPress: () => {},
}
