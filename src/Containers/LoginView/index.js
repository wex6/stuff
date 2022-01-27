import React, { useEffect } from 'react'

import { View, Text } from 'react-native'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'

import GoogleSignIn from '../../Components/GoogleSignIn'
import AppleSignIn from '../../Components/AppleSignIn'
import EmailSignIn from '../../Components/EmailSignIn'

const style = {
  holder: {
    flex: 1,
    backgroundColor: '#d64d47',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  title: { marginBottom: 24, color: 'white', fontWeight: 'bold', fontSize: 24 }
}

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
    <View style={{ flex: 1 }}>
      <View style={style.holder}>
        <Text style={style.title}>STUFF</Text>
        <Text style={{ color: 'white' }}>Answer to</Text>
        <Text style={{ color: 'white' }}>"Where did I keep that?"</Text>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: '#f9Fafc',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        {/* <EmailSignIn /> */}
        <GoogleSignIn />
        <AppleSignIn />
      </View>
    </View>
  )
}

export default LoginView
