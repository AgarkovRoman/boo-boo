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
}
