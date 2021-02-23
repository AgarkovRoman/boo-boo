import { ProjectsStateI } from './projects-types'

export const getActiveProject = (state: ProjectsStateI) => state.projects.activeProject
export const getAllProjects = (state: ProjectsStateI) => state.projects.allProjects
