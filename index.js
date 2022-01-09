/**
 * @format
 */

import {AppRegistry} from 'react-native'
// import {packageName as appName} from './app.json'

import App from './App'
import InitView from './src/Containers/InitView/'
import MainView from './src/Containers/MainView/'
import AddItemView from './src/Containers/AddItemView'
import {Navigation} from 'react-native-navigation'
import { Settings } from 'react-native-fbsdk-next'
// AppRegistry.registerComponent('Init', () => InitView);

Settings.initializeSDK();


Navigation.registerComponent('Login', () => App)
Navigation.registerComponent('Init', () => InitView)
Navigation.registerComponent('AddItem', () => AddItemView)
Navigation.registerComponent('Main', () => MainView)


// COnf
console.log('Version:', '1.1')

const createStackChild = (id, names, options) => ({
  stack: {
    id,
    children: names.map(({name}) => ({
      component: {
        name,
      },
    })),
    options,
  },
})

const bottomTabInvisible = {
  bottomTabs: {
    visible: false,
  },
}
const bottomTabVisible = {
  bottomTabs: {
    visible: false,
  },
}

global.base = {
  
    bottomTabs: {
      id: 'BOTTOM_TABS_LAYOUT',
      children: [
        createStackChild('INIT', [{name: 'Init'}], bottomTabInvisible),
        createStackChild('LOGIN_TEST', [{name: 'Login'}], bottomTabVisible),
      ],
      options: {
        bottomTabs: {
          visible: true,
        },
      },
    },
  
}

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BOTTOM_TABS_LAYOUT',
        children: [
          createStackChild('INIT', [{name: 'Init'}], bottomTabInvisible),
          createStackChild('LOGIN_TEST', [{name: 'Login'}], bottomTabVisible),
        ],
        options: {
          topBar: {
            visible:false
          },
          bottomTabs: {
            visible: true,
          },
        },
      },
    },
  })
})

// Navigation.events().registerAppLaunchedListener(() => {
//   Navigation.setRoot({
//     root: {
//       stack: {
//         id: 'INIT',
//         children: [
//           {
//             component: {
//               id:'LOGIN_TEST',
//               name: 'Login',
//             },
//           },
//           {
//             component: {
//               name: 'Init',
//             },
//           },
//         ],
//       },
//     },
//   })
// })
