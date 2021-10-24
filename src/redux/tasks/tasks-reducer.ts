import { ThunkAction } from 'redux-thunk'
import { Action } from '@reduxjs/toolkit'
import { tasksAPI } from '../../api/api'
import {
  addTaskActionCreatorI,
  archivedTaskActionCreatorI,
  CreateTaskI,
  deleteTaskActionCreatorI,
  setAllTasksActionCreatorI,
  TaskI,
  TasksActionCreatorType,
  TasksI,
  TasksStateI,
} from './tasks-types'

const initialState: TasksI = {
  allTasks: [],
}

export const SET_TASKS = 'SET_TASKS'
export const ADD_TASK = 'ADD_TASK'
export const ARCHIVED_TASK = 'ARCHIVED_TASK'
export const DELETE_TASK = 'DELETE_TASK'

export const archivedTaskHandler = (tasks: Array<TaskI>, taskId: Array<TaskI> | TaskI | string) =>
  tasks.map((task) => {
    if (task.id !== taskId) {
      return { ...task }
    }
    return {
      ...task,
      archived: true,
    }
  })

export const tasksReducer = (state = initialState, action: TasksActionCreatorType): TasksI => {
  const { type, payload } = action

  switch (type) {
    case SET_TASKS: {
      return { ...state, allTasks: payload } as TasksI
    }
    case ADD_TASK: {
      return { ...state, allTasks: [...state.allTasks, payload] } as TasksI
    }
    case ARCHIVED_TASK: {
      return { ...state, allTasks: archivedTaskHandler(state.allTasks, payload) } as TasksI
    }
    case DELETE_TASK: {
      return { ...state, allTasks: state.allTasks.filter((task) => task.id !== payload) }
    }
    default:
      return state
  }
}

export const setAllTasks = (tasks: Array<TaskI>): setAllTasksActionCreatorI => ({
  type: SET_TASKS,
  payload: tasks,
})

export const addTask = (task: TaskI): addTaskActionCreatorI => ({ type: ADD_TASK, payload: task })

export const archivedTask = (taskId: string): archivedTaskActionCreatorI => ({
  type: ARCHIVED_TASK,
  payload: taskId,
})

// export const updateTask = (taskId: string): archivedTaskActionCreatorI => ({
//   type: ARCHIVED_TASK,
//   payload: taskId,
// })

export const deleteTask = (taskId: string): deleteTaskActionCreatorI => ({
  type: DELETE_TASK,
  payload: taskId,
})

export const getAllTasksTC = (): ThunkAction<void, TasksStateI, unknown, Action> => async (
  dispatch
) => {
  await tasksAPI.getAllTasksById().then((tasks) => (tasks ? dispatch(setAllTasks(tasks)) : null))
}

export const addTaskTC = (
  task: CreateTaskI
): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
  await tasksAPI.addTask(task).then((res) => {
    if (res) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { id, name, archived, date, description, projectId, userId } = res
      dispatch(addTask({ id, name, archived, date, description, projectId, userId }))
    }
  })
}

export const archiveTaskTC = (
  taskId: string,
  task: CreateTaskI
): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
  debugger
  await tasksAPI.updateTaskById(taskId, task).then(() => dispatch(archivedTask(taskId)))
}

// export const updateTaskTC = (
//   taskId: string,
//   task: CreateTaskI
// ): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
//   await tasksAPI.updateTaskById(taskId, task).then(() => dispatch(updateTask(taskId)))
// }

export const deleteTaskTC = (
  taskId: string
): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
  await tasksAPI.deleteTask(taskId).then(() => dispatch(deleteTask(taskId)))
}
