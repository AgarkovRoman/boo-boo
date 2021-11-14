import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-reducer'
import projectsReducer from './projects/projects-reducer'
import { projectsAPI, tasks2API } from '../api/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    [projectsAPI.reducerPath]: projectsAPI.reducer,
    [tasks2API.reducerPath]: tasks2API.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsAPI.middleware, tasks2API.middleware),
})
