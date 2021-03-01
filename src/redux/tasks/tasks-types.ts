import { ADD_TASK, ARCHIVED_TASK, DELETE_TASK, SET_TASKS } from './tasks-reducer'

export interface TaskI {
  task: string
  createDate: number
  date: string
  archived: boolean
  userId: string
  projectId: string
  id: string
  docId: string
}

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
