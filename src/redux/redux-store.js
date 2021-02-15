import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './auth-reducer'
import { projectsReducer } from './projects-reducer'
import { tasksReducer } from './tasks-reducer'

const reducer = {
  auth: authReducer,
  projects: projectsReducer,
  tasks: tasksReducer,
}

export const store = configureStore({ reducer })
