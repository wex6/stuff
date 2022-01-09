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
import Touchable from '../../Components/Touchable/'
import { Navigation } from 'react-native-navigation'

const StuffItem = props => {
  const onPress = () => {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'AddItem',
              passProps: {
                editing: true,
                id: props.id,
                tags: props.label?.split(', '),
                image: props.image,
                homeId: props.homeId,
                roomId: props.roomId,
                spotId: props.spotId
              },
              options: {
                modalPresentationStyle: 'pageSheet',
                topBar: {
                  title: {
                    text: 'Edit Item'
                  }
                }
              }
            }
          }
        ]
      }
    })
  }

  const labels = props.label?.split(', ') || []

  return (
    <Touchable style={s.item} onPress={onPress}>
      <ImageBackground style={s.image} source={{ uri: props.image }} />
      <Text
        style={{
          textShadowColor: 'black',
          textShadowOffset: { width: 2, height: 1 },
          textShadowRadius: 3,
          position: 'absolute',
          bottom: 12,
          left: 8,
          fontSize: 16,
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        {labels.map(label => `#${label}`).join(', ')}
      </Text>
    </Touchable>
  )
}

export default StuffItem
