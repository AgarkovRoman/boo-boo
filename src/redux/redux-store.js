import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth/auth-reducer'
import { projectsReducer } from './projects/projects-reducer'
import { tasksReducer } from './tasks/tasks-reducer'

export const reducer = {
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
}

export const store = configureStore({ reducer })
