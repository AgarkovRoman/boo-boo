import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth-reducer'
import { projectsReducer } from './projects-reducer'

const reducer = {
  auth: authReducer,
  projects: projectsReducer,
}

export const store = configureStore({ reducer })
