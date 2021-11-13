import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-reducer'
import projectsReducer from './projects/projects-reducer'
import { tasksReducer } from './tasks/tasks-reducer'
import { projects2API } from '../api/api'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    [projects2API.reducerPath]: projects2API.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(projects2API.middleware),
})
