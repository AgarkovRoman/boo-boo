import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth-reducer'

const reducer = {
  auth: authReducer,
}

export const store = configureStore({ reducer })
