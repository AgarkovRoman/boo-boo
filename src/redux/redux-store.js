import { applyMiddleware, combineReducers, createStore } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

const reducers = combineReducers({
  // auth: fsdsdf,
})

export const store = createStore(reducers)

// export const store = configureStore(reducers)
