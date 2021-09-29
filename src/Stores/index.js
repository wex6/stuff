import { createStore, createHook } from 'react-sweet-state'
import { useEffect } from 'react'
import base from './base'

const Stores = {}

export default (basePath, key) => {
  let Store = Stores[basePath]
  if (!Store) {
    Store = createStore({
      initialState: {},
      actions: base(basePath),
      name: basePath
    })
    Stores[basePath] = Store
  }

  const getDetails = (state, props) => {
    if (!props) return null
    if (!props.id) return state
    const key = `${props.id}_loaded`
    if (!state[key]) return { loading: true }
    const ret = state[props.id] || {}
    return ret
  }

  const useFullStore = createHook(Store)

  const useStore = createHook(Store, {
    selector: getDetails
  })

  const useStoreData = tempId => {
    const id = tempId || key
    const params = id ? { id } : {}
    const [data, actions] = useStore(params)
    useEffect(() => {
      actions.fetch(id)
    }, [id])

    return data
  }

  const useNullStoreData = tempId => {
    const id = tempId || key
    const params = id ? { id } : null
    const [data, actions] = useStore(params)
    useEffect(() => {
      actions.fetch(id)
    }, [id])

    return data
  }

  return { useFullStore, useStore, useStoreData, useNullStoreData }
}
