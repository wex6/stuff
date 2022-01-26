import React, { useEffect } from 'react'

import { View } from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import LinearGradient from 'react-native-linear-gradient'

import GoogleSignIn from '../../Components/GoogleSignIn'
import AppleSignIn from '../../Components/AppleSignIn'

const LoginView = props => {
  function onAuthStateChanged (user) {
    if (!user) {
      return
    }
    const newUser = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      lastLoginTime: new Date().getTime(),
      providerData: user.providerData
    }
    console.log('TEST11:', newUser)
    // currentUser.current = newUser

    // Update User
    // Create New Place
    database()
      .ref(`users/${user.uid}`)
      .update(newUser)
      .catch(() => {})

    database()
      .ref(`places/${user.uid}_default`)
      .update({
        name: 'My Home',
        parent: user.uid,
        type: 'Homes'
      })
      .catch(() => {})

    database()
      .ref(`places/${user.uid}/places/${user.uid}_default`)
      .update({
        updated_at: new Date().getTime()
      })
      .catch(() => {})

    // Go to main View
    console.log('REPLACE')
    props?.navigation?.replace('Main')
    // console.log('ISER1:', user.uid)
  }

  useEffect(() => {
    // console.log('AUH:', auth)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)
    auth().is
    // return subscriber // unsubscribe on unmount
  }, [])

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={{ flex: 1, backgroundColor: 'pink' }}>
      <View style={{ flex: 1 }}></View>
      <View
        style={{
          flex: 1,

          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <GoogleSignIn />
        <AppleSignIn />
      </View>
    </LinearGradient>
  )
}

export default LoginView
