import {
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_ACTIVE_PROJECT,
  SET_ALL_PROJECTS,
} from './projects-reducer'

export interface ProjectI {
  id: string
  name: string
  description: string
}

export type CreateProjectI = Pick<ProjectI, 'name' | 'description'>

export type DeleteProjectI = { success: boolean }

export interface ProjectsStateI {
  projects: ProjectsI
}

export interface ProjectsI {
  activeProject: string
  allProjects: Array<ProjectI>
}

export interface setActiveProjectActionCreatorI {
  type: typeof SET_ACTIVE_PROJECT
  payload: string
}

export interface setAllProjectsActionCreatorI {
  type: typeof SET_ALL_PROJECTS
  payload: Array<ProjectI>
}

export interface setAddProjectActionCreatorI {
  type: typeof ADD_PROJECT
  payload: ProjectI
}

export interface deleteProjectActionCreatorI {
  type: typeof DELETE_PROJECT
  payload: string
}

export type ProjectsActionCreatorsType =
  | setActiveProjectActionCreatorI
  | setAllProjectsActionCreatorI
  | setAddProjectActionCreatorI
  | deleteProjectActionCreatorI
