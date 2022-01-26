/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'

import { Text, ImageBackground } from 'react-native'

import s from './styles'
import { useNavigation } from '@react-navigation/native'
import LinearGradient from 'react-native-linear-gradient'

import Touchable from '../../Components/Touchable/'
// import { Navigation } from 'react-native-navigation'

const StuffItem = props => {
  const navigation = useNavigation()
  const onPress = () => {
    navigation.navigate('AddItem', {
      editing: true,
      createdAt: props.createdAt,
      id: props.id,
      tags: props.label?.split(', '),
      image: props.image,
      homeId: props.homeId,
      roomId: props.roomId,
      spotId: props.spotId
    })
  }

  const labels = props.label?.split(', ') || []

  return (
    <Touchable style={s.item} onPress={onPress}>
      <ImageBackground
        style={s.image}
        source={{ uri: props.image, cache: 'force-cache' }}
      />
      <LinearGradient
        colors={['#0000', '#000f']}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 12
        }}>
        <Text style={s.label}>
          {labels.map(label => `#${label}`).join(', ')}
        </Text>
      </LinearGradient>
    </Touchable>
  )
}

export default StuffItem
