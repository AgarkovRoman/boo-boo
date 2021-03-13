import { ThunkAction } from 'redux-thunk'
import { Action } from '@reduxjs/toolkit'
import { INBOX } from '../../constants/defaultProjects'
import { projectsAPI } from '../../api/api'
import {
  ProjectI,
  ProjectsI,
  setActiveProjectActionCreatorI,
  setAllProjectsActionCreatorI,
  setAddProjectActionCreatorI,
  deleteProjectActionCreatorI,
  ProjectsStateI,
  ProjectsActionCreatorsType,
} from './projects-types'

export const SET_ACTIVE_PROJECT = 'SET_ACTIVE_PROJECT'
export const SET_ALL_PROJECTS = 'SET_ALL_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

export const initialState: ProjectsI = {
  activeProject: INBOX,
  allProjects: [],
}

export const projectsReducer = (
  state = initialState,
  action: ProjectsActionCreatorsType
): ProjectsI => {
  const { type, payload } = action

  switch (type) {
    case SET_ACTIVE_PROJECT: {
      return {
        ...state,
        activeProject: payload,
      } as ProjectsI
    }
    case SET_ALL_PROJECTS: {
      return {
        ...state,
        allProjects: payload,
      } as ProjectsI
    }
    case ADD_PROJECT: {
      return {
        ...state,
        allProjects: [...state.allProjects, payload],
      } as ProjectsI
    }
    case DELETE_PROJECT: {
      return {
        ...state,
        allProjects: state.allProjects.filter((project) => project.docId !== payload),
      } as ProjectsI
    }
    default:
      return state
  }
}

export const setActiveProject = (projectId: string): setActiveProjectActionCreatorI => ({
  type: SET_ACTIVE_PROJECT,
  payload: projectId,
})
export const setAllProjects = (projects: Array<ProjectI>): setAllProjectsActionCreatorI => ({
  type: SET_ALL_PROJECTS,
  payload: projects,
})
export const addProject = (project: ProjectI): setAddProjectActionCreatorI => ({
  type: ADD_PROJECT,
  payload: project,
})
export const deleteProject = (docId: string): deleteProjectActionCreatorI => ({
  type: DELETE_PROJECT,
  payload: docId,
})

export const getAllProjectTC = (
  userId: string
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  await projectsAPI.getAllProjectsById(userId).then((snapshot) => {
    const allProjects: Array<ProjectI> = snapshot.docs.map((project) => {
      const data = project.data()
      return {
        userId: data.userId,
        projectId: project.id,
        name: data.name,
        docId: project.id,
      }
    })
    dispatch(setAllProjects(allProjects))
  })
}

export const addProjectTC = (
  project: ProjectI
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  dispatch(addProject(project))
  await projectsAPI.addProject({ ...project }).then(() => {
    dispatch(getAllProjectTC(project.userId))
  })
}

export const deleteProjectTC = (
  docId: string,
  userId: string
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  dispatch(deleteProject(docId))
  await projectsAPI.deleteProject(docId).then(() => {
    dispatch(getAllProjectTC(userId))
  })
}
