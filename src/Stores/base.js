import database from '@react-native-firebase/database';

// const pollFunction = async (name, params, timeout, times = 0, maxTimes) => {
//   try {
//     const response = await .functions().httpsCallable(name)(params/     if (response?.data?.should_poll && times < maxTimes)
//       return setTimeout(() => {
//         pollFunction(name, params, timeout, times + 1, maxTimes)
//       }, timeout)
    
//   } catch (error) {
    
//   }
// }

export default basePath => ({
  fetch: id => ({ setState, getState }) => {
    if (!id) return
    const idDetails = getState()[id]
    if (idDetails) return
    // database()
    database()
      .ref(`${basePath}/${id}`)
      .on('value', d => {
        setState({
          [id]: d.val(),
          [`${id}_loaded`]: true
        })
      })
  },
  addEntry: (id, params) => () => {
    const key = database()
      .ref(`${basePath}/${id}`)
      .push(params).key
    return key
  },
  addBaseEntry: params => () => {
    const key = database()
      .ref(`${basePath}`)
      .push(params).key
    return key
  },
  updateEntry: (id, itemId, params) => () => {
    if (!id) return
    if (!params) {
      return database()
        .ref(`${basePath}/${id}/${itemId}`)
        .set(null)
    }
    return database()
      .ref(`${basePath}/${id}/${itemId}`)
      .update(params)
  },
  updateBaseEntry: (id, params) => () => {
    if (!id) return
    if (!params) {
      return database()
        .ref(`${basePath}/${id}`)
        .set(null)
    }
    return database()
      .ref(`${basePath}/${id}`)
      .update(params)
  },
  setEntry: (id, key, value) => () => {
    console.log('SEEE:', id, key, value)
    return database()
      .ref(`${basePath}/${id}/${key}`)
      .set(value)
  },
  setValue: (key, value) => ({ setState }) => {
    return setState({ [key]: value })
  },
  // call: (name, params) => async () => {
  //   try {
  //     return await .functions().httpsCallable(name)(params)/   } catch (error) {
  //     return false
  //   }
  // },
  // poll: (name, params, timeout = 5000, maxTimes = 150) => async () => {
  //   try {
  //     pollFunction(name, params, timeout, 0, maxTimes)
  //     return
  //   } catch (error) {
  //     return false
  //   }
  // }
})
