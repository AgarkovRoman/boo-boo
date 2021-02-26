import { ThunkAction } from 'redux-thunk'
import { Action } from '@reduxjs/toolkit'
import { tasksAPI } from '../../api/api'
import {
  addTaskActionCreatorI,
  archivedTaskActionCreatorI,
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

const archivedTaskHandler = (tasks: Array<TaskI>, taskId: Array<TaskI> | TaskI | string) =>
  tasks.map((task) => {
    if (task.id !== taskId) {
      return { ...task }
    }
    return {
      ...task,
      archived: true,
    }
  })

export const tasksReducer = (state = initialState, action: TasksActionCreatorType) => {
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
      return { ...state, allTasks: state.allTasks.filter((task) => task.docId !== payload) }
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

export const deleteTask = (taskId: string): deleteTaskActionCreatorI => ({
  type: DELETE_TASK,
  payload: taskId,
})

export const getAllTasksTC = (
  userId: string
): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
  await tasksAPI.getAllTasksById(userId).then((snapshot) => {
    const allTasks = snapshot.docs.map((task) => {
      const data = task.data()
      return {
        task: data.task,
        createDate: data.createDate,
        date: data.date,
        archived: data.archived,
        userId: data.userId,
        projectId: data.projectId,
        id: task.id,
        docId: task.id,
      }
    })

    const sortTasks = allTasks.sort((a, b) => a.createDate - b.createDate)
    dispatch(setAllTasks(sortTasks))
  })
}

export const addTaskTC = (task: TaskI): ThunkAction<void, TasksStateI, unknown, Action> => async (
  dispatch
) => {
  dispatch(addTask(task))
  await tasksAPI.addTask(task).then(() => {
    dispatch(getAllTasksTC(task.userId))
  })
}

export const archiveTaskTC = (
  taskId: string
): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
  await tasksAPI.archivedTasksById(taskId)
  dispatch(archivedTask(taskId))
}

export const deleteTaskTC = (
  taskId: string
): ThunkAction<void, TasksStateI, unknown, Action> => async (dispatch) => {
  await tasksAPI.deleteTask(taskId)
  dispatch(deleteTask(taskId))
}
