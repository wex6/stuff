import React, { useState, useRef } from 'react'
import { View, Button } from 'react-native'
import auth from '@react-native-firebase/auth'
import Dialog from 'react-native-dialog'

function EmailSignIn () {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorText, setErrorText] = useState('')

  async function onLogin () {
    setErrorText('')
    if (!email) return setErrorText('Enter email')
    if (!password) return setErrorText('Enter password')
    console.log('EP:', email, password)
    return auth()
      .signInWithEmailAndPassword(email, password)
      .catch(() => setErrorText('Invalid Email or password'))
  }

  return (
    <View
      style={{
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
        width: 164,
        borderRadius: 4,
        height: 44,
        marginBottom: 24
      }}>
      <Button
        color='white'
        style={{ fontSize: 14, color: 'white' }}
        title='Email Sign In'
        onPress={() => setShow(true)}></Button>
      <Dialog.Container visible={show} onBackdropPress={() => setShow(false)}>
        <Dialog.Title>Login With Email</Dialog.Title>
        <Dialog.Description style={{ color: 'red' }}>
          {errorText}
        </Dialog.Description>
        <Dialog.Input
          autoFocus
          placeholder={'Email'}
          onChangeText={setEmail}
          value={email}
        />
        <Dialog.Input
          placeholder={'Password'}
          onChangeText={setPassword}
          value={password}
        />
        <Dialog.Button label='Cancel' onPress={() => setShow(false)} />
        <Dialog.Button label='Login' onPress={onLogin} />
      </Dialog.Container>
    </View>
  )
}

export default EmailSignIn
