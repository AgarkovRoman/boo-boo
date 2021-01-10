export interface ProjectI {
  name: string
  projectId: string
  userId: string
  docId: string
}

export interface TaskI {
  id: string
  archived: boolean
  date: string
  projectId: string
  task: string
  userId: string
}
