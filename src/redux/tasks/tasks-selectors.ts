import { createSelector } from 'reselect'
import { INBOX, NEXT_7, TODAY } from '../../constants/defaultProjects'
import { TaskI, TasksStateI } from './tasks-types'

export const getAllTasks = (state: TasksStateI): Array<TaskI> => state.tasks.allTasks

export const getNotArchivedTasks = createSelector(getAllTasks, (tasks: Array<TaskI>) =>
  tasks.filter((task: TaskI) => !task.archived)
)

export const getInboxTasksCounter = createSelector(
  getNotArchivedTasks,
  (tasks: Array<TaskI>) => tasks.filter((elem) => elem.projectId === INBOX).length
)

export const getTodayTasksCounter = createSelector(
  getNotArchivedTasks,
  (tasks: Array<TaskI>) => tasks.filter((elem) => elem.projectId === TODAY).length
)

export const getNext7TasksCounter = createSelector(
  getNotArchivedTasks,
  (tasks: Array<TaskI>) => tasks.filter((elem) => elem.projectId === NEXT_7).length
)
