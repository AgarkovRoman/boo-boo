import { INBOX } from '../constants/defaultProjects'
import { projectsAPI } from '../api/api'

const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT'
const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS'
const ADD_PROJECT = 'ADD_PROJECT'
const DELETE_PROJECT = 'DELETE_PROJECT'

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
    case ADD_PROJECT: {
      return {
        ...state,
        allProjects: [...state.allProjects, payload],
      }
    }
    case DELETE_PROJECT: {
      return {
        ...state,
        allProjects: state.allProjects.filter((project) => project.docId !== payload),
      }
    }
    default:
      return state
  }
}

export const setActiveProject = (projectId) => ({ type: SET_ACTIVE_PROJECT, payload: projectId })
export const setAllProjects = (projects) => ({ type: SET_ALL_PROJECTS, payload: projects })
export const addProject = (project) => ({ type: ADD_PROJECT, payload: project })
export const deleteProject = (docId) => ({ type: DELETE_PROJECT, payload: docId })

export const getAllProjectTC = (userId) => async (dispatch) => {
  await projectsAPI.getAllProjectsById(userId).then((snapshot) => {
    const allProjects = snapshot.docs.map((project) => ({
      ...project.data(),
      docId: project.id,
    }))
    dispatch(setAllProjects(allProjects))
  })
}

export const addProjectTC = (project) => async (dispatch) => {
  dispatch(addProject(project))
  await projectsAPI.addProject({ ...project }).then(() => {
    dispatch(getAllProjectTC(project.userId))
  })
}

export const deleteProjectTC = (docId, userId) => async (dispatch) => {
  dispatch(deleteProject(docId))
  await projectsAPI.deleteProject(docId).then(() => {
    dispatch(getAllProjectTC(userId))
  })
}
