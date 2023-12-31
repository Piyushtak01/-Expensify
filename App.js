import React from 'react'
import Appnavigation from './navigation/appNavigation'
import { Provider } from 'react-redux'
import { store } from './redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <Appnavigation/>
    </Provider>
  )
}