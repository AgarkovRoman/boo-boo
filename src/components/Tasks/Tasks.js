import React, { useEffect } from 'react'
import './Tasks.scss'
import { useSelector } from 'react-redux'

import { Checkbox } from '../UI/Checkbox/Checkbox'
import { useTasks } from '../../hooks'
import { collatedTasks } from '../../constants/collatedTasks'
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers/helpers'
import { useProjectsValue } from '../../context'
import { AddTask } from '../AddTask/AddTask'
// import { ProjectI, TaskI } from './index'

export const Tasks = () => {
  const selectedProject = useSelector((state) => state.projects.activeProject)
  const { projects } = useProjectsValue()
  const { tasks } = useTasks(selectedProject)

  // console.log('projects', projects)
  // console.log(tasks)
  // console.log(archivedTasks)

  let projectName = ''

  if (projects && projects.length > 0 && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`
  }, [projectName])

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      {tasks.length > 0 && (
        <ul className="tasks__list">
          {tasks.map((task) => (
            <li key={task.id} data-testid="task">
              <Checkbox id={task.id} taskDesc={task.task} />
              <span>{task.task}</span>
            </li>
          ))}
        </ul>
      )}

      <AddTask />

      {tasks.length === 0 && (
        <>
          <div className="tasks__done" />
          <div className="tasks__done-text" data-testid="task-not-found">
            All tasks are done! Nice work!
          </div>
        </>
      )}
    </div>
  )
}
