import { tasksAPI } from '../../api/api'

const initialState = {
  allTasks: [],
}

const SET_TASKS = 'SET_TASKS'
const ADD_TASK = 'ADD_TASK'
const ARCHIVED_TASK = 'ARCHIVED_TASK'

const archivedTaskHandler = (tasks, taskId) => {
  const result = tasks.map((task) => {
    if (task.id !== taskId) {
      return { ...task }
    }
    return {
      ...task,
      archived: true,
    }
  })

  return result
}

export const tasksReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_TASKS: {
      return { ...state, allTasks: payload }
    }
    case ADD_TASK: {
      return { ...state, allTasks: [...state.allTasks, payload] }
    }
    case ARCHIVED_TASK: {
      return { ...state, allTasks: archivedTaskHandler(state.allTasks, payload) }
    }
    default:
      return state
  }
}

export const setAllTasks = (tasks) => ({ type: SET_TASKS, payload: tasks })
export const addTask = (task) => ({ type: ADD_TASK, payload: task })
export const archivedTask = (taskId) => ({ type: ARCHIVED_TASK, payload: taskId })

export const getAllTasksTC = (userId) => async (dispatch) => {
  await tasksAPI.getAllTasksById(userId).then((snapshot) => {
    const allTasks = snapshot.docs.map((task) => ({
      ...task.data(),
      id: task.id,
      docId: task.id,
    }))
    const sortTasks = allTasks.sort((a, b) => a.createDate - b.createDate)
    dispatch(setAllTasks(sortTasks))
  })
}

export const addTaskTC = (task) => async (dispatch) => {
  dispatch(addTask(task))
  await tasksAPI.addTask(task).then(() => {
    dispatch(getAllTasksTC(task.userId))
  })
}

export const archiveTaskTC = (taskId) => async (dispatch) => {
  await tasksAPI.archivedTasksById(taskId)
  dispatch(archivedTask(taskId))
}
