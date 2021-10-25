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
  CreateProjectI,
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
        allProjects: state.allProjects.filter((project) => project.id !== payload),
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
export const deleteProject = (id: string): deleteProjectActionCreatorI => ({
  type: DELETE_PROJECT,
  payload: id,
})

export const getAllProjectTC = (): ThunkAction<void, ProjectsStateI, unknown, Action> => async (
  dispatch
) => {
  await projectsAPI
    .getAllProjectsById()
    .then((allProjects) => (allProjects ? dispatch(setAllProjects(allProjects)) : null))
    .catch((e) => console.log(e))
}

export const addProjectTC = (
  project: CreateProjectI
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  await projectsAPI.addProject(project).then((res) => {
    if (res) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const { id, name, description } = res
      dispatch(addProject({ id, name, description }))
    }
  })
}

export const deleteProjectTC = (
  id: string
): ThunkAction<void, ProjectsStateI, unknown, Action> => async (dispatch) => {
  await projectsAPI.deleteProject(id).then((res) => {
    if (res && res.success) {
      dispatch(deleteProject(id))
    }
  })
}
