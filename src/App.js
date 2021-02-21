import React from 'react'
import './App.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import { AppRouter } from './routes/AppRouter'
import { store } from './redux/redux-store'

export const App = () => (
  <Provider store={store}>
    <AppRouter />
  </Provider>
)
