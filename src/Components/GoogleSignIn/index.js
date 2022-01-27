import React, { useEffect } from 'react'
import { Button } from 'react-native'
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'

function GoogleSignIn () {
  async function onGoogleButtonPress () {
    GoogleSignin.configure()
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn()
    console.log('')
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  return (
    <GoogleSigninButton
      style={{ width: 168, height: 48, marginBottom: 24 }}
      size={GoogleSigninButton.Size.Standard}
      color={GoogleSigninButton.Color.Dark}
      onPress={onGoogleButtonPress}
    />
  )
}

export default GoogleSignIn
