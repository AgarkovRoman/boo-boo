export interface TaskI {
  id: string
  name: string
  archived: boolean
  date: string
  description: string
  projectId: string
  userId: string
}

export type CreateTaskI = Pick<TaskI, 'name' | 'description' | 'archived' | 'date' | 'projectId'>

export type DeleteTaskI = { success: boolean }

export interface TasksI {
  allTasks: Array<TaskI>
}

export interface TasksStateI {
  tasks: TasksI
}
