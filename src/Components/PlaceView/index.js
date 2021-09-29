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
      <Text style={{fontSize: 24}}>{place.name}</Text>
    </TouchableOpacity>
  )
}

const PlaceView = props => {
  const [, actions] = Store('places').useStore()
  const place = Store('places').useStoreData(props.placeId) || {}
  const onAdd = async () => {
    const placeId = await actions.addBaseEntry({
      name: 'Test',
      type: props.type,
      parent: props.placeId,
    })
    actions.updateEntry(`${props.placeId}/places`, placeId, {
      addedAt: new Date().getTime(),
    })
  }
  if (!props.placeId) return null
  const places = place?.places || {}
  const items = place?.items || {}
  return (
    <View style={s.container}>
      <View style={s.nameContainer}>
        <Text style={s.nameText}>
          {props.type} {place.name ? `in ${place.name}` : null}
          <Text style={{fontSize: 18}}> ({Object.keys(places).length})</Text>
        </Text>
        <Button title='Add' onPress={onAdd} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={{width: 10}}></View>
        {Object.entries(places).map(([key, item]) => (
          <PlaceItem id={key} onPress={props.onPress} />
        ))}
      </ScrollView>
    </View>
  )
}

export default PlaceView

PlaceView.defaultProps = {
  items: [],
  onPress: () => {},
}
