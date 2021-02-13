import { INBOX } from '../constants/defaultProjects'
import { projectsAPI } from '../api/api'

const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT'
const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS'

const initialState = {
  activeProject: INBOX,
  allProjects: [],
}

export const projectsReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case SET_ACTIVE_PROJECT: {
      return {
        ...state,
        activeProject: payload,
      }
    }
    case SET_ALL_PROJECTS: {
      return {
        ...state,
        allProjects: payload,
      }
    }
    default:
      return state
  }
}

export const setProject = (project) => ({ type: SET_ACTIVE_PROJECT, payload: project })
export const setAllProjects = (projects) => ({ type: SET_ALL_PROJECTS, payload: projects })

export const setAllProjectThunkCreator = (userId) => async (dispatch) => {
  await projectsAPI.getAllProjectsById(userId).then((snapshot) => {
    const allProjects = snapshot.docs.map((project) => ({
      ...project.data(),
      docId: project.id,
    }))
    dispatch(setAllProjects(allProjects))
  })
}
