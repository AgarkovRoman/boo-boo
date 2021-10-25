import { ADD_TASK, ARCHIVED_TASK, DELETE_TASK, SET_TASKS } from './tasks-reducer'

export interface TaskI {
  id: string
  name: string
  archived: boolean
  date: string
  description: string
  projectId: string
  userId: string
}

export type CreateTaskI = Pick<TaskI, 'name' | 'description' | 'archived' | 'date' | 'projectId'>

export type DeleteTaskI = { success: boolean }

export interface TasksI {
  allTasks: Array<TaskI>
}

export interface TasksStateI {
  tasks: TasksI
}

export interface setAllTasksActionCreatorI {
  type: typeof SET_TASKS
  payload: Array<TaskI>
}

export interface addTaskActionCreatorI {
  type: typeof ADD_TASK
  payload: TaskI
}

export interface archivedTaskActionCreatorI {
  type: typeof ARCHIVED_TASK
  payload: string
}

export interface deleteTaskActionCreatorI {
  type: typeof DELETE_TASK
  payload: string
}

export type TasksActionCreatorType =
  | setAllTasksActionCreatorI
  | addTaskActionCreatorI
  | archivedTaskActionCreatorI
  | deleteTaskActionCreatorI
