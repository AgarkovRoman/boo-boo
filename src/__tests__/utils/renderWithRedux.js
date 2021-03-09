import { createStore } from 'redux'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import React from 'react'
import { configureStore } from '@reduxjs/toolkit'
import { projectsReducer } from '../../redux/projects/projects-reducer'
import { reducer } from '../../redux/redux-store'

export const renderWithRedux = (
  component,
  { initialState, store = configureStore({ reducer, initialState }) } = {}
) => ({
  ...render(<Provider store={store}>{component}</Provider>),
  store,
})
