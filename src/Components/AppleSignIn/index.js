import React, { useEffect } from 'react'
import { View } from 'react-native'

import { AppleButton } from '@invertase/react-native-apple-authentication'

import { appleAuth } from '@invertase/react-native-apple-authentication'
import auth from '@react-native-firebase/auth'

function AppleSignIn () {
  async function onAppleButtonPress () {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned'
    }

    // Create a Firebase credential from the response
    const { identityToken, nonce } = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce
    )

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential)
  }

  useEffect(() => {
    // console.log('AUH:', auth)

    return appleAuth.onCredentialRevoked(async () => {
      console.warn(
        'If this function executes, User Credentials have been Revoked'
      )
    })
    // auth().signOut()r
    // return subscriber // unsubscribe on unmount
  }, [])

  return (
    <View>
      <AppleButton
        buttonStyle={AppleButton.Style.WHITE}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: 160, // You must specify a width
          height: 45 // You must specify a height
        }}
        onPress={() => onAppleButtonPress()}
      />
    </View>
  )
}

export default AppleSignIn
