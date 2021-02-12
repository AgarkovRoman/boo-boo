import { INBOX } from '../constants/defaultProjects'

const SET_PROJECT = 'SET_PROJECT'

const initialState = {
  activeProject: INBOX,
}

export const projectsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_PROJECT: {
      return {
        ...state,
        activeProject: payload,
      }
    }
    default:
      return state
  }
}

export const setProject = (project) => ({ type: SET_PROJECT, payload: project })
