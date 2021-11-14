import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-reducer'
import projectsReducer from './projects/projects-reducer'
import { projectsAPI, tasksAPI } from '../api/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    [projectsAPI.reducerPath]: projectsAPI.reducer,
    [tasksAPI.reducerPath]: tasksAPI.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsAPI.middleware, tasksAPI.middleware),
})
