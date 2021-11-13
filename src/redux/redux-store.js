import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-reducer'
import projectsReducer from './projects/projects-reducer'
import { tasksReducer } from './tasks/tasks-reducer'
import { projectsAPI } from '../api/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    [projectsAPI.reducerPath]: projectsAPI.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projectsAPI.middleware),
})
