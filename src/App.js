import React from 'react'
import './App.scss'
import 'normalize.css'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { ProjectsProvider, SelectedProjectProvider } from './context'
import { AppRouter } from './routes/AppRouter'
import { store } from './redux/redux-store'

export const App = () => (
  <Provider store={store}>
    <SelectedProjectProvider>
      <ProjectsProvider>
        <AppRouter />
      </ProjectsProvider>
    </SelectedProjectProvider>
  </Provider>
)
