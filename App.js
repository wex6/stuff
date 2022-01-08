/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useRef, useState, useEffect} from 'react'
import type {Node} from 'react'

import CodePushComponent from './CodePushComponent'
import {Navigation} from 'react-native-navigation'
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  Button,
  View,
} from 'react-native'

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import {
  AppleButton,
  appleAuth,
} from '@invertase/react-native-apple-authentication'

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin'

const GoogleSignIn = () => {
  return (
    <Button
      title='Google Sign-In'
      onPress={() =>
        onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
      }
    />
  )
}

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark'
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  )
}

const App: () => Node = props => {
  const isDarkMode = useColorScheme() === 'dark'
  const emailText = useRef(null)
  const currentUser = useRef(null)
  const [errorText, setErrorText] = useState('')
  const passwordText = useRef(null)

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  }

  const onGoogleButtonPress = async () => {
    GoogleSignin.configure()
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn()

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential)
  }

  async function onAppleButtonPress () {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    })

    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw 'Apple Sign-In failed - no identify token returned'
    }

    // Create a Firebase credential from the response
    const {identityToken, nonce} = appleAuthRequestResponse
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    )

    // Sign the user in with the credential
    return auth().signInWithCredential(appleCredential)
  }

  // Handle user state changes
  function onAuthStateChanged (user) {
    if (!user) {
      console.log('Heelo:', user, currentUser?.current?.uid, global.base)
      if(currentUser?.current?.uid && !user)
      return Navigation.setStackRoot(props.componentId, global.base)
      return
      
  }
  console.log('TEST11')
    const newUser = {
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      photoURL: user.photoURL,
      isAnonymous: user.isAnonymous,
      uid: user.uid,
      lastLoginTime: new Date().getTime(),
      providerData: user.providerData,
    }
    currentUser.current  = newUser

    database()
      .ref(`users/${user.uid}`)
      .update(newUser)
      .catch(() => {})

    database()
      .ref(`places/${user.uid}_default`)
      .update({
        name: 'My Home',
        parent: user.uid,
        type: 'Homes',
      })
      .catch(() => {})

    database()
      .ref(`places/${user.uid}/places/${user.uid}_default`)
      .update({
        updated_at: new Date().getTime(),
      })
      .catch(() => {})

    Navigation.setStackRoot(props.componentId, {
      component: {
        name: 'Main',
      },
    })
    // console.log('ISER1:', user.uid)
  }

  useEffect(() => {
    // console.log('AUH:', auth)
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged)

    // return subscriber // unsubscribe on unmount
  }, [])

  const loginWithEmail = () => {
    setErrorText('')
    if (!emailText.current) return setErrorText('Enter Email')
    if (!passwordText.current) return setErrorText('Enter password')
    return auth()
      .signInWithEmailAndPassword(emailText.current, passwordText.current)
      .then(console.log)
      .catch(()=> setErrorText('Invalid Email or password'))
  }
  // console.log('ISER:', user)

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <CodePushComponent />
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            color: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#4d089a',
          }}>
          <Text style={{color: 'white', fontSize: 34}}>My Stuff</Text>
          <Text style={{color: 'white', fontSize: 18}}>The answer to</Text>
          <Text style={{color: 'white', fontSize: 18}}>
            "Where did I keep that?"
          </Text>
        </View>
        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
          {/* <GoogleSignIn /> */}
          {/* <TextInput
            onChangeText={text => (emailText.current = text)}
            placeholder='Email'
            style={{width: 120, height: 54}}
          />
          <TextInput
            onChangeText={text => (passwordText.current = text)}
            placeholder='Password'
            secureTextEntry
            style={{width: 120, height: 54}}
          />
          <Button
            title='Login with Email'
            onPress={loginWithEmail}
          />
          <Text style={{marginVertical: 12, color: 'red'}}>{errorText}</Text>
          
          <Text style={{marginVertical: 12}}>OR</Text> */}
          <GoogleSigninButton onPress={onGoogleButtonPress} />
          {/*<AppleButton
            buttonStyle={AppleButton.Style.WHITE}
            buttonType={AppleButton.Type.SIGN_IN}
            style={{
              margin: 12,
              width: 160,
              height: 45,
            }}
            onPress={() =>
              onAppleButtonPress().then(() =>
                console.log('Apple sign-in complete!'),
              )
            }
          /> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App

App.options = {
  topBar: {
    title: {
      text: ' ',
      color: 'white',
    },
    background: {
      color: '#4d089a',
    },
  },
}
