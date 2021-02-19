import React, { useEffect } from 'react'
import './Tasks.scss'
import { useSelector } from 'react-redux'
import { Checkbox } from '../UI/Checkbox/Checkbox'
import { collatedTasks } from '../../constants/collatedTasks'
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers/helpers'
import { AddTask } from '../AddTask/AddTask'

export const Tasks = () => {
  const selectedProject = useSelector((state) => state.projects.activeProject)
  const projects = useSelector((state) => state.projects.allProjects)
  const tasks = useSelector((state) => state.tasks.allTasks)

  const createProjectName = () => {
    let name = ''
    if (
      projects &&
      projects.length > 0 &&
      selectedProject &&
      !collatedTasksExist(selectedProject)
    ) {
      name = getTitle(projects, selectedProject).name
    }

    if (collatedTasksExist(selectedProject) && selectedProject) {
      name = getCollatedTitle(collatedTasks, selectedProject).name
    }

    return name
  }

  const getFilteredTasks = (allTasks, project) =>
    allTasks.filter((task) => task.projectId === project).filter((task) => !task.archived)

  const projectName = createProjectName()
  const selectedProjectTasks = getFilteredTasks(tasks, selectedProject)

  useEffect(() => {
    document.title = `${projectName}: Todoist`
  }, [projectName])

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>

      {selectedProjectTasks.length > 0 && (
        <ul className="tasks__list">
          {selectedProjectTasks.map((task) => (
            <li key={task.id} data-testid="task">
              <Checkbox id={task.id} taskDesc={task.task} />
              <span>{task.task}</span>
            </li>
          ))}
        </ul>
      )}

      <AddTask />

      {selectedProjectTasks.length === 0 && (
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
