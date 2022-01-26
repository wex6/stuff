/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import { Text } from 'react-native'

import Touchable from '../Touchable'
import Store from '../../Stores'
import s from './styles'

const PlaceItem = props => {
  const place = Store('places').useStoreData(props.id) || {}
  if (props.labelOnly) {
    return (
      <Text style={[{ fontSize: 18, fontWeight: 'bold' }, props.textStyle]}>
        {place.name}
      </Text>
    )
  }
  return (
    <Touchable
      style={s.item(props.selected)}
      onPress={() => {
        console.log('Onpress:', props.id)
        props.onPress(props.id)
      }}
    >
      <Text style={{ fontSize: 18 }}>{place.name}</Text>
    </Touchable>
  )
}

export default PlaceItem
