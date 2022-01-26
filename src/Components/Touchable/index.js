import React from 'react'
import { TouchableOpacity } from 'react-native'

export default (props) => {
  
  const onPress = e => {
    const gaAction = props.gaAction || 'rn_press'
    if (props.gaLabel) {
      if (props.gaValue) {
        GATracker?.trackEvent(
          gaAction,
          props.gaLabel,
          props.gaValue
        )
      } else {
        GATracker?.trackEvent(gaAction, props.gaLabel)
      }
    }
    if (!props.onPress) return
    props.onPress(e)
  }
  
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        {...props}
        onPress={onPress}
      >
        {props.children}
      </TouchableOpacity>
    )
  
} 
